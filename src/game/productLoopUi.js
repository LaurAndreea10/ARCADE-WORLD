import {
  advanceOnboarding,
  applyMiniGameResult,
  buildDailyChallengeView,
  buildMiniGameResult,
  buildRewardPreview,
  createAndroidBackStack,
  createPlayerProfile,
  getMiniGameUnlockState,
  getOnboardingState,
  handleAndroidBack,
  parseLocalProgress,
  pushScreen,
  serializeLocalProgress,
} from './productLoop.js';
import { getDailyChallenge, getDailyChallengeProgress } from './dailyChallenge.js';

const STORAGE_KEY = 'arcade-world-product-loop-v1';
const STYLE_ID = 'arcade-product-loop-style';

export function installArcadeProductLoopUi({ mount = document.body, storage = window.localStorage } = {}) {
  injectStyles();

  const saved = parseStoredState(storage);
  const profile = saved.profile ?? createPlayerProfile();
  const onboarding = getOnboardingState(saved.onboarding);
  const stack = createAndroidBackStack('board');
  const root = document.createElement('aside');
  root.className = 'aw-loop-shell';
  root.setAttribute('aria-label', 'Arcade World progress assistant');

  const state = {
    profile,
    onboarding,
    stack,
    lastResult: null,
    selectedMiniGame: 'basket',
  };

  function persist() {
    storage.setItem(
      STORAGE_KEY,
      serializeLocalProgress(state.profile, {
        onboarding: { completed: state.onboarding.completed, index: state.onboarding.index },
        selectedMiniGame: state.selectedMiniGame,
      }),
    );
  }

  function render() {
    const challenge = getDailyChallenge();
    const challengeProgress = getDailyChallengeProgress(
      {
        wins: state.profile.wins,
        tilesCaptured: state.profile.tilesCaptured,
        coinsEarned: state.profile.coins,
        gamesPlayed: { arcade: state.profile.wins + state.profile.losses },
      },
      challenge,
    );
    const dailyView = buildDailyChallengeView(challengeProgress);
    const preview = buildRewardPreview(state.selectedMiniGame);
    const unlocks = ['basket', 'memory', 'breakout', 'hockey', 'bounce', 'maze', 'bomber', 'shooter', 'ticTacToe', 'fusion', 'pvai'].map(
      (id) => getMiniGameUnlockState(id, state.profile),
    );

    root.innerHTML = `
      <div class="aw-loop-card aw-loop-card--hero">
        <div>
          <div class="aw-loop-kicker">Core loop</div>
          <strong>${state.profile.avatar} ${escapeHtml(state.profile.name)}</strong>
          <p>Alege profil → aruncă zarul → joacă mini-game → primește XP/coins → deblochează conținut.</p>
        </div>
        <button class="aw-loop-button" data-aw-action="profile">Avatar</button>
      </div>

      ${state.onboarding.completed ? '' : renderOnboarding(state.onboarding)}

      <div class="aw-loop-grid">
        <div class="aw-loop-stat"><span>Level</span><strong>${state.profile.level}</strong></div>
        <div class="aw-loop-stat"><span>XP</span><strong>${state.profile.xp}</strong></div>
        <div class="aw-loop-stat"><span>Coins</span><strong>${state.profile.coins}</strong></div>
        <div class="aw-loop-stat"><span>Boss</span><strong>${state.profile.bossProgress}%</strong></div>
      </div>

      <div class="aw-loop-card">
        <div class="aw-loop-kicker">Reward preview</div>
        <strong>${state.selectedMiniGame}</strong>
        <p>${preview.copy}</p>
        <div class="aw-loop-actions">
          <button class="aw-loop-button" data-aw-action="demo-win">Simulate win</button>
          <button class="aw-loop-button aw-loop-button--ghost" data-aw-action="demo-loss">Simulate loss</button>
        </div>
      </div>

      ${state.lastResult ? renderResult(state.lastResult) : ''}

      <div class="aw-loop-card">
        <div class="aw-loop-kicker">Daily challenge</div>
        <strong>${escapeHtml(dailyView.title)}</strong>
        <p>${dailyView.progressLabel} · ${dailyView.rewardLabel}</p>
        <div class="aw-loop-bar"><span style="width:${dailyView.percent}%"></span></div>
        <button class="aw-loop-button aw-loop-button--wide" data-aw-action="claim-daily" ${dailyView.completed ? '' : 'disabled'}>${dailyView.claimCta}</button>
      </div>

      <div class="aw-loop-card">
        <div class="aw-loop-kicker">Mini-game unlocks</div>
        <div class="aw-loop-unlocks">
          ${unlocks.map(renderUnlock).join('')}
        </div>
      </div>
    `;

    persist();
  }

  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-aw-action]');
    if (!button) return;

    const action = button.dataset.awAction;

    if (action === 'next-onboarding') {
      state.onboarding = advanceOnboarding(state.onboarding);
    }

    if (action === 'profile') {
      const avatars = ['🕹️', '⭐', '🚀', '🐉', '👾'];
      const currentIndex = avatars.indexOf(state.profile.avatar);
      state.profile = { ...state.profile, avatar: avatars[(currentIndex + 1) % avatars.length] };
      vibrate();
    }

    if (action === 'demo-win' || action === 'demo-loss') {
      const result = buildMiniGameResult({
        miniGameId: state.selectedMiniGame,
        score: action === 'demo-win' ? 950 : 180,
        won: action === 'demo-win',
        difficulty: 1,
      });
      const applied = applyMiniGameResult(state.profile, result);
      state.profile = applied.profile;
      state.lastResult = applied.summary;
      state.stack = pushScreen(state.stack, 'result');
      vibrate();
    }

    if (action === 'claim-daily') {
      state.profile = {
        ...state.profile,
        coins: state.profile.coins + 40,
        xp: state.profile.xp + 25,
        dailyStreak: state.profile.dailyStreak + 1,
      };
      state.lastResult = {
        title: 'Daily reward claimed',
        medal: 'daily',
        rewardLine: '+40 coins · +25 XP',
        progressLine: `${state.profile.dailyStreak} day streak`,
        nextStep: 'Come back tomorrow',
      };
      vibrate();
    }

    render();
  });

  window.addEventListener('popstate', () => {
    const back = handleAndroidBack(state.stack);
    state.stack = back.stack;
    if (back.action === 'navigate-back') {
      state.lastResult = null;
      render();
    }
  });

  mount.append(root);
  render();

  return {
    root,
    getState: () => ({ ...state }),
    destroy: () => root.remove(),
  };
}

