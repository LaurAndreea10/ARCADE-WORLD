import { renderHudDashboard } from './renderHudDashboard.js';

const DASHBOARD_ID = 'hudDashboard';
const CSS_HREF = './src/ui/hudDashboard.css';

export function bootAutoHudDashboard(options = {}) {
  ensureDashboardStyles(options.cssHref ?? CSS_HREF);

  const container = ensureDashboardContainer(options.root ?? document);

  if (!container) {
    return { mounted: false, reason: 'No suitable HUD target found.' };
  }

  const getState = options.getState ?? inferDashboardState;
  const render = () => renderHudDashboard(container, getState());

  render();

  const interval = options.intervalMs === 0 ? null : window.setInterval(render, options.intervalMs ?? 1000);

  return {
    mounted: true,
    container,
    render,
    destroy() {
      if (interval) window.clearInterval(interval);
      container.remove();
    },
  };
}

export function ensureDashboardStyles(href = CSS_HREF) {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.append(link);
}

export function ensureDashboardContainer(root = document) {
  const existing = root.querySelector?.(`#${DASHBOARD_ID}`);
  if (existing) return existing;

  const target = findDashboardTarget(root);
  if (!target) return null;

  const container = document.createElement('section');
  container.id = DASHBOARD_ID;
  container.className = 'hud-dashboard';
  container.setAttribute('aria-label', 'Game dashboard');

  target.append(container);
  return container;
}

export function findDashboardTarget(root = document) {
  const selectors = [
    '[data-hud-dashboard-target]',
    '.desktop-hud',
    '.desktopHUD',
    '#desktopHud',
    '#desktopHUD',
    '.play-hud',
    '.screen',
    '.center-panel',
    '.center-screen',
  ];

  for (const selector of selectors) {
    const match = root.querySelector?.(selector);
    if (match) return match;
  }

  return root.body ?? null;
}

export function inferDashboardState(root = document) {
  const text = root.body?.innerText ?? '';
  const players = inferPlayers(text);
  const currentPlayerIndex = inferCurrentPlayerIndex(text, players);
  const bonusTurns = inferNumberAfter(text, /Bonus\s*\((\d+)\)/i, 0);
  const rollValue = inferNumberAfter(text, /Roll:\s*(\d+)/i, null);

  return {
    players,
    currentPlayerIndex,
    activeQuest: inferQuest(text),
    currentTile: inferCurrentTile(text),
    nextTile: inferNextTile(text),
    inventory: [],
    timeline: buildInferredTimeline({ rollValue, text }),
    bonusTurns,
    canRoll: /Aruncă zarul/i.test(text),
  };
}

function inferPlayers(text) {
  const matches = [...text.matchAll(/\bP([1-4])\b/g)];
  const ids = [...new Set(matches.map((match) => Number(match[1])))]
    .filter((id) => id >= 1 && id <= 4)
    .sort((a, b) => a - b);

  const normalizedIds = ids.length >= 2 ? ids : [1, 2];

  return normalizedIds.map((id) => ({
    id: `p${id}`,
    name: `P${id}`,
    coins: 0,
    xp: 0,
    elo: 1000,
    inventory: [],
  }));
}

function inferCurrentPlayerIndex(text, players) {
  const activeMatch = text.match(/JUCĂTOR LA START\s+P([1-4])/i) ?? text.match(/\bP([1-4])\s*·\s*Roll/i);
  if (!activeMatch) return 0;

  const activeId = `p${activeMatch[1]}`;
  const index = players.findIndex((player) => player.id === activeId);
  return index >= 0 ? index : 0;
}

function inferQuest(text) {
  const pizzaQuest = /PIZZA GAME/i.test(text)
    ? {
        title: '🍕 Pizza Game',
        description: 'Completează PIZZA GAME sau PIZZA DELUXE pentru reward.',
        current: 0,
        target: 1,
      }
    : null;

  return pizzaQuest ?? {
    title: 'Obiectiv rapid',
    description: 'Finalizează obiectivul curent pentru reward extra.',
    current: 0,
    target: 1,
  };
}

function inferCurrentTile(text) {
  const match = text.match(/JUCĂTOR LA START/i);
  return { name: match ? 'START' : 'Tile curent' };
}

function inferNextTile(text) {
  if (/PIZZA GAME/i.test(text)) return { name: 'PIZZA GAME' };
  return { name: 'BONUS / START' };
}

function buildInferredTimeline({ rollValue, text }) {
  const events = [];

  if (rollValue !== null) events.push({ type: 'roll', value: rollValue });
  if (/JUCĂTOR LA START/i.test(text)) events.push({ type: 'land', tileName: 'START' });
  if (/Bonus\s*\(/i.test(text)) events.push({ label: 'Bonus disponibil' });
  if (/URMĂTORUL LA RÂND\s+P([1-4])/i.test(text)) {
    const next = text.match(/URMĂTORUL LA RÂND\s+P([1-4])/i)?.[1];
    events.push({ label: `P${next} urmează` });
  }

  return events;
}

function inferNumberAfter(text, pattern, fallback) {
  const match = text.match(pattern);
  return match ? Number(match[1]) : fallback;
}

if (typeof window !== 'undefined' && !window.__ARCADE_WORLD_DISABLE_AUTO_HUD__) {
  window.__ARCADE_WORLD_AUTO_HUD__ = bootAutoHudDashboard();
}
