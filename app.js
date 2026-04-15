const TOTAL = 24;
const WIN_SCORE = 20;
const PASS_START_BONUS = 1;
const MEM_SYMBOLS = ['🌟','🔥','💧','🌊','⚡','🍀','💎','🌙'];

const CELLS = [
  {id:0,  icon:'🏁', name:'START',      type:'bonus',      pts:0,  desc:'Punct de pornire!',                 game:'start',    variant:'boost'},
  {id:1,  icon:'🏀', name:'Basket',     type:'basketball', pts:2,  desc:'Basket Arena',                      game:'shoot',    variant:'classic'},
  {id:2,  icon:'🗺️', name:'Labirint',   type:'puzzle',     pts:3,  desc:'Maze Adventure',                    game:'maze',     variant:'classic'},
  {id:3,  icon:'⭐', name:'Bonus+3',     type:'bonus',      pts:3,  desc:'Bonus gratuit!',                    game:'bonus',    variant:'stars'},
  {id:4,  icon:'💣', name:'Bomberman',  type:'arcade',     pts:2,  desc:'Bomberman Neo',                     game:'bomb',     variant:'selector'},
  {id:5,  icon:'🚀', name:'Void',       type:'shooter',    pts:3,  desc:'Void Hunter',                       game:'shooter',  variant:'classic'},
  {id:6,  icon:'🎭', name:'Fusion',     type:'arcade',     pts:3,  desc:'Arcade Fusion',                     game:'fusion',   variant:'selector'},
  {id:7,  icon:'💀', name:'Capcană',    type:'special',    pts:-2, desc:'Piezi 2 puncte!',                   game:'trap',     variant:'wire'},
  {id:8,  icon:'🏒', name:'Hockey',     type:'arcade',     pts:3,  desc:'Air Hockey',                        game:'hockey',   variant:'selector'},
  {id:9,  icon:'✖️', name:'TicTacToe',  type:'puzzle',     pts:2,  desc:'Tic Tac Toe',                       game:'ttt',      variant:'classic'},
  {id:10, icon:'🔵', name:'Bounce',     type:'arcade',     pts:2,  desc:'Bounce Ball',                       game:'bounce',   variant:'classic'},
  {id:11, icon:'⭐', name:'Bonus+4',     type:'bonus',      pts:4,  desc:'Bonus mare!',                       game:'bonus',    variant:'sequence'},
  {id:12, icon:'🃏', name:'Memory',     type:'memory',     pts:3,  desc:'Particle Memory',                   game:'memory',   variant:'medium'},
  {id:13, icon:'🧱', name:'Breakout',   type:'arcade',     pts:2,  desc:'Breakout Portal',                   game:'breakout', variant:'selector'},
  {id:14, icon:'💀', name:'Capcană',    type:'special',    pts:-3, desc:'Piezi 3 puncte!',                   game:'trap',     variant:'reaction'},
  {id:15, icon:'🏀', name:'Basket+',    type:'basketball', pts:3,  desc:'Basket Arena Pro',                  game:'shoot',    variant:'fast'},
  {id:16, icon:'⚔️', name:'PvAI',       type:'arcade',     pts:4,  desc:'Joc PvAI Boss',                     game:'pvai',     variant:'selector'},
  {id:17, icon:'⭐', name:'Bonus+2',     type:'bonus',      pts:2,  desc:'Bonus!',                            game:'bonus',    variant:'lucky-pick'},
  {id:18, icon:'🚀', name:'Shooter2',   type:'shooter',    pts:3,  desc:'Void Hunter v2',                    game:'shooter',  variant:'hard'},
  {id:19, icon:'💣', name:'Bomba!',     type:'arcade',     pts:3,  desc:'Bomberman Hardcore',                game:'bomb',     variant:'selector'},
  {id:20, icon:'🃏', name:'Mem.Pro',    type:'memory',     pts:4,  desc:'Memory Hard',                       game:'memory',   variant:'hard'},
  {id:21, icon:'🏒', name:'Hockey+',    type:'arcade',     pts:3,  desc:'Air Hockey Combo',                  game:'hockey',   variant:'selector'},
  {id:22, icon:'🧱', name:'Breakout+',  type:'arcade',     pts:3,  desc:'Breakout Colors',                   game:'breakout', variant:'selector'},
  {id:23, icon:'🎭', name:'Fusion+',    type:'arcade',     pts:4,  desc:'Dimension Collapsed',               game:'fusion',   variant:'selector'},
];

const STORAGE_KEY = 'arcade-world-profile-v2';
const MODE_LABELS = { solo: 'Solo Skill', ai: 'Vs AI', quiz: 'Skill + Quiz', full: 'Full Game' };
const DIFF_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
const DIFF_REWARD = { easy: 0, medium: 1, hard: 2 };
const DAILY_TARGET = { plays: 5, wins: 3, fullRuns: 2 };
const WEEKLY_TARGET_WINS = 12;
const FULL_GAME_LINKS = {
  shoot: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=basket-career',
  ttt: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=tic-tac-toe',
  shooter: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=void-hunter',
  pvai: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=pvai',
  hockey: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=air-hockey',
  bomb: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=bomberman',
  breakout: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=breakout',
  bounce: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=bounce',
  maze: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=maze',
  fusion: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=fusion',
  memory: 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/?game=particle-memory'
};
const FUSION_PORTAL_URL = 'https://es-d-0728073020260417-019d8fca-8d0c-70aa-ac45-d66d5b467a3d.codepen.dev/';
const LEGACY_WORLD_URL = 'https://laurandreea10.github.io/ARCADE-WORLD/';

let state;
let logEntries = [];
let mgState = {};
let timers = [];
let profile = {};

function todayISO() { return new Date().toISOString().slice(0, 10); }
function ensureGameProgress(game) {
  if (!profile.progressByGame[game]) profile.progressByGame[game] = { plays: 0, wins: 0, soloWins: 0, aiWins: 0, quizWins: 0, fullWins: 0, fullRuns: 0 };
  return profile.progressByGame[game];
}
function freshProfile() {
  return {
    version: 2,
    totals: { plays: 0, wins: 0, fullRuns: 0, quizWins: 0 },
    inventory: { coins: 0, shards: 0, tickets: 0, keys: 0 },
    badges: [],
    achievements: {},
    progressByGame: {},
    fullRuns: { totalWins: 0, byGame: {} },
    dailyProgress: { date: todayISO(), plays: 0, wins: 0, fullRuns: 0 },
    questsState: { dailyClaimed: false, weekly: { week: getWeekId(), wins: 0, claimed: false } }
  };
}
function getWeekId() {
  const d = new Date();
  const first = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const dayMs = 24 * 3600 * 1000;
  return `${d.getUTCFullYear()}-W${Math.ceil((((d - first) / dayMs) + first.getUTCDay() + 1) / 7)}`;
}
function hydrateProfile(raw) {
  const base = freshProfile();
  const merged = { ...base, ...(raw || {}) };
  merged.totals = { ...base.totals, ...(raw?.totals || {}) };
  merged.inventory = { ...base.inventory, ...(raw?.inventory || {}) };
  merged.fullRuns = { ...base.fullRuns, ...(raw?.fullRuns || {}), byGame: { ...(base.fullRuns.byGame || {}), ...(raw?.fullRuns?.byGame || {}) } };
  merged.dailyProgress = { ...base.dailyProgress, ...(raw?.dailyProgress || {}) };
  merged.questsState = { ...base.questsState, ...(raw?.questsState || {}), weekly: { ...base.questsState.weekly, ...(raw?.questsState?.weekly || {}) } };
  merged.progressByGame = { ...(raw?.progressByGame || {}) };
  return merged;
}
function loadProfile() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    profile = hydrateProfile(parsed);
  } catch (_) {
    profile = freshProfile();
  }
  normalizeDateProgress();
}
function saveProfile() { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); }
function normalizeDateProgress() {
  const today = todayISO();
  if (profile.dailyProgress.date !== today) {
    profile.dailyProgress = { date: today, plays: 0, wins: 0, fullRuns: 0 };
    profile.questsState.dailyClaimed = false;
  }
  const week = getWeekId();
  if (profile.questsState.weekly.week !== week) profile.questsState.weekly = { week, wins: 0, claimed: false };
}
function addBadge(label) {
  if (!profile.badges.includes(label)) profile.badges.push(label);
}
function unlockAchievement(key, title) {
  if (profile.achievements[key]) return;
  profile.achievements[key] = { title, unlockedAt: new Date().toISOString() };
  addBadge(title);
  addLog(`🏅 Achievement deblocat: ${title}`);
}
function renderMetaPanels() {
  const inv = document.getElementById('inventory-panel');
  const badges = document.getElementById('badges-panel');
  const ach = document.getElementById('achievements-panel');
  inv.innerHTML = Object.entries(profile.inventory).map(([k, v]) => `<div class="meta-grid-item"><span>${k}</span><strong>${v}</strong></div>`).join('');
  badges.innerHTML = profile.badges.length ? profile.badges.map(b => `<span class="meta-chip">${b}</span>`).join('') : 'Niciun badge încă.';
  const achList = Object.values(profile.achievements);
  ach.innerHTML = achList.length ? achList.map(a => `<span class="meta-chip">${a.title}</span>`).join('') : 'Fără progres momentan.';
}
function modeLockInfo(cell, mode) {
  const gp = ensureGameProgress(cell.game);
  if (mode === 'solo') return { locked: false, reason: '' };
  if (mode === 'ai') {
    if (profile.totals.wins < 3) return { locked: true, reason: 'Necesită 3 victorii globale.' };
    if (gp.soloWins < 1) return { locked: true, reason: 'Câștigă 1 run Solo pe acest joc.' };
    return { locked: false, reason: '' };
  }
  if (mode === 'quiz') {
    if (profile.totals.wins < 6) return { locked: true, reason: 'Necesită 6 victorii globale.' };
    if (gp.aiWins < 1) return { locked: true, reason: 'Câștigă 1 run AI pe acest joc.' };
    return { locked: false, reason: '' };
  }
  if (mode === 'full') {
    if (profile.totals.wins < 10) return { locked: true, reason: 'Necesită 10 victorii globale.' };
    if (gp.quizWins < 1) return { locked: true, reason: 'Câștigă 1 run Quiz pe acest joc.' };
    if (!FULL_GAME_LINKS[cell.game]) return { locked: true, reason: 'Lipsă link Full Game pentru acest tile.' };
    return { locked: false, reason: '' };
  }
  return { locked: false, reason: '' };
}

