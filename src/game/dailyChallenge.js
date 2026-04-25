const CHALLENGE_POOL = Object.freeze([
  { id: 'win-2-games', title: 'Win 2 mini-games', target: 2, metric: 'wins', reward: { coins: 40, xp: 25 } },
  { id: 'capture-3-tiles', title: 'Capture 3 tiles', target: 3, metric: 'tilesCaptured', reward: { coins: 60, xp: 35 } },
  { id: 'earn-100-coins', title: 'Earn 100 coins', target: 100, metric: 'coinsEarned', reward: { coins: 30, xp: 50 } },
  { id: 'play-5-games', title: 'Play 5 mini-games', target: 5, metric: 'gamesPlayedTotal', reward: { coins: 50, xp: 30 } },
]);

export function getDailyChallenge(date = new Date()) {
  const key = toDateKey(date);
  const index = hashDateKey(key) % CHALLENGE_POOL.length;

  return {
    ...CHALLENGE_POOL[index],
    dateKey: key,
  };
}

export function getDailyChallengeProgress(stats, challenge = getDailyChallenge()) {
  const current = getMetricValue(stats, challenge.metric);

  return {
    challenge,
    current,
    target: challenge.target,
    completed: current >= challenge.target,
    percent: Math.min(100, Math.round((current / challenge.target) * 100)),
  };
}

export function updateDailyStreak(history, date = new Date()) {
  const dateKey = toDateKey(date);
  const previousDateKey = shiftDateKey(date, -1);

  if (history?.lastCompletedDate === dateKey) {
    return history;
  }

  return {
    lastCompletedDate: dateKey,
    streak: history?.lastCompletedDate === previousDateKey ? Number(history.streak ?? 0) + 1 : 1,
  };
}

function getMetricValue(stats, metric) {
  if (metric === 'gamesPlayedTotal') {
    return Object.values(stats?.gamesPlayed ?? {}).reduce((total, value) => total + value, 0);
  }

  return Number(stats?.[metric] ?? 0);
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function shiftDateKey(date, offsetDays) {
  const shifted = new Date(date);
  shifted.setUTCDate(shifted.getUTCDate() + offsetDays);
  return toDateKey(shifted);
}

function hashDateKey(dateKey) {
  return [...dateKey].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}
