# How to Add a Mini-game

Use this checklist when adding a new Arcade World mini-game.

## 1. Define the Game Metadata

Add the game to `src/data/miniGameRegistry.js`:

```js
newgame: {
  id: 'newgame',
  title: 'New Game',
  category: 'arcade',
  modes: [MINI_GAME_MODES.SOLO, MINI_GAME_MODES.AI, MINI_GAME_MODES.PVP],
  iframeUrl: null,
  hasLocalFallback: true,
  scoring: 'higher-is-better',
}
```

Keep IDs lowercase, stable, and URL-safe. Save files, stats, achievements, and analytics may reference these IDs.

## 2. Choose Supported Modes

Supported modes are:

- `solo`
- `ai`
- `pvp`
- `quiz`
- `full`

Only list modes that are actually playable.

## 3. Add a Local Fallback

Every iframe mini-game should ideally have a local fallback. If an external game fails to load, Arcade World should remain playable.

Recommended fallback behavior:

```text
Mini-game unavailable. Launching local fallback...
```

## 4. Review iframe Safety

If the mini-game is hosted externally:

- add the origin to `ALLOWED_IFRAME_ORIGINS` only after review;
- use a narrow `postMessage` payload;
- avoid `targetOrigin: '*'`;
- add sandbox attributes to the iframe;
- document the source in `docs/iframe-bridge.md`.

## 5. Define Scoring

Use a clear scoring type:

- `higher-is-better`
- `lower-time-is-better`
- `lower-moves-is-better`
- `winner-takes-tile`
- `win-draw-loss`

## 6. Add Tests

Add or update tests for:

- registry validation;
- supported modes;
- scoring edge cases;
- iframe message parsing if the game uses external hosting;
- reward calculation if the game has custom rewards.

## 7. Update Documentation

Update README if the game changes the headline feature count. Add screenshots if the game has a new visual style.
