import { describe, expect, it } from 'vitest';

import { rollDice, isValidDiceRoll } from '../src/game/dice.js';
import { moveToken, normalizePosition } from '../src/game/movement.js';
import { applyReward, buyItem, canAfford } from '../src/game/economy.js';
import { expectedScore, updateElo } from '../src/game/elo.js';
import { createSaveEnvelope, validateSaveEnvelope } from '../src/game/saveSchema.js';
import { parseMiniGameMessage } from '../src/integration/iframeBridge.js';

describe('dice helpers', () => {
  it('rolls within the valid 1-6 range', () => {
    expect(rollDice(() => 0)).toBe(1);
    expect(rollDice(() => 0.999)).toBe(6);
  });

  it('validates dice rolls', () => {
    expect(isValidDiceRoll(1)).toBe(true);
    expect(isValidDiceRoll(6)).toBe(true);
    expect(isValidDiceRoll(0)).toBe(false);
    expect(isValidDiceRoll(7)).toBe(false);
  });
});

describe('movement helpers', () => {
  it('normalizes positions around the board', () => {
    expect(normalizePosition(24)).toBe(0);
    expect(normalizePosition(25)).toBe(1);
    expect(normalizePosition(-1)).toBe(23);
  });

  it('moves tokens and detects START crossing', () => {
    expect(moveToken(22, 3)).toEqual({ position: 1, passedStart: true });
    expect(moveToken(5, 4)).toEqual({ position: 9, passedStart: false });
  });
});

describe('economy helpers', () => {
  it('checks affordability and purchases items', () => {
    const player = { coins: 50, inventory: [] };
    const item = { id: 'shield', cost: 30 };

    expect(canAfford(player, item.cost)).toBe(true);
    expect(buyItem(player, item)).toEqual({
      success: true,
      player: { coins: 20, inventory: ['shield'] },
    });
  });

  it('rejects purchases without enough coins', () => {
    const player = { coins: 10, inventory: [] };
    const item = { id: 'reroll', cost: 25 };

    expect(buyItem(player, item)).toEqual({
      success: false,
      player,
      reason: 'NOT_ENOUGH_COINS',
    });
  });

  it('applies rewards immutably', () => {
    expect(applyReward({ coins: 5, xp: 10 }, { coins: 15, xp: 20 })).toEqual({
      coins: 20,
      xp: 30,
    });
  });
});

describe('ELO helpers', () => {
  it('returns an even expected score for equal ratings', () => {
    expect(expectedScore(1000, 1000)).toBeCloseTo(0.5);
  });

  it('updates ratings after a win', () => {
    expect(updateElo(1000, 1000, 1)).toBe(1016);
  });
});

describe('save schema helpers', () => {
  it('wraps and validates saves', () => {
    const save = createSaveEnvelope({ players: [] });

    expect(validateSaveEnvelope(save)).toEqual({ valid: true });
    expect(save).toMatchObject({ schemaVersion: 1, state: { players: [] } });
  });

  it('rejects unsupported saves', () => {
    expect(validateSaveEnvelope({ schemaVersion: 999, state: {} })).toEqual({
      valid: false,
      reason: 'Unsupported save schema version.',
    });
  });
});

describe('iframe bridge helpers', () => {
  it('accepts valid mini-game score messages from trusted origins', () => {
    expect(
      parseMiniGameMessage({
        origin: 'https://codepen.io',
        data: { type: 'GAME_SCORE', gameId: 'basket', score: 42, won: true },
      }),
    ).toEqual({
      accepted: true,
      payload: { gameId: 'basket', score: 42, won: true },
    });
  });

  it('rejects untrusted iframe origins', () => {
    expect(
      parseMiniGameMessage({
        origin: 'https://example.com',
        data: { type: 'GAME_SCORE', score: 10 },
      }),
    ).toEqual({ accepted: false, reason: 'UNTRUSTED_ORIGIN' });
  });
});
