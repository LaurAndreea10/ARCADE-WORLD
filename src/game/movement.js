import { BOARD_TILE_COUNT } from './constants.js';

export function normalizePosition(position, tileCount = BOARD_TILE_COUNT) {
  if (!Number.isInteger(position)) {
    throw new TypeError('Position must be an integer.');
  }

  return ((position % tileCount) + tileCount) % tileCount;
}

export function moveToken(currentPosition, steps, tileCount = BOARD_TILE_COUNT) {
  if (!Number.isInteger(steps)) {
    throw new TypeError('Steps must be an integer.');
  }

  const rawPosition = currentPosition + steps;
  return {
    position: normalizePosition(rawPosition, tileCount),
    passedStart: rawPosition >= tileCount,
  };
}
