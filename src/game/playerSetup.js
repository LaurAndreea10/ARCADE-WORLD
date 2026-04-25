export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;

export const DEFAULT_PLAYER_TEMPLATES = Object.freeze([
  { name: 'Player 1', avatar: '🟡', color: '#ffd54a' },
  { name: 'Player 2', avatar: '🔵', color: '#6ee7ff' },
  { name: 'Player 3', avatar: '🟣', color: '#a78bfa' },
  { name: 'Player 4', avatar: '🟢', color: '#30d27c' },
]);

export function normalizePlayerCount(count, fallback = MIN_PLAYERS) {
  const parsed = Number(count);

  if (!Number.isInteger(parsed)) {
    return fallback;
  }

  return Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, parsed));
}

export function createDefaultPlayers(count = MIN_PLAYERS, overrides = []) {
  const playerCount = normalizePlayerCount(count);

  return DEFAULT_PLAYER_TEMPLATES.slice(0, playerCount).map((template, index) => ({
    id: `p${index + 1}`,
    name: overrides[index]?.name?.trim() || template.name,
    avatar: overrides[index]?.avatar || template.avatar,
    color: overrides[index]?.color || template.color,
    position: 0,
    coins: 100,
    xp: 0,
    level: 1,
    elo: 1000,
    inventory: [],
    stats: overrides[index]?.stats ?? undefined,
  }));
}

export function resizePlayers(existingPlayers = [], requestedCount = MIN_PLAYERS) {
  const playerCount = normalizePlayerCount(requestedCount);
  const defaults = createDefaultPlayers(playerCount);

  return defaults.map((defaultPlayer, index) => ({
    ...defaultPlayer,
    ...(existingPlayers[index] ?? {}),
    id: `p${index + 1}`,
  }));
}

export function getPlayerCountOptions() {
  return Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, index) => MIN_PLAYERS + index);
}
