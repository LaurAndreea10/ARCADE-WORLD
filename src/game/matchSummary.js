export function createMatchEvent(type, payload = {}, date = new Date()) {
  return {
    id: `${date.getTime()}-${type}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    at: date.toISOString(),
    payload,
  };
}

export function createMatchSummary(events = []) {
  const summary = {
    turns: 0,
    captures: 0,
    duels: 0,
    purchases: 0,
    rewards: 0,
    timeline: [...events].sort((a, b) => a.at.localeCompare(b.at)),
  };

  for (const event of summary.timeline) {
    if (event.type === 'turn-ended') summary.turns += 1;
    if (event.type === 'tile-captured') summary.captures += 1;
    if (event.type === 'duel-finished') summary.duels += 1;
    if (event.type === 'shop-purchase') summary.purchases += 1;
    if (event.type === 'reward-earned') summary.rewards += 1;
  }

  return summary;
}

export function formatMatchEvent(event) {
  const payload = event.payload ?? {};

  switch (event.type) {
    case 'tile-captured':
      return `${payload.playerName ?? 'A player'} captured ${payload.tileName ?? 'a tile'}.`;
    case 'duel-finished':
      return `${payload.winnerName ?? 'A player'} won a duel${payload.gameName ? ` in ${payload.gameName}` : ''}.`;
    case 'shop-purchase':
      return `${payload.playerName ?? 'A player'} bought ${payload.itemName ?? 'an item'}.`;
    case 'reward-earned':
      return `${payload.playerName ?? 'A player'} earned ${payload.coins ?? 0} coins and ${payload.xp ?? 0} XP.`;
    case 'turn-ended':
      return `${payload.playerName ?? 'A player'} ended their turn.`;
    default:
      return 'Game event recorded.';
  }
}