function getGridPos(id) {
  if (id <= 6) return { r: 0, c: id };
  if (id <= 11) return { r: id - 6, c: 6 };
  if (id <= 18) return { r: 6, c: 6 - (id - 12) };
  return { r: 6 - (id - 18), c: 0 };
}
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function schedule(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id; }
function clearScheduled() { timers.forEach(clearTimeout); timers = []; }
function clearMiniGameRunState() { clearInterval(mgState.interval); clearScheduled(); resetMiniHandlers(); }
function toggleFusionPortal() {
  const wrap = document.getElementById('fusion-frame-wrap');
  const frame = document.getElementById('fusion-frame');
  const btn = document.getElementById('fusion-toggle-btn');
  const opening = wrap.classList.contains('hidden');
  wrap.classList.toggle('hidden', !opening);
  if (opening) {
    frame.src = FUSION_PORTAL_URL;
    btn.textContent = '🔒 Închide Portal';
    addLog('🕹️ Portalul Arcade Collection a fost activat.');
  } else {
    frame.src = 'about:blank';
    btn.textContent = '🕹️ Activează Portal';
    addLog('🔒 Portalul Arcade Collection a fost închis.');
  }
}
function openLegacyWorld() {
  window.open(LEGACY_WORLD_URL, '_blank', 'noopener,noreferrer');
  addLog('🌍 Ai deschis versiunea clasică ARCADE WORLD.');
}
function resetMiniHandlers() {
  [
    'doShoot','memClick','tttClick','mazeMove','bombAnswer','bbPress','pvaiChoice',
    'pickBonusStar','answerBonusSeq','startTap','cutTrapWire','escapeTrap','selectBombPath',
    'breakoutOrderClick','breakoutColorAnswer','breakoutReact','hockeyTimingStop','hockeyComboHit',
    'fusionTilePick','selectMode','selectDiff','pickBombVsAI','pickHockeyVsAI','pickBreakoutVsAI',
    'pickFusionVsAI','pickPvAIVsAI','quizAnswer'
  ].forEach(key => { window[key] = undefined; });
}

function freshState() {
  return {
    positions: [0, 0],
    scores: [0, 0],
    turn: 0,
    diceVal: null,
    phase: 'roll',
    visited: [new Set([0]), new Set([0])],
    moveTarget: null,
    lastCellLabel: '—'
  };
}

function buildBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  const grid = Array(7).fill(null).map(() => Array(7).fill(null));
  CELLS.forEach(cell => {
    const { r, c } = getGridPos(cell.id);
    grid[r][c] = cell;
  });

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const div = document.createElement('div');
      const cell = grid[r][c];
      if (cell) {
        div.className = `cell type-${cell.type}`;
        div.id = `cell-${cell.id}`;
        div.innerHTML = `<span class="cell-num">${cell.id}</span><span class="cell-icon">${cell.icon}</span><span class="cell-name">${cell.name}</span>`;
        div.onclick = () => handleCellClick(cell.id);
      } else if (r >= 1 && r <= 5 && c >= 1 && c <= 5) {
        div.className = 'cell empty-center';
        if (r === 3 && c === 3) div.innerHTML = `<div class="center-logo">ARCADE<br>WORLD</div>`;
      } else {
        div.className = 'cell empty-center';
      }
      board.appendChild(div);
    }
  }
  renderBoard();
}

function phaseText(phase) {
  return { roll:'Așteaptă zarul', move:'Mutare în curs', minigame:'Mini-joc activ', end:'Joc terminat' }[phase] || phase;
}

function renderBoard() {
  CELLS.forEach(cell => {
    const el = document.getElementById(`cell-${cell.id}`);
    if (!el) return;
    el.classList.remove('pawn-p1','pawn-p2','pawn-both','reachable','visited-p1','visited-p2','disabled');
    const p1here = state.positions[0] === cell.id;
    const p2here = state.positions[1] === cell.id;
    if (p1here && p2here) el.classList.add('pawn-both');
    else if (p1here) el.classList.add('pawn-p1');
    else if (p2here) el.classList.add('pawn-p2');
    if (state.visited[0].has(cell.id)) el.classList.add('visited-p1');
    if (state.visited[1].has(cell.id)) el.classList.add('visited-p2');
    if (state.moveTarget === cell.id && state.phase === 'move') el.classList.add('reachable');
    if (state.phase === 'minigame' || state.phase === 'end') el.classList.add('disabled');
  });
  document.getElementById('sc1').textContent = state.scores[0];
  document.getElementById('sc2').textContent = state.scores[1];
  document.getElementById('pos1').textContent = `Câmp ${state.positions[0]}`;
  document.getElementById('pos2').textContent = `Câmp ${state.positions[1]}`;
  document.getElementById('pc1').classList.toggle('active', state.turn === 0);
  document.getElementById('pc2').classList.toggle('active', state.turn === 1);
  document.getElementById('turn-badge').textContent = `🎲 Tura: ${['JUCĂTOR 1','JUCĂTOR 2'][state.turn]}`;
  document.getElementById('roll-btn').disabled = state.phase !== 'roll';
  document.getElementById('phase-label').textContent = phaseText(state.phase);
  document.getElementById('last-cell').textContent = state.lastCellLabel;
  document.getElementById('pb1').style.width = `${clamp((state.scores[0] / WIN_SCORE) * 100, 0, 100)}%`;
  document.getElementById('pb2').style.width = `${clamp((state.scores[1] / WIN_SCORE) * 100, 0, 100)}%`;
}

function addLog(msg) {
  logEntries.unshift(msg);
  const box = document.getElementById('log-box');
  box.innerHTML = logEntries.slice(0, 28).map((entry, i) => `<div class="log-entry ${i === 0 ? 'new' : ''}">${entry}</div>`).join('');
}

function rollDice() {
  if (state.phase !== 'roll') return;
  const val = Math.floor(Math.random() * 6) + 1;
  const el = document.getElementById('dice-val');
  el.classList.add('dice-rolling');
  schedule(() => el.classList.remove('dice-rolling'), 400);
  el.textContent = val;
  state.diceVal = val;
  state.phase = 'move';
  state.moveTarget = (state.positions[state.turn] + val) % TOTAL;
  const targetCell = CELLS[state.moveTarget];
  addLog(`🎲 ${['J1','J2'][state.turn]} aruncă ${val} → câmp ${state.moveTarget} (${targetCell.icon} ${targetCell.name})`);
  renderBoard();
  schedule(() => movePawn(state.moveTarget), 520);
}

function handleCellClick(id) {
  if (state.phase === 'move' && state.moveTarget === id) {
    clearScheduled();
    movePawn(id);
  }
}

