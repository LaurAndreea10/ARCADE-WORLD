import { boardTiles, campaignChapters, releaseChecklist } from './data/content.js';

const saveKey = 'arcade-world-v23-save';
const state = {
  sessionMode: 'solo',
  playerCount: 1,
  turn: 1,
  currentPlayer: 0,
  players: [],
  tiles: structuredClone(boardTiles),
  meta: { coins: 0, xp: 0 },
  analytics: { plays: 0, wins: 0, bossWins: 0, territoryOwned: 0 },
};

const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

function buildPlayerForm() {
  const host = qs('#players-form');
  const count = state.sessionMode === 'solo' ? 1 : state.sessionMode === 'vsAi' ? 2 : state.playerCount;
  host.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const isAi = state.sessionMode === 'vsAi' && i === 1;
    const row = document.createElement('div');
    row.className = 'card';
    row.innerHTML = `
      <label>Nume jucător ${i + 1}<input data-name="${i}" value="${isAi ? 'AI Nova' : `Player ${i + 1}`}" ${isAi ? 'disabled' : ''}></label>
      <label>Culoare token<input data-color="${i}" type="color" value="${['#60a5fa','#f472b6','#facc15','#22c55e'][i] || '#ffffff'}"></label>
    `;
    host.appendChild(row);
  }
}

function renderBoard() {
  const board = qs('#board');
  board.innerHTML = '';
  state.tiles.forEach((tile, index) => {
    const el = document.createElement('button');
    el.className = `tile ${tile.type === 'special' ? 'special' : ''} ${tile.boss ? 'boss' : ''}`;
    const tokens = state.players
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => p.position === index)
      .map(({ p }) => `<span class="token" title="${p.name}" style="background:${p.color}"></span>`)
      .join('');
    el.innerHTML = `<strong>${tile.name}</strong><small>${tile.family}</small><div class="token-row">${tokens}</div>`;
    el.addEventListener('click', () => inspectTile(index));
    board.appendChild(el);
  });
}

function inspectTile(index) {
  const tile = state.tiles[index];
  const current = state.players[state.currentPlayer];
  const ownerText = tile.owner != null ? `Owned by ${state.players[tile.owner]?.name || 'n/a'}` : 'Unowned';
  const action = tile.boss ? 'Boss fight' : tile.type === 'special' ? 'Special event' : 'Capture tile';
  alert(`${tile.name}
${ownerText}
${action}
Reward: +${tile.reward.coins} coins / +${tile.reward.xp} XP`);
  if (tile.type === 'normal' && tile.owner == null) {
    tile.owner = state.currentPlayer;
    state.analytics.territoryOwned = state.tiles.filter(t => t.owner === state.currentPlayer).length;
  }
  if (tile.boss) state.analytics.bossWins += 1;
  state.meta.coins += tile.reward.coins;
  state.meta.xp += tile.reward.xp;
  state.analytics.plays += 1;
  updateHud();
  renderBoard();
  persist();
}

function updateHud() {
  qs('#hud-mode').textContent = state.sessionMode;
  qs('#hud-turn').textContent = `#${state.turn}`;
  qs('#hud-player').textContent = state.players[state.currentPlayer]?.name || '—';
  qs('#hud-coins').textContent = state.meta.coins;
  qs('#hud-xp').textContent = state.meta.xp;
  qs('#campaign-view').innerHTML = campaignChapters.map(c => `<p><strong>${c.title}</strong> — ${c.goal}</p>`).join('');
  qs('#analytics-view').innerHTML = `
    <p>Plays: <strong>${state.analytics.plays}</strong></p>
    <p>Boss wins: <strong>${state.analytics.bossWins}</strong></p>
    <p>Territory owned: <strong>${state.analytics.territoryOwned}</strong></p>
  `;
  qs('#release-view').innerHTML = `<ul>${releaseChecklist.map(i => `<li>${i}</li>`).join('')}</ul>`;
}

