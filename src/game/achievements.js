export const ACHIEVEMENTS = Object.freeze([
  {
    id: 'first-win',
    title: 'First Win',
    rarity: 'common',
    description: 'Win your first mini-game.',
    isUnlocked: (stats) => Number(stats?.wins ?? 0) >= 1,
  },
  {
    id: 'tile-collector',
    title: 'Tile Collector',
    rarity: 'rare',
    description: 'Capture 5 tiles.',
    isUnlocked: (stats) => Number(stats?.tilesCaptured ?? 0) >= 5,
  },
  {
    id: 'hot-streak',
    title: 'Hot Streak',
    rarity: 'epic',
    description: 'Reach a 5-win streak.',
    isUnlocked: (stats) => Number(stats?.highestStreak ?? 0) >= 5,
  },
  {
    id: 'arcade-legend',
    title: 'Arcade Legend',
    rarity: 'legendary',
    description: 'Win 25 mini-games.',
    isUnlocked: (stats) => Number(stats?.wins ?? 0) >= 25,
  },
]);

export function evaluateAchievements(stats, achievements = ACHIEVEMENTS) {
  return achievements.map((achievement) => ({
    id: achievement.id,
    title: achievement.title,
    rarity: achievement.rarity,
    description: achievement.description,
    unlocked: achievement.isUnlocked(stats),
  }));
}

export function getUnlockedAchievementIds(stats, achievements = ACHIEVEMENTS) {
  return evaluateAchievements(stats, achievements)
    .filter((achievement) => achievement.unlocked)
    .map((achievement) => achievement.id);
}
