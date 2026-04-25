export const EMPTY_PLAYER_STATS = Object.freeze({
  wins: 0,
  losses: 0,
  draws: 0,
  coinsEarned: 0,
  xpEarned: 0,
  tilesCaptured: 0,
  highestStreak: 0,
  gamesPlayed: {},
  eloHistory: [],
});

export function createPlayerStats(overrides = {}) {
  return {
    ...EMPTY_PLAYER_STATS,
    ...overrides,
    gamesPlayed: { ...(overrides.gamesPlayed ?? {}) },
    eloHistory: [...(overrides.eloHistory ?? [])],
  };
}

export function recordMiniGameResult(stats, { gameId, result, coins = 0, xp = 0, streak = 0, elo = null }) {
  const next = createPlayerStats(stats);

  if (result === 'win') next.wins += 1;
  if (result === 'loss') next.losses += 1;
  if (result === 'draw') next.draws += 1;

  next.coinsEarned += coins;
  next.xpEarned += xp;
  next.highestStreak = Math.max(next.highestStreak, streak);
  next.gamesPlayed[gameId] = (next.gamesPlayed[gameId] ?? 0) + 1;

  if (elo !== null) {
    next.eloHistory.push({ at: new Date().toISOString(), value: elo });
  }

  return next;
}

export function recordTileCapture(stats, count = 1) {
  return createPlayerStats({
    ...stats,
    tilesCaptured: Number(stats?.tilesCaptured ?? 0) + count,
  });
}

export function getFavoriteMiniGame(stats) {
  const entries = Object.entries(stats?.gamesPlayed ?? {});

  if (entries.length === 0) {
    return null;
  }

  return entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
}

export function getWinRate(stats) {
  const wins = Number(stats?.wins ?? 0);
  const losses = Number(stats?.losses ?? 0);
  const draws = Number(stats?.draws ?? 0);
  const total = wins + losses + draws;

  return total === 0 ? 0 : wins / total;
}