function startSession() {
  const count = state.sessionMode === 'solo' ? 1 : state.sessionMode === 'vsAi' ? 2 : state.playerCount;
  state.players = Array.from({ length: count }, (_, i) => ({
    name: qs(`[data-name="${i}"]`)?.value?.trim() || `Player ${i + 1}`,
    color: qs(`[data-color="${i}"]`)?.value || '#ffffff',
    position: 0,
    elo: 1000,
  }));
  state.currentPlayer = 0;
  state.turn = 1;
  updateHud();
  renderBoard();
  persist();
}

function randomizePositions() {
  state.players.forEach(p => p.position = Math.floor(Math.random() * state.tiles.length));
  renderBoard();
}

function persist() { localStorage.setItem(saveKey, JSON.stringify(state)); }
function restore() {
  const raw = localStorage.getItem(saveKey);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    Object.assign(state, saved);
  } catch {}
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'arcade-world-v23-save.json';
  a.click();
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      Object.assign(state, parsed);
      renderAll();
      persist();
    } catch {
      alert('Save invalid');
    }
  };
  reader.readAsText(file);
}

function openBridgeDemo() {
  const frame = qs('#bridge-frame');
  const html = `<!doctype html><html><body style="background:#101828;color:#fff;font-family:sans-serif"><h3>Bridge Demo</h3><p>Acest frame simulează un full game extern.</p><button onclick="parent.postMessage({type:'arcade-world-result',result:'finish',score:120},'*')">Send finish</button><button onclick="parent.postMessage({type:'arcade-world-result',result:'win',score:220},'*')">Send win</button></body></html>`;
  frame.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
}

function wire() {
  qs('#session-mode').addEventListener('change', (e) => {
    state.sessionMode = e.target.value;
    qs('#player-count').disabled = state.sessionMode !== 'pvp';
    buildPlayerForm();
  });
  qs('#player-count').addEventListener('change', (e) => {
    state.playerCount = Number(e.target.value);
    buildPlayerForm();
  });
  qs('#btn-start').addEventListener('click', startSession);
  qs('#btn-randomize').addEventListener('click', randomizePositions);
  qs('#btn-help').addEventListener('click', () => qs('#help-dialog').showModal());
  qs('#btn-export').addEventListener('click', exportSave);
  qs('#btn-import').addEventListener('click', () => qs('#import-file').click());
  qs('#import-file').addEventListener('change', (e) => e.target.files?.[0] && importSave(e.target.files[0]));
  qs('#btn-open-bridge').addEventListener('click', openBridgeDemo);
  qs('#btn-sim-finish').addEventListener('click', () => window.postMessage({ type: 'arcade-world-result', result: 'finish', score: 150 }, '*'));
  qs('#btn-sim-win').addEventListener('click', () => window.postMessage({ type: 'arcade-world-result', result: 'win', score: 260 }, '*'));
  qsa('[data-panel]').forEach(btn => btn.addEventListener('click', () => alert(`Open panel: ${btn.dataset.panel}`)));
  window.addEventListener('message', (event) => {
    const d = event.data || {};
    if (d.type !== 'arcade-world-result') return;
    const gain = d.result === 'win' ? { coins: 80, xp: 70 } : { coins: 40, xp: 30 };
    state.meta.coins += gain.coins;
    state.meta.xp += gain.xp;
    state.analytics.wins += d.result === 'win' ? 1 : 0;
    updateHud();
    persist();
    alert(`Bridge result: ${d.result} · score ${d.score || 0}`);
  });
}

function renderAll() {
  qs('#session-mode').value = state.sessionMode;
  qs('#player-count').value = String(state.playerCount);
  qs('#player-count').disabled = state.sessionMode !== 'pvp';
  buildPlayerForm();
  if (state.players?.length) {
    state.players.forEach((p, i) => {
      const name = qs(`[data-name="${i}"]`); const color = qs(`[data-color="${i}"]`);
      if (name) name.value = p.name;
      if (color) color.value = p.color;
    });
  }
  updateHud();
  renderBoard();
}

restore();
wire();
renderAll();
