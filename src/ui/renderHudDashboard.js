import { buildHudDashboardModel } from './hudDashboard.js';

export function renderHudDashboard(container, state) {
  if (!container) {
    return;
  }

  const model = buildHudDashboardModel(state);
  container.classList.add('hud-dashboard');
  container.innerHTML = [
    renderQuestCard(model),
    renderStandingsCard(model),
    renderTilePreviewCard(model),
    renderInventoryCard(model),
    renderTimelineCard(model),
    renderQuickActionsCard(model),
  ].join('');
}

function renderQuestCard(model) {
  const quest = model.activeQuest ?? { title: 'Fără misiune activă', current: 0, target: 1 };
  const current = Number(quest.current ?? 0);
  const target = Math.max(1, Number(quest.target ?? 1));
  const percent = Math.min(100, Math.round((current / target) * 100));

  return cardMarkup({
    id: 'quest-progress',
    title: 'Misiune activă',
    body: `
      <div class="hud-dashboard-main">${escapeHtml(quest.title ?? 'Misiune')}</div>
      <div class="hud-dashboard-muted">${current}/${target} progres</div>
      <div class="hud-dashboard-bar" aria-label="Quest progress"><span style="width:${percent}%"></span></div>
      <div class="hud-dashboard-muted">${escapeHtml(quest.description ?? 'Finalizează obiectivul pentru reward.')}</div>
    `,
  });
}

function renderStandingsCard(model) {
  const rows = model.standings
    .map(
      (player, index) => `
        <li>
          <span>${index + 1}. ${escapeHtml(player.name ?? player.id)}</span>
          <strong>${player.coins}c · ${player.xp}XP</strong>
        </li>
      `,
    )
    .join('');

  return cardMarkup({
    id: 'player-standings',
    title: 'Clasament jucători',
    body: `<ol class="hud-dashboard-list">${rows || '<li>Nu există jucători.</li>'}</ol>`,
  });
}

function renderTilePreviewCard(model) {
  const current = model.tilePreview.current;
  const next = model.tilePreview.next;

  return cardMarkup({
    id: 'tile-preview',
    title: 'Tile curent / următor',
    body: `
      <div class="hud-dashboard-main">${escapeHtml(current?.name ?? 'START')}</div>
      <div class="hud-dashboard-muted">Următor target: ${escapeHtml(next?.name ?? 'PIZZA GAME')}</div>
    `,
  });
}

function renderInventoryCard(model) {
  const inventory = model.inventory.length
    ? model.inventory.map((item) => `<span class="hud-dashboard-chip">${escapeHtml(String(item))}</span>`).join('')
    : '<span class="hud-dashboard-muted">Inventarul este gol.</span>';

  return cardMarkup({
    id: 'inventory',
    title: 'Inventar activ',
    body: `<div class="hud-dashboard-chips">${inventory}</div>`,
  });
}

function renderTimelineCard(model) {
  const events = model.timeline
    .map((event) => `<li>${escapeHtml(formatTimelineEvent(event))}</li>`)
    .join('');

  return cardMarkup({
    id: 'turn-timeline',
    title: 'Timeline tură',
    wide: true,
    body: `<ul class="hud-dashboard-timeline">${events || '<li>Aruncă zarul pentru a începe timeline-ul.</li>'}</ul>`,
  });
}

function renderQuickActionsCard(model) {
  const buttons = model.quickActions
    .map(
      (action) => `
        <button class="hud-dashboard-action" data-hud-action="${escapeHtml(action.id)}" ${action.enabled ? '' : 'disabled'}>
          ${escapeHtml(action.label)}
        </button>
      `,
    )
    .join('');

  return cardMarkup({
    id: 'quick-actions',
    title: 'Acțiuni rapide',
    wide: true,
    body: `<div class="hud-dashboard-actions">${buttons}</div>`,
  });
}

function cardMarkup({ id, title, body, wide = false }) {
  return `
    <article class="hud-dashboard-card ${wide ? 'wide' : ''}" data-section="${escapeHtml(id)}">
      <div class="hud-dashboard-kicker">${escapeHtml(title)}</div>
      ${body}
    </article>
  `;
}

function formatTimelineEvent(event) {
  if (typeof event === 'string') return event;
  if (!event || typeof event !== 'object') return 'Eveniment joc';

  if (event.label) return event.label;
  if (event.type === 'roll') return `Roll ${event.value ?? ''}`.trim();
  if (event.type === 'move') return `Move ${event.steps ?? ''}`.trim();
  if (event.type === 'land') return `Land ${event.tileName ?? 'tile'}`;
  if (event.type === 'reward') return `Reward ${event.coins ?? 0} coins`;

  return event.type ?? 'Eveniment joc';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
