# HUD Dashboard Empty-Space Fill

The current desktop play HUD can leave a large empty area under the dice/status cards. Use that space as a functional dashboard instead of leaving it blank.

## Implemented Files

- `src/ui/hudDashboard.js` — builds the dashboard model from game state.
- `src/ui/renderHudDashboard.js` — renders dashboard cards into a container.
- `src/ui/hudDashboard.css` — production-ready styles for the dashboard cards.

## Recommended Layout

```text
┌───────────────────────────────┬───────────────────────────────┐
│ Misiune activă                │ Clasament jucători            │
│ Pizza Game 0/1                │ P1, P2, P3, P4                │
├───────────────────────────────┼───────────────────────────────┤
│ Tile curent / următor         │ Inventar activ                │
│ START → PIZZA GAME            │ Shield, Reroll, x2            │
├───────────────────────────────┴───────────────────────────────┤
│ Timeline tură: Roll → Move → Land → Reward → Next player       │
├───────────────────────────────────────────────────────────────┤
│ Acțiuni rapide: Roll, Bonus, Shop, Stats                       │
└───────────────────────────────────────────────────────────────┘
```

## Sections

### 1. Misiune activă

Show active quest progress with a bar:

```text
🍕 Pizza Game
0/1 completează PIZZA GAME sau PIZZA DELUXE
Reward: +75 coins, +50 XP
```

### 2. Clasament jucători

Show all active players sorted by score:

```text
1. P2 · 150 coins · 20 XP
2. P1 · 100 coins · 10 XP
```

### 3. Tile curent / următor

Show what happened and what to aim for next:

```text
Curent: START
Următor target: PIZZA GAME
```

### 4. Inventar activ

Show current player's usable items and empty-state text:

```text
Shield · Reroll · x2
```

### 5. Timeline tură

Show the last 5 events:

```text
Roll 3 → Move → Land START → Bonus available → P2 next
```

### 6. Acțiuni rapide

Duplicate the most important actions inside the empty region on large screens:

- Aruncă zarul
- Bonus
- Shop
- Stats

## Responsive Rules

Use `getEmptySpaceFillRecommendations` from `src/ui/hudDashboard.js`:

- small screens: quest, standings, quick actions;
- medium screens: quest, standings, inventory, timeline;
- large screens: all dashboard sections.

## Integration for `index.html`

Add the stylesheet in `<head>` when the project starts loading external CSS:

```html
<link rel="stylesheet" href="src/ui/hudDashboard.css" />
```

Add a dashboard container below the current three status cards:

```html
<section id="hudDashboard" class="hud-dashboard" aria-label="Game dashboard"></section>
```

Add the renderer import when the project starts loading ES modules:

```js
import { renderHudDashboard } from './src/ui/renderHudDashboard.js';
```

Call it after each state update:

```js
renderHudDashboard(document.querySelector('#hudDashboard'), {
  players: state.players,
  currentPlayerIndex: state.currentPlayer,
  activeQuest: state.activeQuest,
  currentTile: state.currentTile,
  nextTile: state.nextTile,
  timeline: state.timeline,
  bonusTurns: state.bonusTurns,
  canRoll: !state.busy,
});
```

The dashboard should update after dice roll, movement, tile resolution, mini-game completion, shop purchase, and next-player transitions.

## Inline Integration Fallback

If `index.html` remains fully inline, copy the CSS from `src/ui/hudDashboard.css` into the existing `<style>` block and copy the renderer logic from `src/ui/renderHudDashboard.js` into the existing `<script>` block. Keep the same `#hudDashboard` container.
