export const HUD_DASHBOARD_SECTIONS = Object.freeze([
  {
    id: 'quest-progress',
    title: 'Misiune activă',
    priority: 1,
    gridArea: 'quest',
  },
  {
    id: 'player-standings',
    title: 'Clasament jucători',
    priority: 2,
    gridArea: 'standings',
  },
  {
    id: 'inventory',
    title: 'Inventar activ',
    priority: 3,
    gridArea: 'inventory',
  },
  {
    id: 'turn-timeline',
    title: 'Timeline tură',
    priority: 4,
    gridArea: 'timeline',
  },
  {
    id: 'tile-preview',
    title: 'Tile curent / următor',
    priority: 5,
    gridArea: 'tile',
  },
  {
    id: 'quick-actions',
    title: 'Acțiuni rapide',
    priority: 6,
    gridArea: 'actions',
  },
]);

export function buildHudDashboardModel(state = {}) {
  const players = Array.isArray(state.players) ? state.players : [];
  const currentPlayer = players[state.currentPlayerIndex ?? 0] ?? players[0] ?? null;
  const activeQuest = state.activeQuest ?? state.quickObjective ?? null;
  const currentTile = state.currentTile ?? null;
  const nextTile = state.nextTile ?? null;

  return {
    sections: HUD_DASHBOARD_SECTIONS,
    currentPlayer,
    activeQuest,
    standings: buildStandings(players),
    inventory: currentPlayer?.inventory ?? [],
    timeline: Array.isArray(state.timeline) ? state.timeline.slice(-5) : [],
    tilePreview: {
      current: currentTile,
      next: nextTile,
    },
    quickActions: buildQuickActions(state),
  };
}

export function buildStandings(players = []) {
  return [...players]
    .map((player) => ({
      id: player.id,
      name: player.name,
      coins: Number(player.coins ?? 0),
      xp: Number(player.xp ?? 0),
      tilesCaptured: Number(player.tilesCaptured ?? player.stats?.tilesCaptured ?? 0),
      score: calculatePlayerScore(player),
    }))
    .sort((a, b) => b.score - a.score || b.coins - a.coins || a.name.localeCompare(b.name));
}

export function calculatePlayerScore(player = {}) {
  return (
    Number(player.coins ?? 0) +
    Number(player.xp ?? 0) * 2 +
    Number(player.tilesCaptured ?? player.stats?.tilesCaptured ?? 0) * 50 +
    Number(player.elo ?? 1000) / 10
  );
}

export function buildQuickActions(state = {}) {
  return [
    {
      id: 'roll',
      label: 'Aruncă zarul',
      enabled: Boolean(state.canRoll ?? true),
    },
    {
      id: 'bonus',
      label: `Bonus (${Number(state.bonusTurns ?? 0)})`,
      enabled: Number(state.bonusTurns ?? 0) > 0,
    },
    {
      id: 'shop',
      label: 'Shop',
      enabled: true,
    },
    {
      id: 'stats',
      label: 'Stats',
      enabled: true,
    },
  ];
}

export function getEmptySpaceFillRecommendations(viewport = {}) {
  const width = Number(viewport.width ?? 0);

  if (width < 720) {
    return ['quest-progress', 'player-standings', 'quick-actions'];
  }

  if (width < 1100) {
    return ['quest-progress', 'player-standings', 'inventory', 'turn-timeline'];
  }

  return HUD_DASHBOARD_SECTIONS.map((section) => section.id);
}
