import { describe, expect, it } from 'vitest';

import {
  getMiniGame,
  listMiniGames,
  MINI_GAME_MODES,
  supportsMode,
  validateMiniGameRegistry,
} from '../src/data/miniGameRegistry.js';
import { migrateSave } from '../src/game/saveMigrations.js';
import { parseImportedSave, getRecoveryActions } from '../src/game/recovery.js';
import { normalizeSettings, applyReducedMotionPreference } from '../src/game/settings.js';
import {
  createPlayerStats,
  getFavoriteMiniGame,
  getWinRate,
  recordMiniGameResult,
  recordTileCapture,
} from '../src/game/playerStats.js';
import { evaluateAchievements, getUnlockedAchievementIds } from '../src/game/achievements.js';
import {
  getDailyChallenge,
  getDailyChallengeProgress,
  updateDailyStreak,
} from '../src/game/dailyChallenge.js';
import { createMatchEvent, createMatchSummary, formatMatchEvent } from '../src/game/matchSummary.js';

describe('mini-game registry', () => {
  it('contains the expected 11 mini-games', () => {
    expect(listMiniGames()).toHaveLength(11);
    expect(getMiniGame('basket')).toMatchObject({ id: 'basket', title: 'Basket' });
  });

  it('validates registry metadata and supported modes', () => {
    expect(validateMiniGameRegistry()).toEqual({ valid: true });
    expect(supportsMode('basket', MINI_GAME_MODES.PVP)).toBe(true);
    expect(supportsMode('missing', MINI_GAME_MODES.PVP)).toBe(false);
  });
});

describe('save migrations and recovery', () => {
  it('wraps legacy saves into the current envelope', () => {
    const result = migrateSave({ players: [{ name: 'P1' }] });

    expect(result.success).toBe(true);
    expect(result.save).toMatchObject({
      schemaVersion: 1,
      state: { players: [{ name: 'P1' }] },
    });
  });

  it('parses valid imported JSON and exposes recovery actions for broken saves', () => {
    expect(parseImportedSave('{"schemaVersion":1,"state":{"players":[]}}')).toMatchObject({
      success: true,
    });

    const broken = parseImportedSave('{broken json');
    expect(broken.success).toBe(false);
    expect(getRecoveryActions(broken)).toEqual(['download-broken-save', 'reset-save', 'try-repair']);
  });
});

describe('settings helpers', () => {
  it('normalizes invalid settings to safe defaults', () => {
    expect(normalizeSettings({ theme: 'unknown', motion: 'fast', sound: 0 })).toMatchObject({
      theme: 'cyan',
      motion: 'normal',
      sound: false,
    });
  });

  it('applies reduced motion preference', () => {
    expect(applyReducedMotionPreference({ motion: 'normal' }, true)).toMatchObject({
      motion: 'reduced',
    });
  });
});

describe('player stats and achievements', () => {
  it('records results, favorite game, tile captures, and win rate', () => {
    let stats = createPlayerStats();
    stats = recordMiniGameResult(stats, { gameId: 'basket', result: 'win', coins: 20, xp: 10, streak: 2 });
    stats = recordMiniGameResult(stats, { gameId: 'basket', result: 'loss' });
    stats = recordTileCapture(stats, 3);

    expect(getFavoriteMiniGame(stats)).toBe('basket');
    expect(getWinRate(stats)).toBeCloseTo(0.5);
    expect(stats.tilesCaptured).toBe(3);
  });

  it('evaluates achievement unlocks', () => {
    const stats = createPlayerStats({ wins: 25, tilesCaptured: 5, highestStreak: 5 });

    expect(getUnlockedAchievementIds(stats)).toEqual([
      'first-win',
      'tile-collector',
      'hot-streak',
      'arcade-legend',
    ]);
    expect(evaluateAchievements(createPlayerStats()).every((achievement) => !achievement.unlocked)).toBe(true);
  });
});

describe('daily challenges', () => {
  it('returns deterministic daily challenges and progress', () => {
    const date = new Date('2026-04-25T12:00:00.000Z');
    const challenge = getDailyChallenge(date);
    const progress = getDailyChallengeProgress(createPlayerStats({ wins: 3, tilesCaptured: 3, coinsEarned: 150 }), challenge);

    expect(getDailyChallenge(date)).toEqual(challenge);
    expect(progress.percent).toBeGreaterThanOrEqual(0);
  });

  it('updates daily streaks', () => {
    const first = updateDailyStreak(null, new Date('2026-04-25T12:00:00.000Z'));
    const second = updateDailyStreak(first, new Date('2026-04-26T12:00:00.000Z'));

    expect(first.streak).toBe(1);
    expect(second.streak).toBe(2);
  });
});

describe('match summary', () => {
  it('summarizes and formats match events', () => {
    const event = createMatchEvent('tile-captured', { playerName: 'Laura', tileName: 'Basket' }, new Date('2026-04-25T12:00:00.000Z'));
    const summary = createMatchSummary([event]);

    expect(summary.captures).toBe(1);
    expect(formatMatchEvent(event)).toBe('Laura captured Basket.');
  });
});