function movePawn(target) {
  if (state.phase !== 'move') return;
  const current = state.positions[state.turn];
  const passedStart = target < current;
  state.positions[state.turn] = target;
  state.visited[state.turn].add(target);
  state.moveTarget = null;
  state.phase = 'minigame';
  state.lastCellLabel = `${CELLS[target].icon} ${CELLS[target].name}`;
  if (passedStart && target !== 0) {
    state.scores[state.turn] += PASS_START_BONUS;
    addLog(`🏁 ${['J1','J2'][state.turn]} a trecut peste START: +${PASS_START_BONUS} punct`);
  }
  renderBoard();
  openMiniGame(CELLS[target]);
}

function getWinReward(cell) {
  if (typeof mgState.reward === 'number') return mgState.reward;
  let reward = cell.pts;
  if (mgState.mode === 'quiz') reward += 1;
  if (mgState.mode === 'ai' && mgState.difficulty) reward += DIFF_REWARD[mgState.difficulty] || 0;
  return reward;
}

function finishMiniGame(ok, text, closeDelay = 900, rewardOverride = null) {
  if (rewardOverride !== null) mgState.reward = rewardOverride;
  showFeedback(ok, text, closeDelay);
}

function grantInventoryRewards({ won, mode, reward }) {
  profile.inventory.coins += won ? Math.max(1, reward) : 1;
  profile.inventory.shards += won ? 1 : 0;
  if (mode === 'full' && won) profile.inventory.keys += 1;
  if (mode === 'quiz' && won) profile.inventory.tickets += 1;
}
function registerQuestProgress({ won, mode }) {
  normalizeDateProgress();
  profile.dailyProgress.plays += 1;
  if (won) profile.dailyProgress.wins += 1;
  if (mode === 'full') profile.dailyProgress.fullRuns += 1;
  profile.questsState.weekly.wins += won ? 1 : 0;

  if (!profile.questsState.dailyClaimed &&
      profile.dailyProgress.plays >= DAILY_TARGET.plays &&
      profile.dailyProgress.wins >= DAILY_TARGET.wins &&
      profile.dailyProgress.fullRuns >= DAILY_TARGET.fullRuns) {
    profile.questsState.dailyClaimed = true;
    profile.inventory.coins += 8;
    profile.inventory.shards += 3;
    addLog('📦 Daily quest completat! +8 coins, +3 shards');
  }
  if (!profile.questsState.weekly.claimed && profile.questsState.weekly.wins >= WEEKLY_TARGET_WINS) {
    profile.questsState.weekly.claimed = true;
    profile.inventory.keys += 2;
    addLog('🗝️ Weekly quest completat! +2 keys');
  }
}
function evaluateAchievements() {
  if (profile.totals.wins >= 1) unlockAchievement('first_win', 'First Win');
  if (profile.totals.wins >= 10) unlockAchievement('strategist', 'Board Strategist');
  if (Object.keys(profile.progressByGame).length >= 10) unlockAchievement('explorer', 'Game Explorer');
  if (profile.fullRuns.totalWins >= 5) unlockAchievement('full_runner', 'Full Runner');
  if (profile.totals.quizWins >= 5) unlockAchievement('quiz_master', 'Quiz Master');
  if (profile.dailyProgress.plays >= 8) unlockAchievement('daily_grinder', 'Daily Grinder');
}
function updateMetaProgress(cell, won) {
  const gp = ensureGameProgress(cell.game);
  gp.plays += 1;
  if (won) {
    gp.wins += 1;
    if (mgState.mode === 'solo') gp.soloWins += 1;
    if (mgState.mode === 'ai') gp.aiWins += 1;
    if (mgState.mode === 'quiz') { gp.quizWins += 1; profile.totals.quizWins += 1; }
    if (mgState.mode === 'full') {
      gp.fullWins += 1;
      profile.fullRuns.totalWins += 1;
      profile.fullRuns.byGame[cell.game] = (profile.fullRuns.byGame[cell.game] || 0) + 1;
    }
  }
  if (mgState.mode === 'full') {
    gp.fullRuns += 1;
    profile.totals.fullRuns += 1;
  }
  profile.totals.plays += 1;
  if (won) profile.totals.wins += 1;
  registerQuestProgress({ won, mode: mgState.mode || 'solo' });
  grantInventoryRewards({ won, mode: mgState.mode || 'solo', reward: getWinReward(cell) });
  evaluateAchievements();
  saveProfile();
  renderMetaPanels();
}

function closeMG(won) {
  if (!mgState.cell || mgState.done) return;
  mgState.done = true;
  clearMiniGameRunState();
  document.getElementById('overlay').classList.add('hidden');
  const cell = mgState.cell;
  const p = state.turn;

  if (cell.game === 'trap') {
    if (won) {
      if ((mgState.feedbackText || '').includes('Nu pierzi') || (mgState.feedbackText || '').includes('0 puncte')) {
        addLog(`🛡️ ${['J1','J2'][p]} evită capcana de pe ${cell.name}`);
      } else {
        const before = state.scores[p];
        state.scores[p] = Math.max(0, state.scores[p] + cell.pts);
        addLog(`💀 ${['J1','J2'][p]} cade în capcană ${before}→${state.scores[p]}`);
      }
    } else {
      const before = state.scores[p];
      state.scores[p] = Math.max(0, state.scores[p] + cell.pts);
      addLog(`💀 ${['J1','J2'][p]} pierde provocarea-capcană ${before}→${state.scores[p]}`);
    }
  } else if (cell.game === 'start') {
    if (won) {
      state.scores[p] += 2;
      addLog(`🏁 ${['J1','J2'][p]} activează START și primește +2 puncte`);
    } else {
      addLog(`❌ ${['J1','J2'][p]} ratează provocarea START`);
    }
  } else if (won) {
    const reward = getWinReward(cell);
    state.scores[p] += reward;
    addLog(`✅ ${['J1','J2'][p]} câștigă mini-jocul +${reward}pts (${MODE_LABELS[mgState.mode] || 'Standard'}) → ${state.scores[p]} total`);
  } else {
    addLog(`❌ ${['J1','J2'][p]} pierde mini-jocul pe ${cell.name}`);
  }

  updateMetaProgress(cell, won);
  renderBoard();
  if (!checkWin()) endTurn();
}

function endTurn() {
  state.turn = state.turn === 0 ? 1 : 0;
  state.phase = 'roll';
  renderBoard();
  addLog(`─── Tura ${['🔵 J1','🔴 J2'][state.turn]} ───`);
}

function checkWin() {
  for (let p = 0; p < 2; p++) {
    if (state.scores[p] >= WIN_SCORE) {
      state.phase = 'end';
      document.getElementById('win-screen').classList.remove('hidden');
      document.getElementById('win-title').textContent = `${['JUCĂTOR 1','JUCĂTOR 2'][p]} CÂȘTIGĂ!`;
      document.getElementById('win-sub').textContent = `A atins ${WIN_SCORE} puncte în Arcade World!`;
      document.getElementById('ws1').textContent = state.scores[0];
      document.getElementById('ws2').textContent = state.scores[1];
      addLog(`🏆 ${['J1','J2'][p]} a câștigat cu ${state.scores[p]} puncte!`);
      renderBoard();
      return true;
    }
  }
  return false;
}

function restartGame() {
  clearMiniGameRunState();
  state = freshState();
  mgState = {};
  logEntries = [];
  document.getElementById('win-screen').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('full-overlay').classList.add('hidden');
  document.getElementById('dice-val').textContent = '—';
  renderBoard();
  renderMetaPanels();
  addLog('🎮 Joc nou pornit! Tura: JUCĂTOR 1');
}

function setMG(desc, challengeTitle, challengeHTML, buttonsHTML) {
  document.getElementById('mg-desc').textContent = desc;
  document.getElementById('mg-challenge').innerHTML = `<div class="mg-challenge-title">${challengeTitle}</div>${challengeHTML}`;
  document.getElementById('mg-buttons').innerHTML = buttonsHTML;
}
function showFeedback(ok, text, closeDelay = 900) {
  mgState.feedbackText = text;
  document.getElementById('mg-feedback').innerHTML = `<div class="${ok ? 'result-good' : 'result-bad'}">${text}</div>`;
  schedule(() => closeMG(ok), closeDelay);
}
function setStageFeedback(text) {
  document.getElementById('mg-feedback').innerHTML = `<div class="result-good">${text}</div>`;
}

