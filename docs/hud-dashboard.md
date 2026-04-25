# HUD Dashboard Empty-Space Fill

The current desktop play HUD can leave a large empty area under the dice/status cards. Use that space as a functional dashboard instead of leaving it blank.

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

## Integration Sketch for `index.html`

Add a dashboard container below the current three status cards:

```html
<section id="hudDashboard" class="hud-dashboard" aria-label="Game dashboard"></section>
```

Recommended CSS:

```css
.hud-dashboard {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.hud-dashboard-card {
  min-height: 120px;
  padding: 16px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(15, 30, 56, .88), rgba(7, 15, 28, .88));
  border: 1px solid rgba(255, 255, 255, .08);
}

.hud-dashboard-card.wide {
  grid-column: 1 / -1;
}
```

Recommended render loop:

```js
const model = buildHudDashboardModel(state);
renderHudDashboard(model);
```

The dashboard should update after dice roll, movement, tile resolution, mini-game completion, shop purchase, and next-player transitions.
