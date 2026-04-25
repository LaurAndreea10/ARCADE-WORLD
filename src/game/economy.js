export function canAfford(player, cost) {
  return Number(player?.coins ?? 0) >= cost;
}

export function buyItem(player, item) {
  if (!player || !item) {
    throw new TypeError('Player and item are required.');
  }

  if (!canAfford(player, item.cost)) {
    return {
      success: false,
      player,
      reason: 'NOT_ENOUGH_COINS',
    };
  }

  return {
    success: true,
    player: {
      ...player,
      coins: player.coins - item.cost,
      inventory: [...(player.inventory ?? []), item.id],
    },
  };
}

export function applyReward(player, reward) {
  return {
    ...player,
    coins: Number(player.coins ?? 0) + Number(reward.coins ?? 0),
    xp: Number(player.xp ?? 0) + Number(reward.xp ?? 0),
  };
}
