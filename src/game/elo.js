import { DEFAULT_ELO } from './constants.js';

export function expectedScore(playerRating, opponentRating) {
  return 1 / (1 + 10 ** ((opponentRating - playerRating) / 400));
}

export function updateElo(playerRating = DEFAULT_ELO, opponentRating = DEFAULT_ELO, result, kFactor = 32) {
  if (![0, 0.5, 1].includes(result)) {
    throw new RangeError('Result must be 0, 0.5, or 1.');
  }

  return Math.round(playerRating + kFactor * (result - expectedScore(playerRating, opponentRating)));
}
