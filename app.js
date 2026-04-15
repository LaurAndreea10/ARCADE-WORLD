const TOTAL = 24;
const WIN_SCORE = 20;
const PASS_START_BONUS = 1;
const MEM_SYMBOLS = ['🌟','🔥','💧','🌊','⚡','🍀','💎','🌙'];

const MODE_CONFIG = {
  solo: { label: 'Solo Skill' },
  ai: { label: 'Vs AI' },
  quiz: { label: 'Skill + Quiz' }
};

const AI_DIFF_CONFIG = {
  easy: { label: 'Easy', bonus: 0 },
  medium: { label: 'Medium', bonus: 1 },
  hard: { label: 'Hard', bonus: 2 }
};

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

function getGridPos(id) {
  if (id <= 6) return { r: 0, c: id };
  if (id <= 11) return { r: id - 6, c: 6 };
  if (id <= 18) return { r: 6, c: 6 - (id - 12) };
  return { r: 6 - (id - 18), c: 0 };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let state;
let logEntries = [];
let mgState = {};
let timers = [];

function schedule(fn, ms) {
  const id = setTimeout(fn, ms);
  timers.push(id);
  return id;
}

function clearScheduled() {
  timers.forEach(clearTimeout);
  timers = [];
}

function clearMiniGameRunState() {
  clearInterval(mgState.interval);
  clearScheduled();
  resetMiniHandlers();
}

function resetMiniHandlers() {
  [
    'doShoot','memClick','tttClick','mazeMove','bombAnswer','bbPress','fusAnswer','pvaiChoice',
    'pickBonusStar','answerBonusSeq','startTap','cutTrapWire','escapeTrap','selectBombPath',
    'breakoutOrderClick','breakoutColorAnswer','breakoutReact','hockeyTimingStop','hockeyComboHit',
    'hockeyDirPick','fusionTilePick','fusionWordSubmit','pvaiPatternChoice','pvaiTilePick',
    'selectMode','selectDiff','pickBombVsAI','pickHockeyVsAI','pickBreakou
        'pickPvAIVsAI','confirmBasketAI'
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
        div.setAttribute('role', 'button');
        div.setAttribute('tabindex', '0');
        div.setAttribute('aria-label', `${cell.name}, câmp ${cell.id}`);
        div.innerHTML = `
          <span class="cell-num">${cell.id}</span>
          <span class="cell-icon">${cell.icon}</span>
          <span class="cell-name">${cell.name}</span>
        `;
        div.onclick = () => handleCellClick(cell.id);
        div.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
                        handleCellClick(cell.id);
          }
        };
      } else if (r >= 1 && r <= 5 && c >= 1 && c <= 5) {
        div.className = 'cell empty-center';
        if (r === 3 && c === 3) {
          div.innerHTML = `<div class="center-logo">ARCADE<br>WORLD</div>`;
        }
      } else {
        div.className = 'cell empty-center';
      }
      board.appendChild(div);
    }
  }

  renderBoard();
}

