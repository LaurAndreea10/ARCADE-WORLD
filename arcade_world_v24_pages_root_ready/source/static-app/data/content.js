export const boardTiles = [
  { name: 'START', family: 'hub', type: 'special', boss: false, reward: { coins: 20, xp: 10 } },
  { name: 'Basket', family: 'sports', type: 'normal', boss: false, reward: { coins: 25, xp: 14 } },
  { name: 'Maze', family: 'puzzle', type: 'normal', boss: false, reward: { coins: 24, xp: 13 } },
  { name: 'Breakout', family: 'arcade', type: 'normal', boss: false, reward: { coins: 26, xp: 15 } },
  { name: 'BONUS', family: 'special', type: 'special', boss: false, reward: { coins: 35, xp: 20 } },
  { name: 'Shooter', family: 'action', type: 'normal', boss: false, reward: { coins: 28, xp: 17 } },
  { name: 'Fusion', family: 'mix', type: 'normal', boss: true, reward: { coins: 50, xp: 35 } },
  { name: 'Memory', family: 'puzzle', type: 'normal', boss: false, reward: { coins: 22, xp: 12 } },
  { name: 'CAPCANĂ', family: 'special', type: 'special', boss: false, reward: { coins: 5, xp: 4 } },
  { name: 'Arena Duel', family: 'combat', type: 'normal', boss: true, reward: { coins: 48, xp: 34 } },
  { name: 'Boss Gate', family: 'boss', type: 'special', boss: true, reward: { coins: 60, xp: 40 } },
  { name: 'Hockey', family: 'sports', type: 'normal', boss: false, reward: { coins: 24, xp: 13 } },
];

export const campaignChapters = [
  { id: 1, title: 'Chapter 1 · Rookie Neon', goal: 'Capture 3 tiles and beat 1 boss.' },
  { id: 2, title: 'Chapter 2 · Territory Rush', goal: 'Own 5 tiles and finish 2 full-game runs.' },
  { id: 3, title: 'Chapter 3 · Final Cup', goal: 'Win the season table and defeat the final boss.' },
];

export const releaseChecklist = [
  'Favicon + splash',
  'Help/manual',
  'Credits screen',
  'Versioned changelog',
  'Import/export save',
  'Keyboard + contrast review',
  'Mobile sanity pass',
];
