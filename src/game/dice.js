import { DICE_MAX, DICE_MIN } from './constants.js';

export function rollDice(random = Math.random) {
  const value = Math.floor(random() * (DICE_MAX - DICE_MIN + 1)) + DICE_MIN;
  return Math.min(DICE_MAX, Math.max(DICE_MIN, value));
}

export function isValidDiceRoll(value) {
  return Number.isInteger(value) && value >= DICE_MIN && value <= DICE_MAX;
}
