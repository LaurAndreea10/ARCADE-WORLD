export const CORE_LOOP_STEPS = Object.freeze([
  { id: 'profile', label: 'Choose profile', copy: 'Pick an avatar before the first roll.' },
  { id: 'roll', label: 'Roll dice', copy: 'Roll to move around the arcade board.' },
  { id: 'tile', label: 'Land on tile', copy: 'Resolve the tile event or launch its mini-game.' },
  { id: 'minigame', label: 'Play mini-game', copy: 'Beat the challenge to earn a better medal.' },
  { id: 'reward', label: 'Claim reward', copy: 'Collect XP, coins, unlock progress, and boss damage.' },
  { id: 'repeat', label: 'Repeat', copy: 'Unlock new games, zones, avatar skins, and daily streaks.' },
]);

export const ONBOARDING_SLIDES = Object.freeze([
  {
    id: 'welcome',
    title: 'Welcome to Arcade World',
    body: 'Cucerește tabla, câștigă mini-jocuri, colectează coins și pregătește boss fight-ul.',
    cta: 'Next',
  },
  {
    id: 'loop',
    title: 'Roll, play, claim',
    body: 'Alege avatarul, aruncă zarul, intră în mini-game și revendică XP + coins după fiecare rundă.',
    cta: 'Show rewards',
  },
  {
    id: 'progression',
    title: 'Unlock the arcade',
    body: 'Începi cu 3 mini-jocuri. Restul se deblochează prin XP, coins, zone capturate și daily challenge.',
    cta: 'Start playing',
  },
]);

export const STARTER_MINI_GAME_IDS = Object.freeze(['basket', 'memory', 'breakout']);

export const DEFAULT_UNLOCK_RULES = Object.freeze({
  basket: { type: 'starter', label: 'Starter game' },
  memory: { type: 'starter', label: 'Starter game' },
  breakout: { type: 'starter', label: 'Starter game' },
  hockey: { type: 'xp', value: 120, label: 'Reach 120 XP' },
  bounce: { type: 'coins', value: 80, label: 'Collect 80 coins' },
  maze: { type: 'tilesCaptured', value: 3, label: 'Capture 3 tiles' },
  bomber: { type: 'level', value: 2, label: 'Reach level 2' },
  shooter: { type: 'bossProgress', value: 25, label: 'Deal 25% boss damage' },
  ticTacToe: { type: 'wins', value: 2, label: 'Win 2 mini-games' },
  fusion: { type: 'dailyStreak', value: 2, label: 'Build a 2-day streak' },
  pvai: { type: 'level', value: 3, label: 'Reach level 3' },
});

export const DEFAULT_STORE_LISTING = Object.freeze({
  tagline: 'Arcade World — mini-jocuri, zaruri, boss fights și aventură arcade într-un singur board game.',
  shortDescription:
    'Rulează zarul, cucerește tabla, câștigă mini-jocuri și deblochează avataruri într-un arcade board game rapid.',
  screenshots: [
    'Board overview with dice and player profile',
    'Mini-game launch screen with reward preview',
    'Shared result screen with medal, XP, and coins',
    'Daily challenge and streak panel',
    'Avatar skins and unlock shop',
    'Boss fight progress screen',
    'Mobile touch controls',
    'Offline progress saved locally',
  ],
});

export function getLoopStepForPhase(phase = 'profile') {
  return CORE_LOOP_STEPS.find((step) => step.id === phase) ?? CORE_LOOP_STEPS[0];
}

export function getOnboardingState(savedState = {}) {
  const completed = Boolean(savedState.completed);
  const index = clamp(Number(savedState.index ?? 0), 0, ONBOARDING_SLIDES.length - 1);

  return {
    completed,
    index,
    slide: ONBOARDING_SLIDES[index],
    total: ONBOARDING_SLIDES.length,
    progressPercent: completed ? 100 : Math.round(((index + 1) / ONBOARDING_SLIDES.length) * 100),
  };
}

export function advanceOnboarding(savedState = {}) {
  const state = getOnboardingState(savedState);

  if (state.completed || state.index >= ONBOARDING_SLIDES.length - 1) {
    return getOnboardingState({ completed: true, index: ONBOARDING_SLIDES.length - 1 });
  }

  return getOnboardingState({ completed: false, index: state.index + 1 });
}

export function createPlayerProfile({ id = 'p1', name = 'Player 1', avatar = '🕹️' } = {}) {
  return {
    id,
    name,
    avatar,
    level: 1,
    xp: 0,
    coins: 0,
    wins: 0,
    losses: 0,
    tilesCaptured: 0,
    bossProgress: 0,
    dailyStreak: 0,
    unlockedMiniGames: [...STARTER_MINI_GAME_IDS],
    unlockedSkins: ['classic'],
  };
}

export function getUnlockedMiniGames(profile = {}, rules = DEFAULT_UNLOCK_RULES) {
  return Object.entries(rules)
    .filter(([, rule]) => isUnlockRuleSatisfied(profile, rule))
    .map(([id]) => id);
}

export function getMiniGameUnlockState(miniGameId, profile = {}, rules = DEFAULT_UNLOCK_RULES) {
  const rule = rules[miniGameId] ?? { type: 'starter', label: 'Starter game' };
  const unlocked = isUnlockRuleSatisfied(profile, rule);

  return {
    miniGameId,
    unlocked,
    rule,
    label: unlocked ? 'Unlocked' : rule.label,
    current: getUnlockMetric(profile, rule.type),
    target: rule.value ?? 0,
  };
}