function parseStoredState(storage) {
  const parsed = parseLocalProgress(storage.getItem(STORAGE_KEY) ?? '');
  return {
    profile: parsed.profile,
    onboarding: parsed.onboarding ?? { completed: false, index: 0 },
    selectedMiniGame: parsed.selectedMiniGame ?? 'basket',
  };
}

function renderOnboarding(onboarding) {
  return `
    <div class="aw-loop-card aw-loop-card--onboarding">
      <div class="aw-loop-kicker">Start ${onboarding.index + 1}/${onboarding.total}</div>
      <strong>${escapeHtml(onboarding.slide.title)}</strong>
      <p>${escapeHtml(onboarding.slide.body)}</p>
      <div class="aw-loop-bar"><span style="width:${onboarding.progressPercent}%"></span></div>
      <button class="aw-loop-button aw-loop-button--wide" data-aw-action="next-onboarding">${escapeHtml(onboarding.slide.cta)}</button>
    </div>
  `;
}

function renderResult(result) {
  return `
    <div class="aw-loop-card aw-loop-card--result">
      <div class="aw-loop-kicker">Result screen</div>
      <strong>${escapeHtml(result.title)} · ${escapeHtml(result.medal)}</strong>
      <p>${escapeHtml(result.rewardLine)}</p>
      <p>${escapeHtml(result.progressLine)} · ${escapeHtml(result.nextStep)}</p>
    </div>
  `;
}

function renderUnlock(unlock) {
  return `
    <button class="aw-loop-unlock ${unlock.unlocked ? 'is-unlocked' : 'is-locked'}" data-mini-game="${escapeHtml(unlock.miniGameId)}" title="${escapeHtml(unlock.label)}">
      <span>${escapeHtml(unlock.miniGameId)}</span>
      <small>${unlock.unlocked ? 'OPEN' : `${unlock.current}/${unlock.target}`}</small>
    </button>
  `;
}

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .aw-loop-shell{position:fixed;right:16px;bottom:16px;z-index:90;width:min(390px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;display:grid;gap:10px;padding:10px;border:1px solid rgba(110,231,255,.24);border-radius:24px;background:rgba(3,9,22,.82);box-shadow:0 24px 80px rgba(0,0,0,.45);backdrop-filter:blur(14px);color:#f5fbff;font-family:Outfit,Inter,system-ui,sans-serif}.aw-loop-card{padding:14px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:linear-gradient(180deg,rgba(15,30,56,.95),rgba(7,15,28,.95));box-shadow:0 12px 32px rgba(0,0,0,.22)}.aw-loop-card--hero{display:flex;align-items:center;justify-content:space-between;gap:12px}.aw-loop-card--onboarding{border-color:rgba(255,213,74,.35)}.aw-loop-card--result{border-color:rgba(48,210,124,.35)}.aw-loop-kicker{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#ffd54a;font-weight:900;margin-bottom:4px}.aw-loop-card strong{display:block;font-size:16px}.aw-loop-card p{margin:6px 0 0;color:rgba(245,251,255,.76);font-size:13px;line-height:1.35}.aw-loop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.aw-loop-stat{padding:10px;border-radius:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);text-align:center}.aw-loop-stat span{display:block;font-size:10px;color:rgba(245,251,255,.68);text-transform:uppercase;letter-spacing:.12em}.aw-loop-stat strong{display:block;margin-top:4px;font-size:16px}.aw-loop-button{border:0;border-radius:14px;padding:10px 12px;background:linear-gradient(180deg,#c4f6ff,#6ee7ff);color:#06172a;font-weight:900;cursor:pointer}.aw-loop-button:disabled{opacity:.45;cursor:not-allowed}.aw-loop-button--ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.12)}.aw-loop-button--wide{width:100%;margin-top:10px}.aw-loop-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.aw-loop-bar{height:9px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.12);margin-top:10px}.aw-loop-bar span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#6ee7ff,#ffd54a)}.aw-loop-unlocks{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:10px}.aw-loop-unlock{display:flex;align-items:center;justify-content:space-between;gap:8px;border-radius:14px;padding:9px 10px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#fff;text-align:left}.aw-loop-unlock span{font-weight:900}.aw-loop-unlock small{font-size:10px;font-weight:900;color:rgba(245,251,255,.72)}.aw-loop-unlock.is-locked{opacity:.55;filter:grayscale(.25)}.aw-loop-unlock.is-unlocked{border-color:rgba(48,210,124,.38)}@media(max-width:760px){.aw-loop-shell{left:12px;right:12px;bottom:12px;width:auto;max-height:48vh}.aw-loop-grid{grid-template-columns:repeat(2,1fr)}}
  `;
  document.head.append(style);
}

function vibrate() {
  if ('vibrate' in navigator) navigator.vibrate(18);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

if (typeof window !== 'undefined') {
  window.ArcadeProductLoop = { install: installArcadeProductLoopUi };
}