function launchFollowupQuiz({ stageText, quizTitle, question, answers, correctIndex, successText }) {
  setStageFeedback(stageText);
  schedule(() => {
    document.getElementById('mg-feedback').innerHTML = '';
    window.quizAnswer = function(i) {
      if (i === correctIndex) finishMiniGame(true, successText || `✅ Corect! +${getWinReward(mgState.cell)} pts!`);
      else finishMiniGame(false, '❌ Răspuns greșit.');
    };
    document.getElementById('mg-challenge').innerHTML = `
      <div class="mg-challenge-title">${quizTitle}</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;color:var(--white)">${question}</div>
      <div class="option-grid">${answers.map((a, i) => `<button class="answer-btn" onclick="quizAnswer(${i})">${a}</button>`).join('')}</div>
      <div class="tiny-note">Ai trecut de partea de skill. Acum răspunde corect pentru puncte.</div>`;
  }, 650);
}

function showModeSelector(onSelect) {
  const cell = mgState.cell;
  const modes = ['solo', 'ai', 'quiz', 'full'].map(mode => ({ mode, ...modeLockInfo(cell, mode) }));
  document.getElementById('mg-feedback').innerHTML = '';
  document.getElementById('mg-challenge').innerHTML = `
    <div class="mg-challenge-title">Alege modul</div>
    <div style="display:grid;gap:10px">
      ${modes.map(({ mode, locked, reason }) => `
        <div class="mode-btn-wrap">
          <button class="answer-btn" ${locked ? 'disabled' : ''} onclick="${locked ? '' : `selectMode('${mode}')`}">${mode === 'solo' ? '🎮' : mode === 'ai' ? '🤖' : mode === 'quiz' ? '🧠' : '🕹️'} ${MODE_LABELS[mode]}</button>
          ${locked ? `<div class="lock-reason">🔒 ${reason}</div>` : '<div class="lock-reason">Deblocat</div>'}
        </div>`).join('')}
    </div>
    <div class="tiny-note">Regulă lock coerentă: Solo deschis; AI/Quiz/Full progresive per joc + global.</div>`;
  window.selectMode = function(mode) {
    mgState.mode = mode;
    onSelect(mode);
  };
}
function showDifficultySelector(onSelect) {
  document.getElementById('mg-feedback').innerHTML = '';
  document.getElementById('mg-challenge').innerHTML = `
    <div class="mg-challenge-title">Alege dificultatea AI</div>
    <div style="display:grid;gap:10px">
      <button class="answer-btn" onclick="selectDiff('easy')">🟢 Easy</button>
      <button class="answer-btn" onclick="selectDiff('medium')">🟡 Medium</button>
      <button class="answer-btn" onclick="selectDiff('hard')">🔴 Hard</button>
    </div>`;
  window.selectDiff = function(diff) {
    mgState.difficulty = diff;
    onSelect(diff);
  };
}
function setupSelectorGame(cell, handlers) {
  showModeSelector((mode) => {
    if (mode === 'solo') handlers.solo(cell);
    else if (mode === 'quiz') handlers.quiz(cell);
    else if (mode === 'full') startFullGame(cell);
    else showDifficultySelector((diff) => handlers.ai(cell, diff));
  });
}

function openMiniGame(cell) {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('mg-icon').textContent = cell.icon;
  document.getElementById('mg-title').textContent = cell.name.toUpperCase();
  document.getElementById('mg-origin').textContent = `INSPIRAT DIN: ${cell.desc.toUpperCase()}`;
  document.getElementById('mg-feedback').innerHTML = '';
  clearMiniGameRunState();
  mgState = { cell, player: ['JUCĂTOR 1','JUCĂTOR 2'][state.turn], interval: null, done: false, feedbackText: '', mode: 'solo', difficulty: null, reward: null };
  const key = `${cell.game}:${cell.variant || 'default'}`;
  const handler = MINI_GAMES[key] || GAME_FALLBACKS[cell.game] || setupGeneric;
  handler(cell);
}

function startFullGame(cell) {
  const link = FULL_GAME_LINKS[cell.game];
  if (!link) return finishMiniGame(false, '❌ Nu există link Full Game pentru acest tile.');
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('full-overlay').classList.remove('hidden');
  document.getElementById('full-title').textContent = `${cell.icon} ${cell.name.toUpperCase()} — FULL GAME`;
  document.getElementById('full-subtitle').textContent = 'Finalul poate veni din postMessage sau manual din butoanele de jos.';
  document.getElementById('full-frame').src = link;
}

function closeFullGame(won) {
  if (!mgState.cell || mgState.done) return;
  document.getElementById('full-overlay').classList.add('hidden');
  document.getElementById('full-frame').src = 'about:blank';
  mgState.mode = 'full';
  const bonus = won ? 2 + Math.floor((profile.fullRuns.totalWins || 0) / 5) : 0;
  if (won) {
    mgState.reward = Math.max(1, mgState.cell.pts + bonus);
    closeMG(true);
  } else {
    closeMG(false);
  }
}

const MINI_GAMES = {
  'start:boost': setupStart,
  'bonus:stars': setupBonusStars,
  'bonus:sequence': setupBonusSequence,
  'bonus:lucky-pick': setupBonusLuckyPick,
  'trap:wire': setupTrapWire,
  'trap:reaction': setupTrapReaction,
  'shoot:classic': setupShootClassic,
  'shoot:fast': setupShootFast,
  'maze:classic': setupMaze,
  'memory:medium': cell => setupMemory(cell, false),
  'memory:hard': cell => setupMemory(cell, true),
  'ttt:classic': setupTTT,
  'shooter:classic': cell => setupShooter(cell, false),
  'shooter:hard': cell => setupShooter(cell, true),
  'bounce:classic': setupBounce,
  'bomb:selector': setupBomb,
  'hockey:selector': setupHockey,
  'breakout:selector': setupBreakout,
  'fusion:selector': setupFusion,
  'pvai:selector': setupPvAI
};
const GAME_FALLBACKS = { bomb: setupBomb, hockey: setupHockey, breakout: setupBreakout, fusion: setupFusion, pvai: setupPvAI };

