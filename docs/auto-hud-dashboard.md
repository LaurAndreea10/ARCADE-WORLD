# Auto HUD Dashboard Wiring

`src/ui/autoHudDashboard.js` is a safe bridge between the current single-file `index.html` game and the modular HUD dashboard renderer.

## What It Does

When loaded, it:

1. injects `src/ui/hudDashboard.css` if it is not already loaded;
2. finds a suitable HUD target;
3. creates `<section id="hudDashboard">`;
4. infers a lightweight dashboard state from the current page text;
5. renders the dashboard every second.

This lets the empty desktop HUD space be filled without rewriting the large inline game immediately.

## One-Line Integration

Add this before `</body>` in `index.html`:

```html
<script type="module" src="./src/ui/autoHudDashboard.js"></script>
```

## Preferred Target

For best placement, add this attribute to the HUD wrapper that should contain the dashboard:

```html
<div class="your-existing-hud-wrapper" data-hud-dashboard-target>
  ...
</div>
```

If that attribute is missing, the module tries these targets in order:

- `.desktop-hud`
- `.desktopHUD`
- `#desktopHud`
- `#desktopHUD`
- `.play-hud`
- `.screen`
- `.center-panel`
- `.center-screen`
- `document.body`

## Disable Auto Boot

For debugging or tests:

```html
<script>
  window.__ARCADE_WORLD_DISABLE_AUTO_HUD__ = true;
</script>
```

Then mount manually:

```js
import { bootAutoHudDashboard } from './src/ui/autoHudDashboard.js';

bootAutoHudDashboard({
  intervalMs: 0,
  getState: () => window.gameState,
});
```

## Future Upgrade

Once `index.html` is partially modularized, replace the inferred state with real state:

```js
bootAutoHudDashboard({
  getState: () => ({
    players: state.players,
    currentPlayerIndex: state.currentPlayer,
    activeQuest: state.activeQuest,
    currentTile: state.currentTile,
    nextTile: state.nextTile,
    timeline: state.timeline,
    bonusTurns: state.bonusTurns,
    canRoll: !state.busy,
  }),
});
```
