import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { URL } from 'node:url';

const context = {};
runInNewContext(
  readFileSync(new URL('../src/integration/carpatiEnduroBridge.js', import.meta.url), 'utf8'),
  context,
);
const valid = context.validCarpatiEnduroResult;
const frame = {};
const good = {
  origin: 'https://laurandreea10.github.io',
  source: frame,
  data: {
    type: 'GAME_SCORE',
    gameId: 'carpati-enduro',
    completed: true,
    score: 90,
    time: 55.25,
    crashes: 2,
    version: '2.1.0',
  },
};

describe('Carpați Enduro iframe result contract', () => {
  it('accepts bounded results only from the active game', () => {
    expect(valid(good, frame, 'carpatienduro')).toBe(true);
  });

  it('rejects another origin, window or active experience', () => {
    expect(valid({ ...good, origin: 'https://evil.example' }, frame, 'carpatienduro')).toBe(false);
    expect(valid({ ...good, source: {} }, frame, 'carpatienduro')).toBe(false);
    expect(valid(good, frame, 'kygo')).toBe(false);
  });

  it('rejects malformed or unbounded result fields', () => {
    for (const data of [
      { ...good.data, score: Infinity },
      { ...good.data, time: -1 },
      { ...good.data, crashes: 1.5 },
      { ...good.data, completed: 'yes' },
      { ...good.data, version: '<img>' },
      null,
    ]) {
      expect(valid({ ...good, data }, frame, 'carpatienduro')).toBe(false);
    }
  });
});