function phaseText(phase) {
  const map = {
    roll: 'Așteaptă zarul',
    move: 'Mutare în curs',
    minigame: 'Mini-joc activ',
        end: 'Joc terminat'
  };
  return map[phase] || phase;
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
  document.getElementById('last-cell').textContent = state.lastCellLabel || '—';
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

function closeMG(won) {
  if (!mgState.cell || mgState.done) return;
  mgState.done = true;

  clearMiniGameRunState();
  document.getElementById('overlay').classList.add('hidden');

  const cell = mgState.cell;
  const p = state.turn;
  const aiBonus = mgState.mode === 'ai' && mgState.difficulty ? (AI_DIFF_CONFIG[mgState.difficulty]?.bonus || 0) : 0;
  const totalReward = cell.pts + aiBonus;

  if (cell.game === 'trap') {
    if (won) {
      if ((mgState.feedbackText || '').includes('0 puncte') || (mgState.feedbackText || '').includes('Nu pierzi')) {
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
    state.scores[p] += totalReward;
    const extra = aiBonus ? ` (+${aiBonus} bonus ${AI_DIFF_CONFIG[mgState.difficulty].label})` : '';
    addLog(`✅ ${['J1','J2'][p]} câștigă mini-jocul +${totalReward}pts${extra} → ${state.scores[p]} total`);
  } else {
    addLog(`❌ ${['J1','J2'][p]} pierde mini-jocul pe ${cell.name}`);
  }

  renderBoard();
  checkWin();
  if (state.phase !== 'end') endTurn();
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
  document.getElementById('dice-val').textContent = '—';
  renderBoard();
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
    window.bombAnswer = undefined;
    window.fusAnswer = undefined;
    window.quizAnswer = function(i) {
      if (i === correctIndex) showFeedback(true, successText || `✅ Corect! +${mgState.cell.pts} pts!`);
      else showFeedback(false, '❌ Răspuns greșit.');
    };

    document.getElementById('mg-challenge').innerHTML = `
      <div class="mg-challenge-title">${quizTitle}</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:12px;color:var(--white)">${question}</div>
      <div class="option-grid">
        ${answers.map((a, i) => `<button class="answer-btn" onclick="quizAnswer(${i})">${a}</button>`).join('')}
      </div>
      <div class="tiny-note">Ai trecut de partea de acțiune. Acum răspunde corect pentru a lua punctele.</div>
    `;
  }, 750);
}

function showModeSelector(onSelect) {
    document.getElementById('mg-feedback').innerHTML = '';
  document.getElementById('mg-challenge').innerHTML = `
    <div class="mg-challenge-title">Alege modul</div>
    <div style="display:grid;gap:10px">
      <button class="answer-btn" onclick="selectMode('solo')">🎮 Solo Skill</button>
      <button class="answer-btn" onclick="selectMode('ai')">🤖 Vs AI</button>
      <button class="answer-btn" onclick="selectMode('quiz')">🧠 Skill + Quiz</button>
    </div>
    <div class="tiny-note">Fiecare mod schimbă felul în care se joacă mini-jocul.</div>
  `;

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
    </div>
    <div class="tiny-note">Hard oferă și recompensă puțin mai mare la victorie.</div>
  `;

  window.selectDiff = function(diff) {
    mgState.difficulty = diff;
    onSelect(diff);
  };
}

function setupSelectorGame(cell, handlers) {
  showModeSelector((mode) => {
    if (mode === 'solo') return handlers.solo(cell);
    if (mode === 'quiz') return handlers.quiz(cell);
    if (mode === 'ai') {
      showDifficultySelector((diff) => handlers.ai(cell, diff));
    }
  });
}

function openMiniGame(cell) {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('hidden');
  document.getElementById('mg-icon').textContent = cell.icon;
  document.getElementById('mg-title').textContent = cell.name.toUpperCase();
  document.getElementById('mg-origin').textContent = `INSPIRAT DIN: ${cell.desc.toUpperCase()}`;
  document.getElementById('mg-feedback').innerHTML = '';

  clearMiniGameRunState();

  mgState = {
    cell,
    player: ['JUCĂTOR 1','JUCĂTOR 2'][state.turn],
    interval: null,
    done: false,
    feedbackText: '',
    mode: null,
    difficulty: null
  };

  const key = `${cell.game}:${cell.variant || 'default'}`;
  const handler = MINI_GAMES[key] || GAME_FALLBACKS[cell.game] || setupGeneric;
  handler(cell);
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
  'ttt:classic': cell => setupTTT(cell, false),
  'shooter:classic': cell => setupShooter(cell, false),
  'shooter:hard': cell => setupShooter(cell, true),
  'bounce:classic': setupBounce,
  'bomb:selector': setupBomb,
  'breakout:selector': setupBreakout,
  'hockey:selector': setupHockey,
  'fusion:selector': setupFusion,
    'pvai:selector': setupPvAI
};

const GAME_FALLBACKS = {
  start: setupStart,
  bonus: setupBonusStars,
  trap: setupTrapWire,
  shoot: setupShootClassic,
  maze: setupMaze,
  memory: cell => setupMemory(cell, false),
  ttt: cell => setupTTT(cell, false),
  bomb: setupBomb,
  shooter: cell => setupShooter(cell, false),
  hockey: setupHockey,
  bounce: setupBounce,
  breakout: setupBreakout,
  fusion: setupFusion,
  pvai: setupPvAI
};

function setupStart(cell) {
    const target = 2;
  let taps = 0;

  window.startTap = function() {
    taps++;
    const el = document.getElementById('start-count');
    if (el) el.textContent = taps;
    if (taps >= target) showFeedback(true, '🏁 Start boost activat! +2 puncte!', 900);
  };

  setMG(
    `${mgState.player}, activează platforma de start apăsând rapid butonul de 2 ori.`,
    '🏁 START — Activează platforma',
    `<div style="font-size:14px;margin-bottom:10px">Apăsări: <span id="start-count">0</span>/${target}</div>
     <button class="secondary-btn" onclick="startTap()" style="font-size:18px;padding:14px 22px">START BOOST</button>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupBonusStars(cell) {
  const winning = Math.floor(Math.random() * 3);
   window.pickBonusStar = function(i) {
    if (i === winning) showFeedback(true, `⭐ Bonus obținut! +${cell.pts} puncte!`);
    else showFeedback(false, '❌ Stea goală!');
  };

  setMG(
    `${mgState.player}, una dintre stele ascunde bonusul complet.`,
    '⭐ BONUS — Alege steaua corectă',
    `<div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">
      ${[0,1,2].map(i => `<button class="secondary-btn" onclick="pickBonusStar(${i})" style="font-size:28px;padding:12px 18px">⭐</button>`).join('')}
    </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupBonusSequence(cell) {
  const sequences = ['⭐💎⚡', '⚡⭐💎', '💎⭐⚡'];
  const shown = sequences[Math.floor(Math.random() * sequences.length)];
  const options = shuffle([shown, ...sequences.filter(s => s !== shown)]).slice(0, 3);

  window.answerBonusSeq = function(i) {
        if (options[i] === shown) showFeedback(true, `⭐ Memorie bună! +${cell.pts} puncte!`);
    else showFeedback(false, '❌ Ordinea a fost greșită.');
  };

  setMG(
    `${mgState.player}, ține minte ordinea și alege răspunsul corect.`,
    '⭐ BONUS — Memorează secvența',
    `<div style="font-size:26px;margin-bottom:12px">${shown}</div>
      <div style="font-size:12px;color:var(--dim);margin-bottom:8px">Care a fost secvența?</div>
      <div style="display:grid;grid-template-columns:1fr;gap:8px">
        ${options.map((opt, i) => `<button class="answer-btn" onclick="answerBonusSeq(${i})">${opt}</button>`).join('')}
      </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupBonusLuckyPick(cell) {
  const good = Math.floor(Math.random() * 4);
  window.pickBonusStar = function(i) {
    if (i === good) showFeedback(true, `💎 Jackpot! +${cell.pts} puncte!`);
    else showFeedback(false, '❌ N-ai nimerit premiul mare.');
      };

  setMG(
    `${mgState.player}, doar una dintre capsule oferă bonusul.`,
    '⭐ BONUS — Lucky Pick',
    `<div class="four-grid">
      ${['🎁','🎁','🎁','🎁'].map((v, i) => `<button class="answer-btn" onclick="pickBonusStar(${i})">${v} Capsule ${i+1}</button>`).join('')}
    </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupTrapWire(cell) {
  const safe = Math.floor(Math.random() * 3);
  const colors = ['Roșu', 'Albastru', 'Verde'];

  window.cutTrapWire = function(i) {
    if (i === safe) showFeedback(true, '🛡️ Ai dezamorsat capcana! Nu pierzi puncte.', 900);
    else showFeedback(true, `💀 Capcana se activează! ${cell.pts} puncte.`, 900);
  };

  setMG(
    `${mgState.player}, doar un fir dezactivează capcana.`,
        '💀 CAPCANĂ — Taie firul sigur',
    `<div class="wire-grid">
      ${colors.map((c, i) => `<button class="answer-btn" onclick="cutTrapWire(${i})">Taie firul ${c}</button>`).join('')}
    </div>`,
    `<button class="btn-skip" onclick="closeMG(true)">Acceptă efectul</button>`
  );
}

function setupTrapReaction(cell) {
  let pressed = false;
  schedule(() => {
    if (!pressed) showFeedback(true, `💀 Prea lent! ${cell.pts} puncte.`, 900);
  }, 1100);

  window.escapeTrap = function() {
    if (pressed) return;
    pressed = true;
    showFeedback(true, '🛡️ Ai evitat capcana! 0 puncte pierdute.', 900);
  };

  setMG(
        `${mgState.player}, apasă butonul înainte să expire timpul pentru a evita capcana.`,
    '💀 CAPCANĂ — Reacție rapidă',
    `<div style="font-size:12px;color:var(--dim);margin-bottom:10px">Apasă înainte de 1 secundă!</div>
     <button class="secondary-btn" onclick="escapeTrap()" style="font-size:18px;padding:14px 20px">SCAPĂ!</button>`,
    `<button class="btn-skip" onclick="closeMG(true)">Acceptă efectul</button>`
  );
}

function createShotMeter(cell, goodMin, goodMax, perfectMin, perfectMax, desc, speed = 2.5) {
  setMG(
    desc,
    '🏀 TRAGE LA COȘ — Oprește în zona verde',
    `<div class="shoot-bar-wrap" onclick="doShoot()">
      <div class="shoot-bar"></div>
      <div class="shoot-cursor" id="shoot-cursor"></div>
    </div>
    <div style="font-size:11px;color:var(--dim)">Apasă pe bară când cursorul e în verde.</div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  let pos = 0;
  let dir = 1;
  mgState.shootPos = 0;
    mgState.interval = setInterval(() => {
    pos += dir * speed;
    if (pos >= 100) { pos = 100; dir = -1; }
    if (pos <= 0) { pos = 0; dir = 1; }
    mgState.shootPos = pos;
    const cursor = document.getElementById('shoot-cursor');
    if (cursor) cursor.style.left = pos + '%';
  }, 16);

  window.doShoot = function() {
    clearInterval(mgState.interval);
    const p = mgState.shootPos;
    const perfect = p >= perfectMin && p <= perfectMax;
    const good = p >= goodMin && p <= goodMax;

    if (perfect) showFeedback(true, `🏀 PERFECT SHOT! +${cell.pts} puncte!`, 1000);
    else if (good) showFeedback(true, '✅ Coș bun!', 1000);
    else showFeedback(false, '❌ Ratat! Prea devreme sau prea târziu.', 1000);
  };
}

function setupShootClassic(cell) {
    createShotMeter(cell, 25, 75, 40, 60, `${mgState.player}, ești pe terenul de basket! Oprește cursorul în zona verde pentru a marca.`);
}

function setupShootFast(cell) {
  createShotMeter(cell, 34, 66, 44, 56, `${mgState.player}, variantă PRO: zona perfectă este mai mică și cursorul e mai rapid.`, 3.8);
}

function setupMemory(cell, hard = false) {
  const pairs = hard ? 8 : 6;
  const syms = MEM_SYMBOLS.slice(0, pairs);
  const cards = shuffle([...syms, ...syms]);
  let flipped = [];
  let matched = [];
  let locked = false;
  let moves = 0;
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
    if (flipped.length === 2) return;

    flipped.push(i);
    render();

    if (flipped.length === 2) {
      moves++;
      locked = true;

      if (cards[flipped[0]] === cards[flipped[1]]) {
        matched.push(...flipped);
        flipped = [];
        locked = false;
        render();

              if (matched.length === cards.length) {
          showFeedback(true, `🃏 Toate perechile găsite! +${cell.pts} pts!`);
        }
      } else {
        schedule(() => {
          flipped = [];
          locked = false;
          render();
          if (moves >= maxMoves) showFeedback(false, '❌ Mutări epuizate!');
        }, 760);
      }
    }
  };

  setMG(
    `${mgState.player}, găsește toate perechile înainte să rămâi fără mutări.`,
    hard ? '🃏 MEMORY HARD' : '🃏 MEMORY',
    `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Status: <span id="mem-status">0/${maxMoves} mutări</span></div>
     <div id="mem-grid" class="mem-grid" style="grid-template-columns:repeat(${hard ? 4 : 3},1fr)"></div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  render();
  }

function setupTTT(cell) {
  const board = Array(9).fill('');
  const playerSym = '✖️';
  const aiSym = '⭕';
  let done = false;

  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function render() {
    const g = document.getElementById('ttt-g');
    if (!g) return;
    g.innerHTML = board.map((v, i) => `<div class="ttt-cell" onclick="tttClick(${i})">${v}</div>`).join('');
  }

  function checkWin(b, s) {
    return wins.some(line => line.every(i => b[i] === s));
  }

  function aiMove() {
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = aiSym;
        if (checkWin(board, aiSym)) return render();
        board[i] = '';
      }
    }

    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = playerSym;
        if (checkWin(board, playerSym)) {
          board[i] = aiSym;
          return render();
        }
        board[i] = '';
      }
    }
    
    if (board[4] === '') {
      board[4] = aiSym;
      return render();
    }

    const empty = board.map((v, i) => v === '' ? i : -1).filter(i => i >= 0);
    if (empty.length) board[empty[Math.floor(Math.random() * empty.length)]] = aiSym;
    render();
  }

  window.tttClick = function(i) {
    if (done || board[i] !== '') return;
    board[i] = playerSym;
    render();

    if (checkWin(board, playerSym)) {
      done = true;
      return showFeedback(true, `✖️ Ai câștigat TTT! +${cell.pts} pts!`);
    }

    if (board.every(v => v !== '')) {
            done = true;
      return showFeedback(false, '🤝 Remiză!');
    }

    schedule(() => {
      aiMove();
      if (checkWin(board, aiSym)) {
        done = true;
        showFeedback(false, '❌ AI a câștigat!');
      } else if (board.every(v => v !== '')) {
        done = true;
        showFeedback(false, '🤝 Remiză!');
      }
    }, 380);
  };

  setMG(
    `${mgState.player}, joacă Tic Tac Toe împotriva AI-ului. Tu ești ✖️.`,
    '✖️ TIC TAC TOE — Tu vs AI',
    `<div id="ttt-g" class="ttt-grid"></div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
  
  render();
}

function setupMaze(cell) {
  const mazes = [
    ['#####','#P  E','# ## ','#    ','#####'],
    ['#####','#P # ','#  # ','## #E','#####'],
    ['######','#P   #','### ##','#    E','######']
  ];

  const grid = mazes[Math.floor(Math.random() * mazes.length)].map(row => row.split(''));
  let px = 0, py = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 'P') {
        px = c;
        py = r;
      }
    }
  }

  function renderMaze() {
    return grid.map(row => row.join(' ')).join('\n');
  }

  function draw() {
    const d = document.getElementById('maze-d');
    if (d) d.textContent = renderMaze();
  }

  window.mazeMove = function(dx, dy) {
    const nx = px + dx;
    const ny = py + dy;
    if (ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[ny].length) return;
    const tile = grid[ny][nx];
    if (tile === '#') return;
    if (tile === 'E') return showFeedback(true, `🗺️ Exit găsit! +${cell.pts} pts!`, 800);
    grid[py][px] = ' ';
    px = nx;
    py = ny;
    grid[py][px] = 'P';
    draw();
  };

  setMG(
    `${mgState.player}, navighează prin labirint și ajunge la E. Merg și săgețile tastaturii.`,
    '🗺️ MAZE — Ajunge la E',
    `<div class="maze-display" id="maze-d"></div>
     <div class="maze-controls">
       <button class="maze-btn" onclick="mazeMove(0,-1)">⬆</button>
       <button class="maze-btn" onclick="mazeMove(-1,0)">⬅</button>
       <button class="maze-btn" onclick="mazeMove(1,0)">➡</button>
       <button class="maze-btn" onclick="mazeMove(0,1)">⬇</button>
     </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  draw();
}

function setupShooter(cell, hard = false) {
  let score = 0;
  const total = hard ? 10 : 8;
  const needed = hard ? 7 : 5;
  let spawned = 0;
  let done = false;
  
  setMG(
    `${mgState.player}, distruge cel puțin ${needed} din ${total} inamici înainte să scape.`,
    hard ? '🚀 VOID HUNTER — HARD' : '🚀 VOID HUNTER — Apasă inamicii',
    `<div id="shooter-area" style="position:relative;background:#000;border-radius:10px;height:120px;overflow:hidden;margin-bottom:8px"></div>
     <div style="font-size:12px;color:var(--dim)">Distruși: <span id="s-score">0</span>/${needed} necesari din ${total}</div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  function finish(success) {
    if (done) return;
    done = true;
    clearInterval(mgState.interval);
    if (success) showFeedback(true, `🚀 ${score} inamici distruși! +${cell.pts} pts!`);
    else showFeedback(false, `❌ Prea puțini distruși (${score}/${needed})!`);
  }

  function spawnEnemy() {
    if (spawned >= total || done) return;
    spawned++;
    const area = document.getElementById('shooter-area');
    if (!area) return;
    
    const e = document.createElement('div');
    const icons = ['👾','🛸','☄️','💀','🤖'];
    e.textContent = icons[Math.floor(Math.random() * icons.length)];
    e.style.cssText = `position:absolute;font-size:24px;cursor:pointer;transition:left ${hard ? 1.35 : 2}s linear;top:${Math.random() * 70}px;left:90%`;
    e.onclick = () => {
      if (done) return;
      e.remove();
      score++;
      document.getElementById('s-score').textContent = score;
      if (score >= needed) finish(true);
    };
    area.appendChild(e);

    schedule(() => { e.style.left = '-10%'; }, 40);
    schedule(() => {
      if (e.parentNode) e.remove();
      if (spawned >= total && !done && score < needed) finish(false);
    }, hard ? 1450 : 2100);
  }

  mgState.interval = setInterval(spawnEnemy, hard ? 420 : 600);
    schedule(spawnEnemy, 100);
}

function setupBounce(cell) {
  let started = true;
  const duration = 1500 + Math.random() * 500;
  const dropTime = Date.now();

  window.bbPress = function() {
    if (!started) return;
    started = false;
    const pct = (Date.now() - dropTime) / duration;
    if (pct >= 0.80 && pct <= 1.03) showFeedback(true, `🔵 Timing perfect! +${cell.pts} pts!`);
    else if (pct >= 0.65) showFeedback(true, '✅ Destul de bun!');
    else showFeedback(false, '❌ Prea devreme!');
  };

  setMG(
    `${mgState.player}, apasă exact când mingea atinge fundul.`,
    '🔵 BOUNCE BALL — Timing perfect',
    `<div style="position:relative;background:#000;border-radius:10px;height:100px;overflow:hidden;margin-bottom:8px">
      <div id="bb-ball" style="position:absolute;font-size:24px;left:50%;transform:translateX(-50%);top:0">🔵</div>
     </div>
     <button class="secondary-btn" onclick="bbPress()" style="border:2px solid var(--cyan);color:var(--cyan)">BOUNCE!</button>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  function animBall() {
        if (!started) return;
    const elapsed = Date.now() - dropTime;
    const pct = Math.min(elapsed / duration, 1);
    const y = pct * 76;
    const ball = document.getElementById('bb-ball');
    if (ball) ball.style.top = y + 'px';
    if (pct < 1) requestAnimationFrame(animBall);
    else if (started) showFeedback(false, '❌ Ai ratat momentul!');
  }

  requestAnimationFrame(animBall);
}

function setupBomb(cell) {
  setupSelectorGame(cell, {
    solo: setupBombSolo,
    quiz: setupBombTrivia,
    ai: setupBombVsAI
  });
}

function setupBombSolo(cell) {
  const safe = Math.floor(Math.random() * 3);
  const crates = ['🧱 Stânga', '📦 Centru', '🧱 Dreapta'];

  window.selectBombPath = function(i) {
    if (i === safe) showFeedback(true, `💣 Ladă sigură! +${cell.pts} pts!`);
    else showFeedback(false, '❌ Ai deschis lada explozivă.');
  };

  setMG(
    `${mgState.player}, alege lada sigură.`,
    '💣 BOMBERMAN — Solo Skill',
    `<div class="dir-grid">
      ${crates.map((c, i) => `<button class="answer-btn" onclick="selectBombPath(${i})">${c}</button>`).join('')}
    </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupBombTrivia(cell) {
  const questions = [
      setMG(
    `${mgState.player}, joacă întâi: găsește lada sigură. Dacă supraviețuiești, primești întrebarea.`,
    '💣 BOMBERMAN — Skill + Quiz',
    `<div style="font-size:12px;color:var(--dim);margin-bottom:10px">Una dintre lăzi este sigură. Alege corect și deblochezi întrebarea.</div>
     <div class="dir-grid">
       ${crates.map((c, i) => `<button class="answer-btn" onclick="selectBombPath(${i})">${c}</button>`).join('')}
     </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupBombVsAI(cell, diff) {
  const safePlayer = Math.floor(Math.random() * 3);
  let safeAI;

  if (diff === 'easy') safeAI = Math.floor(Math.random() * 3);
  if (diff === 'medium') safeAI = Math.random() < 0.6 ? safePlayer : Math.floor(Math.random() * 3);
  if (diff === 'hard') safeAI = Math.random() < 0.85 ? safePlayer : Math.floor(Math.random() * 3);

  window.pickBombVsAI = function(i) {
    const playerWin = (i === safePlayer);
    const aiWin = (safeAI === safePlayer);
    
    if (playerWin && !aiWin) showFeedback(true, `🔥 Ai câștigat vs AI! +${cell.pts} pts`);
    else if (!playerWin && aiWin) showFeedback(false, `🤖 AI a câștigat!`);
    else if (playerWin && aiWin) showFeedback(true, `🤝 Egal — amândoi corect`);
    else showFeedback(false, `💥 Amândoi ați pierdut`);
  };

  setMG(
    `${mgState.player}, alege lada sigură. AI face și el alegerea.`,
    `💣 BOMBERMAN VS AI — ${AI_DIFF_CONFIG[diff].label}`,
    `<div class="dir-grid">
      <button class="answer-btn" onclick="pickBombVsAI(0)">Stânga</button>
      <button class="answer-btn" onclick="pickBombVsAI(1)">Centru</button>
      <button class="answer-btn" onclick="pickBombVsAI(2)">Dreapta</button>
    </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupHockey(cell) {
  setupSelectorGame(cell, {
    solo: setupHockeySolo,
    quiz: setupHockeyQuiz,
        ai: setupHockeyVsAI
  });
}

function setupHockeySolo(cell) {
  setupHockeyTiming(cell);
}

function setupHockeyQuiz(cell) {
  let hits = 0;
  const target = 3;
  const q = {
    q:'În hockey, câte reprize are de obicei un meci standard?',
    a:['2','3','4','5'],
    correct:1
  };

  setMG(
    `${mgState.player}, lovește 3 pucuri și apoi răspunde la întrebare.`,
    '🏒 HOCKEY — Skill + Quiz',
    `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Combo: <span id="hc-count">0</span>/${target}</div>
     <div id="combo-zone" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"></div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  function spawnPuck() {
    const zone = document.getElementById('combo-zone');
    if (!zone) return;
    zone.innerHTML = `<div class="combo-puck pulse-go" onclick="hockeyComboHit()">🏒</div>`;
    schedule(() => {
            const puck = document.querySelector('#combo-zone .combo-puck');
      if (puck) showFeedback(false, '❌ Ai pierdut combo-ul.');
    }, 700);
  }

  window.hockeyComboHit = function() {
    hits++;
    const count = document.getElementById('hc-count');
    if (count) count.textContent = hits;
    const zone = document.getElementById('combo-zone');
    if (zone) zone.innerHTML = '';
    if (hits >= target) {
      launchFollowupQuiz({
        stageText: '🏒 Combo reușit! Urmează întrebarea.',
        quizTitle: '🏒 HOCKEY — Quiz',
        question: q.q,
        answers: q.a,
        correctIndex: q.correct,
        successText: `🏒 Corect! +${cell.pts} pts!`
      });
    } else {
      schedule(spawnPuck, 200);
          }
  };

  schedule(spawnPuck, 250);
}

function setupHockeyVsAI(cell, diff) {
  const neededByDiff = { easy: 3, medium: 4, hard: 6 };
  const target = neededByDiff[diff];
  const aiScore = diff === 'easy'
    ? Math.floor(Math.random() * 3) + 1
    : diff === 'medium'
      ? Math.floor(Math.random() * 4) + 2
      : Math.floor(Math.random() * 4) + 4;
  let playerHits = 0;

  setMG(
    `${mgState.player}, fă ${target} hit-uri. AI are un scor simulat în paralel.`,
    `🏒 HOCKEY VS AI — ${AI_DIFF_CONFIG[diff].label}`,
    `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Lovituri: <span id="h-ai-player">0</span>/${target}</div>
     <div id="h-ai-zone" style="display:flex;justify-content:center"></div>
     <div class="tiny-note">Dacă termini cu scor mai bun decât AI, câștigi duelul.</div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
  
  function spawnHit() {
    const zone = document.getElementById('h-ai-zone');
    if (!zone) return;
    zone.innerHTML = `<div class="combo-puck pulse-go" onclick="pickHockeyVsAI()">🏒</div>`;
    schedule(() => {
      const puck = document.querySelector('#h-ai-zone .combo-puck');
      if (puck) showFeedback(false, `❌ AI a terminat mai bine (${aiScore}).`);
    }, diff === 'hard' ? 550 : diff === 'medium' ? 700 : 900);
  }

  window.pickHockeyVsAI = function() {
    playerHits++;
    const v = document.getElementById('h-ai-player');
    if (v) v.textContent = playerHits;
    const zone = document.getElementById('h-ai-zone');
    if (zone) zone.innerHTML = '';
    if (playerHits >= target) {
      if (playerHits > aiScore) showFeedback(true, `🏒 Ai bătut AI-ul (${playerHits} vs ${aiScore})! +${cell.pts} pts!`);
      else if (playerHits === aiScore) showFeedback(true, `🤝 Egal cu AI (${playerHits}-${aiScore})`);
      else showFeedback(false, `🤖 AI a fost mai bun (${aiScore} vs ${playerHits})`);
    } else {
      schedule(spawnHit, 180);
    }
  };

  schedule(spawnHit, 200);
}

function setupBreakout(cell) {
  setupSelectorGame(cell, {
    solo: setupBreakoutSolo,
    quiz: setupBreakoutQuiz,
    ai: setupBreakoutVsAI
  });
}

function setupBreakoutSolo(cell) {
  setupBreakoutOrder(cell);
}

function setupBreakoutQuiz(cell) {
  const order = ['🔴','🟠','🟡'];
  let alive = shuffle([...order, '🔵','🟣']);
  let step = 0;
  const q = {
    q:'Care este scopul principal în Breakout?',
    a:['Să colectezi monede','Să spargi toate cărămizile','Să eviți o bombă','Să ajungi la o ieșire'],
    correct:1
  };

  function render() {
    const g = document.getElementById('br-grid');
    if (!g) return;
    g.innerHTML = alive.map((b, i) => `<div class="brick-chip" onclick="breakoutOrderClick(${i})">${b}</div>`).join('');
  }

  window.breakoutOrderClick = function(i) {
    const val = alive[i];
    if (val === order[step]) {
      alive.splice(i, 1);
      step++;
      render();
      if (step >= order.length) {
        launchFollowupQuiz({
          stageText: '🧱 Secvență reușită! Urmează întrebarea.',
          quizTitle: '🧱 BREAKOUT — Quiz',
          question: q.q,
          answers: q.a,
          correctIndex: q.correct,
          successText: `🧱 Corect! +${cell.pts} pts!`
        });
      }
          } else {
      showFeedback(false, '❌ Ai spart cărămida greșită.');
    }
  };

  setMG(
    `${mgState.player}, sparge secvența corectă, apoi răspunde la quiz.`,
    '🧱 BREAKOUT — Skill + Quiz',
    `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Ordinea cerută: ${order.join(' ')}</div>
     <div id="br-grid" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center"></div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  render();
}

function setupBreakoutVsAI(cell, diff) {
  const bricksByDiff = { easy: 3, medium: 4, hard: 5 };
  const target = bricksByDiff[diff];
  const aiBricks = diff === 'easy' ? 2 + Math.floor(Math.random() * 2) : diff === 'medium' ? 3 + Math.floor(Math.random() * 2) : 4 + Math.floor(Math.random() * 2);
  let playerBricks = 0;
  
  setMG(
    `${mgState.player}, distruge ${target} cărămizi mai repede decât AI-ul simulat.`,
    `🧱 BREAKOUT VS AI — ${AI_DIFF_CONFIG[diff].label}`,
    `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Cărămizi distruse: <span id="br-ai-player">0</span>/${target}</div>
     <div id="br-ai-zone" style="display:flex;justify-content:center;flex-wrap:wrap;gap:8px"></div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  function spawnBrick() {
    const zone = document.getElementById('br-ai-zone');
    if (!zone) return;
    zone.innerHTML = `<div class="brick-chip pulse-go" onclick="pickBreakoutVsAI()">🧱</div>`;
    schedule(() => {
      const b = document.querySelector('#br-ai-zone .brick-chip');
      if (b) showFeedback(false, `🤖 AI a terminat primul (${aiBricks}).`);
    }, diff === 'hard' ? 500 : diff === 'medium' ? 700 : 900);
  }

  window.pickBreakoutVsAI = function() {
    playerBricks++;
    const el = document.getElementById('br-ai-player');
    if (el) el.textContent = playerBricks;
        const zone = document.getElementById('br-ai-zone');
    if (zone) zone.innerHTML = '';
    if (playerBricks >= target) {
      if (playerBricks > aiBricks) showFeedback(true, `🧱 Ai învins AI-ul (${playerBricks} vs ${aiBricks})! +${cell.pts} pts!`);
      else if (playerBricks === aiBricks) showFeedback(true, `🤝 Egal cu AI (${playerBricks}-${aiBricks})`);
      else showFeedback(false, `🤖 AI a spart mai multe (${aiBricks} vs ${playerBricks})`);
    } else {
      schedule(spawnBrick, 200);
    }
  };

  schedule(spawnBrick, 200);
}

function setupFusion(cell) {
  setupSelectorGame(cell, {
    solo: setupFusionSolo,
    quiz: setupFusionQuiz,
    ai: setupFusionVsAI
  });
}

function setupFusionSolo(cell) {
  setupFusionTilePower(cell);
}

function setupFusionQuiz(cell) {
  setupFusionTrivia(cell);
}

function setupFusionVsAI(cell, diff) {
  const safeCount = diff === 'easy' ? 2 : diff === 'medium' ? 3 : 4;
  let picked = 0;
  const aiPattern = diff === 'easy' ? 2 : diff === 'medium' ? 3 : 4;

  function renderFusionOrbs() {
    const zone = document.getElementById('fusion-ai-zone');
    if (!zone) return;
    const hazardCount = diff === 'hard' ? 2 : 1;
    const options = shuffle([
      ...Array(4 - hazardCount).fill('✦'),
      ...Array(hazardCount).fill('💀')
          ]).slice(0,4);
    zone.innerHTML = options.map((ico, i) => `<div class="fusion-slot" onclick="pickFusionVsAI(${i})">${ico}</div>`).join('');
  }

  window.pickFusionVsAI = function(i) {
    const zone = document.getElementById('fusion-ai-zone');
    const chosen = zone?.children?.[i]?.textContent || '';
    if (chosen !== '✦') {
      showFeedback(false, '❌ Hazard dimensional. AI a câștigat duelul.');
      return;
    }
    picked++;
    const count = document.getElementById('fusion-ai-count');
    if (count) count.textContent = picked;
    if (picked >= safeCount) {
      if (picked >= aiPattern) showFeedback(true, `🎭 Ai învins AI-ul pe pattern! +${cell.pts} pts!`);
      else showFeedback(false, '🤖 AI a terminat combinația mai bine.');
      return;
    }
    renderFusionOrbs();
  };

  setMG(
    `${mgState.player}, găsește pattern-ul sigur mai bine decât AI.`,
    `🎭 FUSION VS AI — ${AI_DIFF_CONFIG[diff].label}`,
    `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Pattern sigur: <span id="fusion-ai-count">0</span>/${safeCount}</div>
     <div id="fusion-ai-zone" class="fusion-slots"></div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  renderFusionOrbs();
}

function setupPvAI(cell) {
  setupSelectorGame(cell, {
    solo: setupPvAISolo,
    quiz: setupPvAIQuiz,
    ai: setupPvAIVsAI
  });
}

function setupPvAISolo(cell) {
  setupPvAIWeaponChoice(cell);
}
function setupPvAIQuiz(cell) {
  const q = {
    q:'Într-un duel clasic, ce înseamnă “counter”?',
    a:['Atac întâmplător','Răspuns care bate mutarea adversarului','Schimb de hartă','Pauză de joc'],
    correct:1
  };

  const safe = Math.floor(Math.random() * 4);
  const tiles = ['⚡','🛡️','💥','🌀'];

  window.pvaiTilePick = function(i) {
    if (i !== safe) return showFeedback(false, '❌ Bossul a contracarat alegerea ta.');
    launchFollowupQuiz({
      stageText: '⚔️ Ai spart apărarea bossului. Urmează întrebarea.',
      quizTitle: '⚔️ PvAI — Quiz',
      question: q.q,
      answers: q.a,
      correctIndex: q.correct,
      successText: `⚔️ Corect! +${cell.pts} pts!`
    });
  };
    setMG(
    `${mgState.player}, găsește alegerea bună și apoi răspunde la quiz.`,
    '⚔️ PvAI — Skill + Quiz',
    `<div class="tile-duel-grid">
      ${tiles.map((t, i) => `<div class="tile-duel-cell" onclick="pvaiTilePick(${i})">${t}</div>`).join('')}
    </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupPvAIVsAI(cell, diff) {
  const opts = ['🗡️','🛡️','💥'];
  const names = ['Atac','Apărare','Explozie'];
  let ai;

  if (diff === 'easy') ai = Math.floor(Math.random() * 3);
  if (diff === 'medium') ai = Math.random() < 0.5 ? 1 : Math.floor(Math.random() * 3);
  if (diff === 'hard') ai = Math.random() < 0.8 ? 1 : Math.floor(Math.random() * 3);

  const wins = { 0: 2, 2: 1, 1: 0 };

  window.pickPvAIVsAI = function(p) {
        if (p === ai) return showFeedback(false, `🤝 Egal cu AI (${opts[ai]} ${names[ai]})!`, 1000);
    if (wins[p] === ai) return showFeedback(true, `⚔️ Ai bătut AI-ul! ${opts[p]} vs ${opts[ai]}! +${cell.pts}pts!`, 1000);
    return showFeedback(false, `❌ AI a câștigat! ${opts[ai]} ${names[ai]} te-a bătut!`, 1000);
  };

  setMG(
    `${mgState.player}, AI-ul își adaptează counter-ul după dificultate.`,
    `⚔️ PvAI VS AI — ${AI_DIFF_CONFIG[diff].label}`,
    `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      ${opts.map((o, i) => `
        <button class="secondary-btn" onclick="pickPvAIVsAI(${i})" style="font-size:28px;padding:12px 16px">
          ${o}
          <div style="font-size:10px;color:var(--dim);margin-top:4px">${names[i]}</div>
        </button>`).join('')}
    </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupPvAIWeaponChoice(cell) {
  const opts = ['🗡️','🛡️','💥'];
  const names = ['Atac','Apărare','Explozie'];
  const ai = Math.floor(Math.random() * 3);
    const wins = { 0: 2, 2: 1, 1: 0 };

  window.pvaiChoice = function(p) {
    if (p === ai) return showFeedback(false, `🤝 Egal cu AI (${opts[ai]} ${names[ai]})!`, 1000);
    if (wins[p] === ai) return showFeedback(true, `⚔️ Ai bătut Boss-ul! ${opts[p]} vs ${opts[ai]}! +${cell.pts}pts!`, 1000);
    return showFeedback(false, `❌ Boss-ul a câștigat! ${opts[ai]} ${names[ai]} te-a bătut!`, 1000);
  };

  setMG(
    `${mgState.player}, alege: Atac bate Explozie, Explozie bate Apărare, Apărare bate Atac.`,
    '⚔️ PvAI BOSS — Alege tactica',
    `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      ${opts.map((o, i) => `
        <button class="secondary-btn" onclick="pvaiChoice(${i})" style="font-size:28px;padding:12px 16px">
          ${o}
          <div style="font-size:10px;color:var(--dim);margin-top:4px">${names[i]}</div>
        </button>`).join('')}
    </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}
function setupFusionTilePower(cell) {
  const correct = Math.floor(Math.random() * 4);
  const icons = ['⚡','🧊','🔥','🌀'];
  const names = ['Dash', 'Freeze', 'Burst', 'Warp'];

  window.fusionTilePick = function(i) {
    if (i === correct) showFeedback(true, `🎭 Puterea corectă activată! +${cell.pts} pts!`);
    else showFeedback(false, `❌ Puterea ${names[i]} nu se potrivește.`);
  };

  setMG(
    `${mgState.player}, fiecare căsuță ascunde o putere. Alege abilitatea potrivită pentru portal.`,
    '🎭 FUSION+ — Tile Power',
    `<div style="font-size:12px;color:var(--dim);margin-bottom:10px">Portalul cere o singură putere compatibilă.</div>
     <div class="fusion-slots">
       ${icons.map((ico, i) => `<div class="fusion-slot" onclick="fusionTilePick(${i})">${ico}<div style="font-size:11px;color:var(--dim);margin-top:6px">${names[i]}</div></div>`).join('')}
     </div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );
}

function setupBreakoutOrder(cell) {
  const order = ['🔴','🟠','🟡','🟢'];
  let alive = shuffle([...order, '🔵','🟣']);
  let step = 0;

  function render() {
    const g = document.getElementById('br-grid');
    if (!g) return;
    g.innerHTML = alive.map((b, i) => `<div class="brick-chip" onclick="breakoutOrderClick(${i})">${b}</div>`).join('');
    document.getElementById('br-order').textContent = order.slice(step).join(' ');
  }

  window.breakoutOrderClick = function(i) {
    const val = alive[i];
    if (val === order[step]) {
      alive.splice(i, 1);
      step++;
      render();
      if (step >= order.length) showFeedback(true, `🧱 Ordine perfectă! +${cell.pts} pts!`);
    } else {
      showFeedback(false, '❌ Ai spart cărămida greșită.');
    }
  };
  function setupBreakoutOrder(cell) {
  const order = ['🔴','🟠','🟡','🟢'];
  let alive = shuffle([...order, '🔵','🟣']);
  let step = 0;

  function render() {
    const g = document.getElementById('br-grid');
    if (!g) return;
    g.innerHTML = alive.map((b, i) => `<div class="brick-chip" onclick="breakoutOrderClick(${i})">${b}</div>`).join('');
    document.getElementById('br-order').textContent = order.slice(step).join(' ');
  }

  window.breakoutOrderClick = function(i) {
    const val = alive[i];
    if (val === order[step]) {
      alive.splice(i, 1);
      step++;
      render();
      if (step >= order.length) showFeedback(true, `🧱 Ordine perfectă! +${cell.pts} pts!`);
    } else {
      showFeedback(false, '❌ Ai spart cărămida greșită.');
    }
  };
      function renderFusionOrbs() {
    const zone = document.getElementById('fusion-orb-zone');
    if (!zone) return;
    const options = shuffle(['✦','✦','✦','💀']);
    zone.innerHTML = options.map((ico, i) => `
      <div class="fusion-slot" onclick="fusionTilePick(${i})">${ico}<div style="font-size:11px;color:var(--dim);margin-top:6px">${ico === '✦' ? 'Orb' : 'Hazard'}</div></div>
    `).join('');
  }

  window.fusionTilePick = function(i) {
    const zone = document.getElementById('fusion-orb-zone');
    const nodes = zone ? Array.from(zone.children) : [];
    if (!nodes.length) return;
    const chosen = nodes[i]?.textContent || '';
    if (!chosen.includes('✦')) {
      showFeedback(false, '❌ Ai atins hazardul dimensional.');
      return;
    }
    picked++;
    const count = document.getElementById('fusion-pick-count');
    if (count) count.textContent = picked;
    if (picked >= target) {
      launchFollowupQuiz({
                stageText: '🎭 Ai strâns suficiente orbs! Urmează întrebarea.',
        quizTitle: '🎭 ARCADE FUSION — Trivia',
        question: qu.q,
        answers: qu.a,
        correctIndex: qu.correct,
        successText: `🎭 Corect! +${cell.pts} pts!`
      });
      return;
    }
    renderFusionOrbs();
  };

  setMG(
    `${mgState.player}, strânge 3 orbs sigure, apoi răspunde la întrebare.`,
    '🎭 FUSION — Joacă apoi răspunde',
    `<div style="font-size:12px;color:var(--dim);margin-bottom:8px">Orbs colectate: <span id="fusion-pick-count">0</span>/${target}</div>
     <div id="fusion-orb-zone" class="fusion-slots"></div>
     <div class="tiny-note">Evită hazardul și adună 3 orburi ca să deblochezi întrebarea.</div>`,
    `<button class="btn-skip" onclick="closeMG(false)">Abandonează</button>`
  );

  renderFusionOrbs();
}
  function setupGeneric(cell) {
  setMG(
    `${mgState.player} a aterizat pe câmpul ${cell.name}.`,
    '🎮 MINI-JOC',
    `<div style="font-size:13px;color:var(--dim)">Inspirat din: ${cell.desc}</div>`,
    `<button class="btn-win" onclick="closeMG(true)">+${cell.pts} Câștig</button>
     <button class="btn-lose" onclick="closeMG(false)">Pierd</button>`
  );
}

window.addEventListener('keydown', (e) => {
  if (document.getElementById('overlay').classList.contains('hidden')) return;

  if (e.key === 'Escape') {
    closeMG(false);
    return;
  }

  if (window.mazeMove) {
    if (e.key === 'ArrowUp') mazeMove(0, -1);
    if (e.key === 'ArrowDown') mazeMove(0, 1);
    if (e.key === 'ArrowLeft') mazeMove(-1, 0);
    if (e.key === 'ArrowRight') mazeMove(1, 0);
  }
   function setupGeneric(cell) {
  setMG(
    `${mgState.player} a aterizat pe câmpul ${cell.name}.`,
    '🎮 MINI-JOC',
    `<div style="font-size:13px;color:var(--dim)">Inspirat din: ${cell.desc}</div>`,
    `<button class="btn-win" onclick="closeMG(true)">+${cell.pts} Câștig</button>
     <button class="btn-lose" onclick="closeMG(false)">Pierd</button>`
  );
}

window.addEventListener('keydown', (e) => {
  if (document.getElementById('overlay').classList.contains('hidden')) return;

  if (e.key === 'Escape') {
    closeMG(false);
    return;
  }

  if (window.mazeMove) {
    if (e.key === 'ArrowUp') mazeMove(0, -1);
    if (e.key === 'ArrowDown') mazeMove(0, 1);