// Base / classic games
function setupStart(cell) {
  let taps = 0;
  window.startTap = function() {
    taps++;
    document.getElementById('start-count').textContent = taps;
    if (taps >= 2) finishMiniGame(true, '🏁 Start boost activat! +2 puncte!', 900, 2);
  };
  setMG(`${mgState.player}, apasă de 2 ori butonul.`, '🏁 START', `<div style="font-size:14px;margin-bottom:10px">Apăsări: <span id="start-count">0</span>/2</div><button class="secondary-btn" onclick="startTap()">START BOOST</button>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupBonusStars(cell) {
  const winning = Math.floor(Math.random() * 3);
  window.pickBonusStar = i => i === winning ? finishMiniGame(true, `⭐ Bonus obținut! +${cell.pts} puncte!`) : finishMiniGame(false, '❌ Stea goală!');
  setMG(`${mgState.player}, una dintre stele ascunde bonusul.`, '⭐ BONUS', `<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">${[0,1,2].map(i => `<button class="secondary-btn" onclick="pickBonusStar(${i})" style="font-size:28px;padding:12px 18px">⭐</button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupBonusSequence(cell) {
  const sequences = ['⭐💎⚡', '⚡⭐💎', '💎⭐⚡'];
  const shown = sequences[Math.floor(Math.random() * sequences.length)];
  const options = shuffle([shown, ...sequences.filter(s => s !== shown)]).slice(0, 3);
  window.answerBonusSeq = i => options[i] === shown ? finishMiniGame(true, `⭐ Memorie bună! +${cell.pts} puncte!`) : finishMiniGame(false, '❌ Ordinea a fost greșită.');
  setMG(`${mgState.player}, ține minte ordinea și alege răspunsul corect.`, '⭐ BONUS — Memorează secvența', `<div style="font-size:26px;margin-bottom:12px">${shown}</div><div style="display:grid;gap:8px">${options.map((opt, i) => `<button class="answer-btn" onclick="answerBonusSeq(${i})">${opt}</button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupBonusLuckyPick(cell) {
  const good = Math.floor(Math.random() * 4);
  window.pickBonusStar = i => i === good ? finishMiniGame(true, `💎 Jackpot! +${cell.pts} puncte!`) : finishMiniGame(false, '❌ N-ai nimerit premiul mare.');
  setMG(`${mgState.player}, doar una dintre capsule oferă bonusul.`, '⭐ BONUS — Lucky Pick', `<div class="four-grid">${[0,1,2,3].map(i => `<button class="answer-btn" onclick="pickBonusStar(${i})">🎁 Capsule ${i + 1}</button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupTrapWire(cell) {
  const safe = Math.floor(Math.random() * 3);
  const colors = ['Roșu', 'Albastru', 'Verde'];
  window.cutTrapWire = i => i === safe ? finishMiniGame(true, '🛡️ Ai dezamorsat capcana! Nu pierzi puncte.', 900, 0) : finishMiniGame(true, `💀 Capcana se activează! ${cell.pts} puncte.`, 900, 0);
  setMG(`${mgState.player}, doar un fir dezactivează capcana.`, '💀 CAPCANĂ', `<div class="wire-grid">${colors.map((c, i) => `<button class="answer-btn" onclick="cutTrapWire(${i})">Taie firul ${c}</button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(true)">Acceptă efectul</button>`);
}
function setupTrapReaction(cell) {
  let pressed = false;
  schedule(() => { if (!pressed) finishMiniGame(true, `💀 Prea lent! ${cell.pts} puncte.`, 900, 0); }, 1100);
  window.escapeTrap = function() { if (pressed) return; pressed = true; finishMiniGame(true, '🛡️ Ai evitat capcana! 0 puncte pierdute.', 900, 0); };
  setMG(`${mgState.player}, apasă butonul înainte să expire timpul.`, '💀 CAPCANĂ — Reacție', `<button class="secondary-btn" onclick="escapeTrap()">SCAPĂ!</button>`, `<button class="btn-skip" onclick="closeMG(true)">Acceptă efectul</button>`);
}
function createShotMeter(cell, config) {
  setMG(config.desc, config.title, `<div class="shoot-bar-wrap" onclick="doShoot()"><div class="shoot-bar"></div><div class="shoot-cursor" id="shoot-cursor"></div></div><div class="tiny-note">Apasă când cursorul e în zona bună.</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  let pos = 0, dir = 1;
  mgState.shootPos = 0;
  mgState.interval = setInterval(() => {
    pos += dir * config.speed;
    if (pos >= 100) { pos = 100; dir = -1; }
    if (pos <= 0) { pos = 0; dir = 1; }
    mgState.shootPos = pos;
    const cursor = document.getElementById('shoot-cursor');
    if (cursor) cursor.style.left = pos + '%';
  }, 16);
  window.doShoot = function() {
    clearInterval(mgState.interval);
    const p = mgState.shootPos;
    if (p >= config.perfectMin && p <= config.perfectMax) finishMiniGame(true, `🏀 PERFECT SHOT! +${getWinReward(cell)} puncte!`);
    else if (p >= config.goodMin && p <= config.goodMax) finishMiniGame(true, '✅ Coș bun!');
    else finishMiniGame(false, '❌ Ratat!');
  };
}
function setupShootClassic(cell) { createShotMeter(cell, { title:'🏀 BASKET', desc:`${mgState.player}, oprește cursorul în zona verde.`, speed:2.5, goodMin:24, goodMax:76, perfectMin:40, perfectMax:60 }); }
function setupShootFast(cell) { createShotMeter(cell, { title:'🏀 BASKET PRO', desc:`${mgState.player}, zona e mai mică și bara mai rapidă.`, speed:3.8, goodMin:35, goodMax:65, perfectMin:45, perfectMax:55 }); }
function setupMemory(cell, hard = false) {
  const pairs = hard ? 8 : 6;
  const syms = MEM_SYMBOLS.slice(0, pairs);
  const cards = shuffle([...syms, ...syms]);
  let flipped = [], matched = [], locked = false, moves = 0;
  const maxMoves = hard ? 16 : 12;
  function render() {
    const grid = document.getElementById('mem-grid');
    if (!grid) return;
    grid.innerHTML = cards.map((symbol, i) => {
      const isFlipped = flipped.includes(i) || matched.includes(i);
      const isMatch = matched.includes(i);
      return `<div class="mem-card ${isFlipped ? '' : 'hidden-card'} ${isMatch ? 'matched' : ''}" onclick="memClick(${i})">${isFlipped ? symbol : '❓'}</div>`;
    }).join('');
    document.getElementById('mem-status').textContent = `${moves}/${maxMoves} mutări`;
  }
  window.memClick = function(i) {
    if (locked || flipped.includes(i) || matched.includes(i)) return;
    flipped.push(i); render();
    if (flipped.length === 2) {
      moves++; locked = true;
      if (cards[flipped[0]] === cards[flipped[1]]) {
        matched.push(...flipped); flipped = []; locked = false; render();
        if (matched.length === cards.length) finishMiniGame(true, `🃏 Toate perechile găsite! +${getWinReward(cell)} pts!`);
      } else {
        schedule(() => { flipped = []; locked = false; render(); if (moves >= maxMoves) finishMiniGame(false, '❌ Mutări epuizate!'); }, 650);
      }
    }
  };
  setMG(`${mgState.player}, găsește toate perechile înainte să rămâi fără mutări.`, hard ? '🃏 MEMORY HARD' : '🃏 MEMORY', `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Status: <span id="mem-status">0/${maxMoves} mutări</span></div><div id="mem-grid" class="mem-grid" style="grid-template-columns:repeat(${hard ? 4 : 3},1fr)"></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  render();
}
function setupTTT(cell) {
  const board = Array(9).fill('');
  const playerSym = '✖️', aiSym = '⭕';
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let done = false;
  const checkWin = s => wins.some(line => line.every(i => board[i] === s));
  const render = () => document.getElementById('ttt-g').innerHTML = board.map((v,i)=>`<div class="ttt-cell" onclick="tttClick(${i})">${v}</div>`).join('');
  function aiMove() {
    for (let i=0;i<9;i++) if (!board[i]) { board[i]=aiSym; if (checkWin(aiSym)) return render(); board[i]=''; }
    for (let i=0;i<9;i++) if (!board[i]) { board[i]=playerSym; if (checkWin(playerSym)) { board[i]=aiSym; return render(); } board[i]=''; }
    if (!board[4]) { board[4]=aiSym; return render(); }
    const empty = board.map((v,i)=>!v?i:-1).filter(i=>i>=0); if (empty.length) board[empty[Math.floor(Math.random()*empty.length)]]=aiSym; render();
  }
  window.tttClick = function(i) {
    if (done || board[i]) return;
    board[i]=playerSym; render();
    if (checkWin(playerSym)) { done=true; return finishMiniGame(true, `✖️ Ai câștigat TTT! +${cell.pts} pts!`); }
    if (board.every(Boolean)) { done=true; return finishMiniGame(false, '🤝 Remiză!'); }
    schedule(() => { aiMove(); if (checkWin(aiSym)) { done=true; finishMiniGame(false, '❌ AI a câștigat!'); } else if (board.every(Boolean)) { done=true; finishMiniGame(false, '🤝 Remiză!'); } }, 320);
  };
  setMG(`${mgState.player}, joacă Tic Tac Toe împotriva AI.`, '✖️ TIC TAC TOE', `<div id="ttt-g" class="ttt-grid"></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  render();
}
function setupMaze(cell) {
  const mazes = [ ['#####','#P  E','# ## ','#    ','#####'], ['#####','#P # ','#  # ','## #E','#####'], ['######','#P   #','### ##','#    E','######'] ];
  const grid = mazes[Math.floor(Math.random() * mazes.length)].map(row => row.split(''));
  let px = 0, py = 0;
  for (let r=0;r<grid.length;r++) for (let c=0;c<grid[r].length;c++) if (grid[r][c] === 'P') { px = c; py = r; }
  const renderMaze = () => grid.map(row => row.join(' ')).join('\n');
  const draw = () => document.getElementById('maze-d').textContent = renderMaze();
  window.mazeMove = function(dx, dy) {
    const nx = px + dx, ny = py + dy;
    if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[ny].length) return;
    const tile = grid[ny][nx];
    if (tile === '#') return;
    if (tile === 'E') return finishMiniGame(true, `🗺️ Exit găsit! +${cell.pts} pts!`, 800);
    grid[py][px] = ' '; px = nx; py = ny; grid[py][px] = 'P'; draw();
  };
  setMG(`${mgState.player}, ajunge la E.`, '🗺️ MAZE', `<div class="maze-display" id="maze-d"></div><div class="maze-controls"><button class="maze-btn" onclick="mazeMove(0,-1)">⬆</button><button class="maze-btn" onclick="mazeMove(-1,0)">⬅</button><button class="maze-btn" onclick="mazeMove(1,0)">➡</button><button class="maze-btn" onclick="mazeMove(0,1)">⬇</button></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  draw();
}
function setupShooter(cell, hard = false) {
  let score = 0, spawned = 0, done = false;
  const total = hard ? 10 : 8, needed = hard ? 7 : 5;
  setMG(`${mgState.player}, distruge cel puțin ${needed} din ${total} inamici.`, hard ? '🚀 VOID HUNTER HARD' : '🚀 VOID HUNTER', `<div id="shooter-area" style="position:relative;background:#000;border-radius:10px;height:120px;overflow:hidden;margin-bottom:8px"></div><div style="font-size:12px;color:var(--dim)">Distruși: <span id="s-score">0</span>/${needed}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  const finish = success => { if (done) return; done = true; clearInterval(mgState.interval); success ? finishMiniGame(true, `🚀 ${score} inamici distruși! +${cell.pts} pts!`) : finishMiniGame(false, `❌ Prea puțini distruși (${score}/${needed})!`); };
  function spawnEnemy() {
    if (spawned >= total || done) return;
    spawned++;
    const area = document.getElementById('shooter-area'); if (!area) return;
    const e = document.createElement('div');
    const icons = ['👾','🛸','☄️','💀','🤖'];
    e.textContent = icons[Math.floor(Math.random() * icons.length)];
    e.style.cssText = `position:absolute;font-size:24px;cursor:pointer;transition:left ${hard ? 1.3 : 2}s linear;top:${Math.random()*75}px;left:90%`;
    e.onclick = () => { if (done) return; e.remove(); score++; document.getElementById('s-score').textContent = score; if (score >= needed) finish(true); };
    area.appendChild(e);
    schedule(() => { e.style.left = '-10%'; }, 40);
    schedule(() => { if (e.parentNode) e.remove(); if (spawned >= total && !done && score < needed) finish(false); }, hard ? 1400 : 2100);
  }
  mgState.interval = setInterval(spawnEnemy, hard ? 420 : 600);
  schedule(spawnEnemy, 80);
}
function setupBounce(cell) {
  let started = true;
  const duration = 1500 + Math.random() * 500;
  const dropTime = Date.now();
  window.bbPress = function() {
    if (!started) return;
    started = false;
    const pct = (Date.now() - dropTime) / duration;
    if (pct >= 0.8 && pct <= 1.03) finishMiniGame(true, `🔵 Timing perfect! +${cell.pts} pts!`);
    else if (pct >= 0.65) finishMiniGame(true, '✅ Destul de bun!');
    else finishMiniGame(false, '❌ Prea devreme!');
  };
  setMG(`${mgState.player}, apasă exact când mingea atinge fundul.`, '🔵 BOUNCE BALL', `<div style="position:relative;background:#000;border-radius:10px;height:100px;overflow:hidden;margin-bottom:8px"><div id="bb-ball" style="position:absolute;font-size:24px;left:50%;transform:translateX(-50%);top:0">🔵</div></div><button class="secondary-btn" onclick="bbPress()">BOUNCE!</button>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  function animBall() {
    if (!started) return;
    const elapsed = Date.now() - dropTime;
    const pct = Math.min(elapsed / duration, 1);
    const y = pct * 76;
    const ball = document.getElementById('bb-ball'); if (ball) ball.style.top = y + 'px';
    if (pct < 1) requestAnimationFrame(animBall); else if (started) finishMiniGame(false, '❌ Ai ratat momentul!');
  }
  requestAnimationFrame(animBall);
}

// Selector games + per-game AI behavior and balance
function setupBomb(cell) { setupSelectorGame(cell, { solo: setupBombSolo, quiz: setupBombQuiz, ai: setupBombVsAI }); }
function setupBombSolo(cell) {
  const safe = Math.floor(Math.random() * 3);
  window.selectBombPath = i => i === safe ? finishMiniGame(true, `💣 Ladă sigură! +${cell.pts} pts!`) : finishMiniGame(false, '❌ Ai deschis lada explozivă.');
  setMG(`${mgState.player}, alege lada sigură.`, '💣 BOMBERMAN — SOLO', `<div class="dir-grid">${['Stânga','Centru','Dreapta'].map((t,i)=>`<button class="answer-btn" onclick="selectBombPath(${i})">${t}</button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupBombQuiz(cell) {
  const q = shuffle([
    { q:'Câte bombe poți plasa simultan la start în Bomberman?', a:['1','2','3','5'], correct:0 },
    { q:'Ce face puterea Flame?', a:['Mărește viteza','Mărește raza exploziei','Adaugă scut','Îngheață inamici'], correct:1 },
    { q:'Cum se numesc inamicii clasici din Bomberman?', a:['Balloms','Dragons','Knights','Spiders'], correct:0 }
  ])[0];
  const safe = Math.floor(Math.random() * 3);
  window.selectBombPath = i => {
    if (i !== safe) return finishMiniGame(false, '❌ Ai deschis lada explozivă.');
    launchFollowupQuiz({ stageText:'💣 Ai supraviețuit! Urmează întrebarea.', quizTitle:'💣 BOMBERMAN — QUIZ', question:q.q, answers:q.a, correctIndex:q.correct, successText:`💣 Corect! +${getWinReward(cell)} pts!` });
  };
  setMG(`${mgState.player}, supraviețuiește, apoi răspunde la întrebare.`, '💣 BOMBERMAN — SKILL + QUIZ', `<div class="dir-grid">${['Stânga','Centru','Dreapta'].map((t,i)=>`<button class="answer-btn" onclick="selectBombPath(${i})">${t}</button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupBombVsAI(cell, diff) {
  const safePlayer = Math.floor(Math.random() * 3);
  const aiSkill = { easy: 0.35, medium: 0.65, hard: 0.85 }[diff];
  const safeAI = Math.random() < aiSkill ? safePlayer : Math.floor(Math.random() * 3);
  window.pickBombVsAI = function(i) {
    const playerWin = (i === safePlayer);
    const aiWin = (safeAI === safePlayer);
    if (playerWin && !aiWin) finishMiniGame(true, `🔥 Ai câștigat vs AI! +${getWinReward(cell)} pts`);
    else if (playerWin && aiWin) finishMiniGame(true, `🤝 Egal — amândoi corect. Primești punctele.`, 900, Math.max(1, Math.floor(getWinReward(cell) / 2)));
    else if (!playerWin && aiWin) finishMiniGame(false, '🤖 AI a câștigat!');
    else finishMiniGame(false, '💥 Amândoi ați pierdut.');
  };
  setMG(`${mgState.player}, alege lada sigură. AI alege și el.`, `💣 BOMBERMAN VS AI — ${DIFF_LABELS[diff]}`, `<div class="dir-grid"><button class="answer-btn" onclick="pickBombVsAI(0)">Stânga</button><button class="answer-btn" onclick="pickBombVsAI(1)">Centru</button><button class="answer-btn" onclick="pickBombVsAI(2)">Dreapta</button></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}

function setupHockey(cell) { setupSelectorGame(cell, { solo: setupHockeySolo, quiz: setupHockeyQuiz, ai: setupHockeyVsAI }); }
function setupHockeySolo(cell) {
  const cfg = cell.pts >= 3 ? { speed:3.1, good:[34,66], perfect:[44,56], title:'🏒 HOCKEY PRO' } : { speed:2.6, good:[26,74], perfect:[42,58], title:'🏒 HOCKEY' };
  createShotMeter(cell, { title:cfg.title, desc:`${mgState.player}, oprește bara aproape de centru pentru un șut perfect.`, speed:cfg.speed, goodMin:cfg.good[0], goodMax:cfg.good[1], perfectMin:cfg.perfect[0], perfectMax:cfg.perfect[1] });
}
function setupHockeyQuiz(cell) {
  const needed = cell.pts >= 3 ? 4 : 3;
  let hits = 0;
  const q = { q:'În hockey standard se joacă de obicei în:', a:['2 reprize','3 reprize','4 reprize','5 reprize'], correct:1 };
  setMG(`${mgState.player}, lovește ${needed} pucuri și apoi răspunde la quiz.`, '🏒 HOCKEY — SKILL + QUIZ', `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Combo: <span id="hc-count">0</span>/${needed}</div><div id="combo-zone" style="display:flex;justify-content:center"></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  function spawnPuck() {
    const zone = document.getElementById('combo-zone'); if (!zone) return;
    zone.innerHTML = `<div class="combo-puck pulse-go" onclick="hockeyComboHit()">🏒</div>`;
    schedule(() => { const puck = document.querySelector('#combo-zone .combo-puck'); if (puck) finishMiniGame(false, '❌ Ai pierdut combo-ul.'); }, cell.pts >= 3 ? 550 : 720);
  }
  window.hockeyComboHit = function() {
    hits++; document.getElementById('hc-count').textContent = hits; document.getElementById('combo-zone').innerHTML = '';
    if (hits >= needed) launchFollowupQuiz({ stageText:'🏒 Combo reușit! Urmează întrebarea.', quizTitle:'🏒 HOCKEY — QUIZ', question:q.q, answers:q.a, correctIndex:q.correct, successText:`🏒 Corect! +${getWinReward(cell)} pts!` });
    else schedule(spawnPuck, 170);
  };
  schedule(spawnPuck, 200);
}
function setupHockeyVsAI(cell, diff) {
  const target = { easy:3, medium:4, hard:6 }[diff];
  const aiTarget = { easy:2, medium:4, hard:6 }[diff];
  const aiWindow = { easy:950, medium:750, hard:520 }[diff];
  let playerHits = 0;
  setMG(`${mgState.player}, fă combo de ${target}. AI are un ritm propriu în paralel.`, `🏒 HOCKEY VS AI — ${DIFF_LABELS[diff]}`, `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Lovituri: <span id="h-ai-player">0</span>/${target}</div><div id="h-ai-zone" style="display:flex;justify-content:center"></div><div class="tiny-note">AI devine mai rapid pe Medium/Hard.</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  function spawnHit() {
    const zone = document.getElementById('h-ai-zone'); if (!zone) return;
    zone.innerHTML = `<div class="combo-puck pulse-go" onclick="pickHockeyVsAI()">🏒</div>`;
    schedule(() => { const puck = document.querySelector('#h-ai-zone .combo-puck'); if (puck) finishMiniGame(false, `🤖 AI a menținut ritmul mai bine (${aiTarget}).`); }, aiWindow);
  }
  window.pickHockeyVsAI = function() {
    playerHits++; document.getElementById('h-ai-player').textContent = playerHits; document.getElementById('h-ai-zone').innerHTML = '';
    if (playerHits >= target) {
      if (target > aiTarget) finishMiniGame(true, `🏒 Ai bătut AI-ul (${target} vs ${aiTarget})! +${getWinReward(cell)} pts!`);
      else if (target === aiTarget) finishMiniGame(true, '🤝 Egal cu AI. Primești jumătate de punctaj.', 900, Math.max(1, Math.floor(getWinReward(cell)/2)));
      else finishMiniGame(false, `🤖 AI a fost mai bun (${aiTarget} vs ${target})`);
    } else schedule(spawnHit, 160);
  };
  schedule(spawnHit, 200);
}

function setupBreakout(cell) { setupSelectorGame(cell, { solo: setupBreakoutSolo, quiz: setupBreakoutQuiz, ai: setupBreakoutVsAI }); }
function setupBreakoutSolo(cell) {
  const length = cell.pts >= 3 ? 5 : 4;
  const colors = ['🔴','🟠','🟡','🟢','🔵','🟣'];
  const order = colors.slice(0, length);
  let alive = shuffle([...order, ...colors.slice(length, length + 2)]);
  let step = 0;
  function render() {
    document.getElementById('br-order').textContent = order.slice(step).join(' ');
    document.getElementById('br-grid').innerHTML = alive.map((b,i)=>`<div class="brick-chip" onclick="breakoutOrderClick(${i})">${b}</div>`).join('');
  }
  window.breakoutOrderClick = function(i) {
    if (alive[i] === order[step]) {
      alive.splice(i,1); step++; render();
      if (step >= order.length) finishMiniGame(true, `🧱 Ordine perfectă! +${cell.pts} pts!`);
    } else finishMiniGame(false, '❌ Ai spart cărămida greșită.');
  };
  setMG(`${mgState.player}, sparge cărămizile în ordinea corectă.`, '🧱 BREAKOUT — SOLO', `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Ordinea cerută:</div><div id="br-order" style="font-size:24px;margin-bottom:10px">${order.join(' ')}</div><div id="br-grid" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center"></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  render();
}
function setupBreakoutQuiz(cell) {
  const q = { q:'Care este scopul principal în Breakout?', a:['Să colectezi monede','Să spargi toate cărămizile','Să găsești o ieșire','Să eviți un boss'], correct:1 };
  const shown = shuffle(['🔴','🟠','🟡','🟢','🔵']).slice(0, 4);
  const options = shuffle([shown.join(' '), shuffle(shown).join(' '), shuffle(['🔴','🟠','🟡','🟢','🔵']).slice(0,4).join(' ')]);
  window.breakoutColorAnswer = function(i) {
    if (options[i] !== shown.join(' ')) return finishMiniGame(false, '❌ Ordinea culorilor a fost greșită.');
    launchFollowupQuiz({ stageText:'🧱 Memorie bună! Urmează întrebarea.', quizTitle:'🧱 BREAKOUT — QUIZ', question:q.q, answers:q.a, correctIndex:q.correct, successText:`🧱 Corect! +${getWinReward(cell)} pts!` });
  };
  setMG(`${mgState.player}, memorează secvența, apoi răspunde la quiz.`, '🧱 BREAKOUT — SKILL + QUIZ', `<div id="br-mem" style="font-size:28px;margin-bottom:12px">${shown.join(' ')}</div><div class="triple-grid">${options.map((opt, i) => `<button class="answer-btn" onclick="breakoutColorAnswer(${i})">${opt}</button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  schedule(() => { const el = document.getElementById('br-mem'); if (el) el.textContent = '◼ ◼ ◼ ◼'; }, 1200);
}
function setupBreakoutVsAI(cell, diff) {
  const target = { easy:3, medium:4, hard:5 }[diff];
  const aiBricks = { easy:2, medium:4, hard:5 }[diff];
  const timeout = { easy:950, medium:700, hard:500 }[diff];
  let playerBricks = 0;
  setMG(`${mgState.player}, distruge ${target} cărămizi mai repede decât AI-ul simulat.`, `🧱 BREAKOUT VS AI — ${DIFF_LABELS[diff]}`, `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Cărămizi: <span id="br-ai-player">0</span>/${target}</div><div id="br-ai-zone" style="display:flex;justify-content:center"></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  function spawnBrick() {
    const zone = document.getElementById('br-ai-zone'); if (!zone) return;
    zone.innerHTML = `<div class="brick-chip pulse-go" onclick="pickBreakoutVsAI()">🧱</div>`;
    schedule(() => { const b = document.querySelector('#br-ai-zone .brick-chip'); if (b) finishMiniGame(false, `🤖 AI a distrus cărămizile mai repede (${aiBricks}).`); }, timeout);
  }
  window.pickBreakoutVsAI = function() {
    playerBricks++; document.getElementById('br-ai-player').textContent = playerBricks; document.getElementById('br-ai-zone').innerHTML = '';
    if (playerBricks >= target) {
      if (target > aiBricks) finishMiniGame(true, `🧱 Ai învins AI-ul (${target} vs ${aiBricks})! +${getWinReward(cell)} pts!`);
      else if (target === aiBricks) finishMiniGame(true, '🤝 Egal cu AI. Primești jumătate de punctaj.', 900, Math.max(1, Math.floor(getWinReward(cell)/2)));
      else finishMiniGame(false, `🤖 AI a spart mai multe (${aiBricks} vs ${target})`);
    } else schedule(spawnBrick, 150);
  };
  schedule(spawnBrick, 200);
}

function setupFusion(cell) { setupSelectorGame(cell, { solo: setupFusionSolo, quiz: setupFusionQuiz, ai: setupFusionVsAI }); }
function setupFusionSolo(cell) {
  const icons = ['⚡','🧊','🔥','🌀'];
  const names = ['Dash', 'Freeze', 'Burst', 'Warp'];
  const correct = Math.floor(Math.random() * 4);
  window.fusionTilePick = i => i === correct ? finishMiniGame(true, `🎭 Puterea corectă activată! +${cell.pts} pts!`) : finishMiniGame(false, `❌ Puterea ${names[i]} nu se potrivește.`);
  setMG(`${mgState.player}, alege puterea potrivită pentru portal.`, '🎭 FUSION — SOLO', `<div class="fusion-slots">${icons.map((ico,i)=>`<div class="fusion-slot" onclick="fusionTilePick(${i})">${ico}<div style="font-size:11px;color:var(--dim);margin-top:6px">${names[i]}</div></div>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupFusionQuiz(cell) {
  const questions = [
    {q:'Câte vieți ai la start în Arcade Fusion?', a:['1','3','5','10'], correct:1},
    {q:'Ce colectezi pentru combo în Arcade Fusion?', a:['Stele','Pellets','Coins','Hearts'], correct:1},
    {q:'Ce buton activează Bomb în Arcade Fusion?', a:['Z','X','C','V'], correct:2}
  ];
  const qu = shuffle(questions)[0];
  const target = 3;
  let picked = 0;
  function renderFusionOrbs() {
    const zone = document.getElementById('fusion-orb-zone'); if (!zone) return;
    const options = shuffle(['✦','✦','✦','💀']);
    zone.innerHTML = options.map((ico,i)=>`<div class="fusion-slot" onclick="fusionTilePick(${i})">${ico}</div>`).join('');
  }
  window.fusionTilePick = function(i) {
    const chosen = document.getElementById('fusion-orb-zone')?.children?.[i]?.textContent || '';
    if (chosen !== '✦') return finishMiniGame(false, '❌ Ai atins hazardul dimensional.');
    picked++; document.getElementById('fusion-pick-count').textContent = picked;
    if (picked >= target) return launchFollowupQuiz({ stageText:'🎭 Ai strâns suficiente orbs! Urmează întrebarea.', quizTitle:'🎭 FUSION — QUIZ', question:qu.q, answers:qu.a, correctIndex:qu.correct, successText:`🎭 Corect! +${getWinReward(cell)} pts!` });
    renderFusionOrbs();
  };
  setMG(`${mgState.player}, strânge 3 orbs, apoi răspunde la întrebare.`, '🎭 FUSION — SKILL + QUIZ', `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Orbs: <span id="fusion-pick-count">0</span>/${target}</div><div id="fusion-orb-zone" class="fusion-slots"></div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  renderFusionOrbs();
}
function setupFusionVsAI(cell, diff) {
  const target = { easy:2, medium:3, hard:4 }[diff];
  const aiTarget = { easy:2, medium:3, hard:4 }[diff];
  let picked = 0;
  function renderFusionOrbs() {
    const zone = document.getElementById('fusion-ai-zone'); if (!zone) return;
    const hazards = diff === 'hard' ? 2 : 1;
    const options = shuffle([ ...Array(4 - hazards).fill('✦'), ...Array(hazards).fill('💀') ]).slice(0,4);
    zone.innerHTML = options.map((ico,i)=>`<div class="fusion-slot" onclick="pickFusionVsAI(${i})">${ico}</div>`).join('');
  }
  window.pickFusionVsAI = function(i) {
    const chosen = document.getElementById('fusion-ai-zone')?.children?.[i]?.textContent || '';
    if (chosen !== '✦') return finishMiniGame(false, '❌ Hazard dimensional. AI a câștigat duelul.');
    picked++; document.getElementById('fusion-ai-count').textContent = picked;
    if (picked >= target) {
      if (target >= aiTarget && diff !== 'hard') finishMiniGame(true, `🎭 Ai învins AI-ul pe pattern! +${getWinReward(cell)} pts!`);
      else if (target === aiTarget) finishMiniGame(true, '🤝 Egal cu AI. Primești jumătate de punctaj.', 900, Math.max(1, Math.floor(getWinReward(cell)/2)));
      else finishMiniGame(false, '🤖 AI a terminat combinația mai bine.');
      return;
    }
    renderFusionOrbs();
  };
  setMG(`${mgState.player}, găsește pattern-ul sigur mai bine decât AI.`, `🎭 FUSION VS AI — ${DIFF_LABELS[diff]}`, `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Pattern: <span id="fusion-ai-count">0</span>/${target}</div><div id="fusion-ai-zone" class="fusion-slots"></div><div class="tiny-note">Hard adaugă mai multe hazarduri.</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
  renderFusionOrbs();
}

function setupPvAI(cell) { setupSelectorGame(cell, { solo: setupPvAISolo, quiz: setupPvAIQuiz, ai: setupPvAIVsAI }); }
function setupPvAISolo(cell) {
  const opts = ['🗡️','🛡️','💥'];
  const names = ['Atac','Apărare','Explozie'];
  const ai = Math.floor(Math.random() * 3);
  const wins = { 0: 2, 2: 1, 1: 0 };
  window.pvaiChoice = function(p) {
    if (p === ai) return finishMiniGame(false, `🤝 Egal cu AI (${opts[ai]} ${names[ai]})!`);
    if (wins[p] === ai) return finishMiniGame(true, `⚔️ Ai bătut boss-ul! +${cell.pts} pts!`);
    finishMiniGame(false, `❌ Boss-ul a câștigat! ${opts[ai]} ${names[ai]} te-a bătut.`);
  };
  setMG(`${mgState.player}, Atac bate Explozie, Explozie bate Apărare, Apărare bate Atac.`, '⚔️ PvAI — SOLO', `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${opts.map((o,i)=>`<button class="secondary-btn" onclick="pvaiChoice(${i})" style="font-size:28px;padding:12px 16px">${o}<div style="font-size:10px;color:var(--dim);margin-top:4px">${names[i]}</div></button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupPvAIQuiz(cell) {
  const q = { q:'Într-un duel clasic, ce înseamnă “counter”?', a:['Atac întâmplător','Răspuns care bate mutarea adversarului','Schimb de hartă','Pauză de joc'], correct:1 };
  const safe = Math.floor(Math.random() * 4);
  const tiles = ['⚡','🛡️','💥','🌀'];
  window.fusionTilePick = function(i) {
    if (i !== safe) return finishMiniGame(false, '❌ Bossul a contracarat alegerea ta.');
    launchFollowupQuiz({ stageText:'⚔️ Ai spart apărarea bossului. Urmează întrebarea.', quizTitle:'⚔️ PvAI — QUIZ', question:q.q, answers:q.a, correctIndex:q.correct, successText:`⚔️ Corect! +${getWinReward(cell)} pts!` });
  };
  setMG(`${mgState.player}, găsește alegerea bună și apoi răspunde la quiz.`, '⚔️ PvAI — SKILL + QUIZ', `<div class="tile-duel-grid">${tiles.map((t,i)=>`<div class="tile-duel-cell" onclick="fusionTilePick(${i})">${t}</div>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}
function setupPvAIVsAI(cell, diff) {
  const opts = ['🗡️','🛡️','💥'];
  const names = ['Atac','Apărare','Explozie'];
  const wins = { 0: 2, 2: 1, 1: 0 };
  let ai;
  if (diff === 'easy') ai = Math.floor(Math.random() * 3);
  else if (diff === 'medium') ai = Math.random() < 0.6 ? 1 : Math.floor(Math.random() * 3);
  else ai = Math.random() < 0.85 ? 1 : Math.floor(Math.random() * 3);
  window.pickPvAIVsAI = function(p) {
    if (p === ai) return finishMiniGame(true, `🤝 Egal cu AI (${opts[ai]} ${names[ai]}).`, 900, Math.max(1, Math.floor(getWinReward(cell)/2)));
    if (wins[p] === ai) return finishMiniGame(true, `⚔️ Ai bătut AI-ul! +${getWinReward(cell)} pts!`);
    finishMiniGame(false, `❌ AI a câștigat! ${opts[ai]} ${names[ai]} te-a bătut.`);
  };
  setMG(`${mgState.player}, AI-ul face counter mai des pe dificultăți mari.`, `⚔️ PvAI VS AI — ${DIFF_LABELS[diff]}`, `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${opts.map((o,i)=>`<button class="secondary-btn" onclick="pickPvAIVsAI(${i})" style="font-size:28px;padding:12px 16px">${o}<div style="font-size:10px;color:var(--dim);margin-top:4px">${names[i]}</div></button>`).join('')}</div>`, `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`);
}

function setupGeneric(cell) {
  setMG(`${mgState.player} a aterizat pe câmpul ${cell.name}.`, '🎮 MINI-JOC', `<div style="font-size:13px;color:var(--dim)">Inspirat din: ${cell.desc}</div>`, `<button class="btn-win" onclick="closeMG(true)">+${cell.pts} Câștig</button><button class="btn-lose" onclick="closeMG(false)">Pierd</button>`);
}

window.addEventListener('keydown', (e) => {
  if (document.getElementById('overlay').classList.contains('hidden')) return;
  if (e.key === 'Escape') return closeMG(false);
  if (window.mazeMove) {
    if (e.key === 'ArrowUp') mazeMove(0, -1);
    if (e.key === 'ArrowDown') mazeMove(0, 1);
    if (e.key === 'ArrowLeft') mazeMove(-1, 0);
    if (e.key === 'ArrowRight') mazeMove(1, 0);
  }
  if ([' ', 'Enter'].includes(e.key)) {
    if (window.doShoot) { e.preventDefault(); doShoot(); }
    if (window.bbPress) { e.preventDefault(); bbPress(); }
  }
});

window.addEventListener('message', (event) => {
  if (!event?.data || typeof event.data !== 'object') return;
  if (event.data.type !== 'arcade-world-full-result') return;
  if (document.getElementById('full-overlay').classList.contains('hidden')) return;
  const isWin = event.data.result === 'win';
  closeFullGame(isWin);
});

loadProfile();
state = freshState();
buildBoard();
renderMetaPanels();
addLog('🎮 ARCADE WORLD pornit! Tura: JUCĂTOR 1 · Primul la 20 puncte câștigă.');
addLog('📋 Regulă: aruncă zarul → te muți → joci mini-jocul de pe câmp.');