export function buildMiniGameResult({ miniGameId, score = 0, won = false, durationSeconds = 0, difficulty = 1 } = {}) {
  const medal = getMedal(score, won);
  const multiplier = medal === 'gold' ? 1.5 : medal === 'silver' ? 1.2 : medal === 'bronze' ? 1 : 0.6;
  const baseCoins = won ? 30 : 12;
  const baseXp = won ? 45 : 18;

  return {
    miniGameId,
    score,
    won,
    durationSeconds,
    difficulty,
    medal,
    rewards: {
      coins: Math.round(baseCoins * multiplier * difficulty),
      xp: Math.round(baseXp * multiplier * difficulty),
      bossDamage: won ? Math.min(12, 4 + difficulty * 2) : 1,
    },
  };
}

export function applyMiniGameResult(profile, result) {
  const nextXp = Number(profile?.xp ?? 0) + Number(result?.rewards?.xp ?? 0);
  const nextCoins = Number(profile?.coins ?? 0) + Number(result?.rewards?.coins ?? 0);
  const nextLevel = getLevelFromXp(nextXp);
  const bossProgress = clamp(Number(profile?.bossProgress ?? 0) + Number(result?.rewards?.bossDamage ?? 0), 0, 100);
  const wins = Number(profile?.wins ?? 0) + (result?.won ? 1 : 0);
  const losses = Number(profile?.losses ?? 0) + (result?.won ? 0 : 1);

  const nextProfile = {
    ...profile,
    xp: nextXp,
    coins: nextCoins,
    level: nextLevel,
    bossProgress,
    wins,
    losses,
  };

  return {
    profile: {
      ...nextProfile,
      unlockedMiniGames: getUnlockedMiniGames(nextProfile),
    },
    summary: buildResultSummary(result, nextProfile),
  };
}

export function buildRewardPreview(miniGameId, difficulty = 1) {
  const win = buildMiniGameResult({ miniGameId, score: 1000, won: true, difficulty });
  const lose = buildMiniGameResult({ miniGameId, score: 100, won: false, difficulty });

  return {
    miniGameId,
    win: win.rewards,
    participation: lose.rewards,
    copy: `Win for up to ${win.rewards.coins} coins and ${win.rewards.xp} XP. Participation still gives ${lose.rewards.coins} coins.`,
  };
}

export function buildDailyChallengeView(progress) {
  const challenge = progress?.challenge;

  return {
    title: challenge?.title ?? 'Daily challenge',
    rewardLabel: `${challenge?.reward?.coins ?? 0} coins + ${challenge?.reward?.xp ?? 0} XP`,
    progressLabel: `${progress?.current ?? 0}/${progress?.target ?? challenge?.target ?? 0}`,
    percent: clamp(Number(progress?.percent ?? 0), 0, 100),
    completed: Boolean(progress?.completed),
    claimCta: progress?.completed ? 'Claim daily reward' : 'Keep playing',
  };
}

export function createAndroidBackStack(initialScreen = 'board') {
  return [initialScreen];
}

export function pushScreen(stack, screen) {
  const current = stack?.[stack.length - 1];
  return current === screen ? [...stack] : [...(stack ?? []), screen];
}

export function handleAndroidBack(stack) {
  const safeStack = stack?.length ? [...stack] : ['board'];

  if (safeStack.length === 1) {
    return { stack: safeStack, action: 'confirm-exit', screen: safeStack[0] };
  }

  safeStack.pop();
  return { stack: safeStack, action: 'navigate-back', screen: safeStack[safeStack.length - 1] };
}

export function serializeLocalProgress(profile, extra = {}) {
  return JSON.stringify({
    version: 1,
    savedAt: new Date().toISOString(),
    profile,
    ...extra,
  });
}

export function parseLocalProgress(raw, fallbackProfile = createPlayerProfile()) {
  try {
    const parsed = JSON.parse(raw);
    return {
      version: Number(parsed.version ?? 1),
      profile: parsed.profile ?? fallbackProfile,
      savedAt: parsed.savedAt ?? null,
    };
  } catch {
    return {
      version: 1,
      profile: fallbackProfile,
      savedAt: null,
      recovered: true,
    };
  }
}

function isUnlockRuleSatisfied(profile, rule) {
  if (rule.type === 'starter') return true;
  return getUnlockMetric(profile, rule.type) >= Number(rule.value ?? 0);
}

function getUnlockMetric(profile, type) {
  if (type === 'coins') return Number(profile?.coins ?? 0);
  if (type === 'xp') return Number(profile?.xp ?? 0);
  if (type === 'level') return Number(profile?.level ?? getLevelFromXp(profile?.xp ?? 0));
  if (type === 'tilesCaptured') return Number(profile?.tilesCaptured ?? 0);
  if (type === 'bossProgress') return Number(profile?.bossProgress ?? 0);
  if (type === 'wins') return Number(profile?.wins ?? 0);
  if (type === 'dailyStreak') return Number(profile?.dailyStreak ?? 0);
  return 0;
}

function getMedal(score, won) {
  if (!won) return 'participation';
  if (score >= 900) return 'gold';
  if (score >= 600) return 'silver';
  return 'bronze';
}

function getLevelFromXp(xp) {
  return Math.max(1, Math.floor(Number(xp ?? 0) / 100) + 1);
}

function buildResultSummary(result, profile) {
  return {
    title: result.won ? 'Victory!' : 'Round complete',
    medal: result.medal,
    rewardLine: `+${result.rewards.coins} coins · +${result.rewards.xp} XP`,
    progressLine: `Level ${profile.level} · Boss ${profile.bossProgress}%`,
    nextStep: profile.bossProgress >= 100 ? 'Boss unlocked' : 'Roll again',
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
