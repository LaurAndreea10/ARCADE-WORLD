export const MINI_GAME_MODES = Object.freeze({
  SOLO: 'solo',
  AI: 'ai',
  PVP: 'pvp',
  QUIZ: 'quiz',
  FULL: 'full',
});

export const MINI_GAMES = Object.freeze({
  basket: {
    id: 'basket',
    title: 'Basket',
    category: 'sports',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'higher-is-better',
  },
  hockey: {
    id: 'hockey',
    title: 'Hockey',
    category: 'sports',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'higher-is-better',
  },
  bounce: {
    id: 'bounce',
    title: 'Bounce',
    category: 'reflex',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'higher-is-better',
  },
  maze: {
    id: 'maze',
    title: 'Maze',
    category: 'puzzle',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'lower-time-is-better',
  },
  bomber: {
    id: 'bomber',
    title: 'Bomber',
    category: 'strategy',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'winner-takes-tile',
  },
  shooter: {
    id: 'shooter',
    title: 'Shooter',
    category: 'action',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'higher-is-better',
  },
  tictactoe: {
    id: 'tictactoe',
    title: 'TicTacToe',
    category: 'strategy',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'win-draw-loss',
  },
  memory: {
    id: 'memory',
    title: 'Memory',
    category: 'puzzle',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'lower-moves-is-better',
  },
  breakout: {
    id: 'breakout',
    title: 'Breakout',
    category: 'arcade',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'higher-is-better',
  },
  fusion: {
    id: 'fusion',
    title: 'Fusion',
    category: 'arcade',
    modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP, MINI_GAME_MODES.FULL],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'higher-is-better',
  },
  pvai: {
    id: 'pvai',
    title: 'PvAI Duel',
    category: 'duel',
    modes: [MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP],
    iframeUrl: null,
    hasLocalFallback: true,
    scoring: 'win-draw-loss',
  },
});

export function getMiniGame(gameId) {
  return MINI_GAMES[gameId] ?? null;
}

export function listMiniGames() {
  return Object.values(MINI_GAMES);
}

export function supportsMode(gameId, mode) {
  return Boolean(getMiniGame(gameId)?.modes.includes(mode));
}

export function validateMiniGameRegistry(registry = MINI_GAMES) {
  const ids = new Set();

  for (const [key, game] of Object.entries(registry)) {
    if (key !== game.id) {
      return { valid: false, reason: `Registry key ${key} does not match game id ${game.id}.` };
    }

    if (ids.has(game.id)) {
      return { valid: false, reason: `Duplicate mini-game id: ${game.id}.` };
    }

    if (!game.title || !Array.isArray(game.modes) || game.modes.length === 0) {
      return { valid: false, reason: `Mini-game ${game.id} is missing title or modes.` };
    }

    ids.add(game.id);
  }

  return { valid: true };
}
