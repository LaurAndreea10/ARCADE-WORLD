import { describe, expect, it } from 'vitest';
import {
  advanceOnboarding,
  applyMiniGameResult,
  buildDailyChallengeView,
  buildMiniGameResult,
  buildRewardPreview,
  createAndroidBackStack,
  createPlayerProfile,
  getMiniGameUnlockState,
  getOnboardingState,
  handleAndroidBack,
  parseLocalProgress,
  pushScreen,
  serializeLocalProgress,
} from '../src/game/productLoop.js';

describe('productLoop', () => {
  it('starts onboarding on the first slide and completes after the final slide', () => {
    const first = getOnboardingState();
    const second = advanceOnboarding(first);
    const third = advanceOnboarding(second);
    const done = advanceOnboarding(third);

    expect(first.completed).toBe(false);
    expect(first.index).toBe(0);
    expect(done.completed).toBe(true);
    expect(done.progressPercent).toBe(100);
  });

  it('creates a starter profile with only the first arcade games unlocked', () => {
    const profile = createPlayerProfile({ name: 'Laura', avatar: '⭐' });

    expect(profile.name).toBe('Laura');
    expect(profile.avatar).toBe('⭐');
    expect(profile.unlockedMiniGames).toEqual(['basket', 'memory', 'breakout']);
  });

  it('keeps later mini-games locked until their requirement is met', () => {
    const profile = createPlayerProfile();

    expect(getMiniGameUnlockState('hockey', profile).unlocked).toBe(false);
    expect(getMiniGameUnlockState('hockey', { ...profile, xp: 120 }).unlocked).toBe(true);
  });

  it('builds a consistent result object and applies rewards to the profile', () => {
    const profile = createPlayerProfile();
    const result = buildMiniGameResult({ miniGameId: 'basket', score: 950, won: true, difficulty: 1 });
    const next = applyMiniGameResult(profile, result);

    expect(result.medal).toBe('gold');
    expect(next.profile.coins).toBeGreaterThan(0);
    expect(next.profile.xp).toBeGreaterThan(0);
    expect(next.summary.rewardLine).toContain('coins');
  });

  it('creates reward previews before launching a mini-game', () => {
    const preview = buildRewardPreview('basket', 2);

    expect(preview.copy).toContain('Win for up to');
    expect(preview.win.coins).toBeGreaterThan(preview.participation.coins);
  });

  it('formats daily challenge UI state', () => {
    const view = buildDailyChallengeView({
      challenge: { title: 'Win 2 mini-games', target: 2, reward: { coins: 40, xp: 25 } },
      current: 2,
      target: 2,
      completed: true,
      percent: 100,
    });

    expect(view.claimCta).toBe('Claim daily reward');
    expect(view.rewardLabel).toBe('40 coins + 25 XP');
  });

  it('handles Android-style back navigation for overlays and exit', () => {
    const stack = pushScreen(pushScreen(createAndroidBackStack(), 'mini-game'), 'result');
    const backToGame = handleAndroidBack(stack);
    const backToBoard = handleAndroidBack(backToGame.stack);
    const exit = handleAndroidBack(backToBoard.stack);

    expect(backToGame.screen).toBe('mini-game');
    expect(backToBoard.screen).toBe('board');
    expect(exit.action).toBe('confirm-exit');
  });

  it('serializes and recovers local progress safely', () => {
    const profile = createPlayerProfile({ name: 'Saved Player' });
    const parsed = parseLocalProgress(serializeLocalProgress(profile));
    const recovered = parseLocalProgress('{broken');

    expect(parsed.profile.name).toBe('Saved Player');
    expect(recovered.recovered).toBe(true);
  });

  it('preserves extra local progress fields used by the overlay', () => {
    const profile = createPlayerProfile();
    const parsed = parseLocalProgress(
      serializeLocalProgress(profile, {
        onboarding: { completed: true, index: 2 },
        selectedMiniGame: 'memory',
      }),
    );

    expect(parsed.onboarding.completed).toBe(true);
    expect(parsed.onboarding.index).toBe(2);
    expect(parsed.selectedMiniGame).toBe('memory');
  });
});
