# Arcade World Architecture

Arcade World is currently shipped as a static browser game and remains playable without a build step. The long-term architecture goal is to keep that deployment simplicity while extracting stable gameplay logic into reusable, testable modules.

## Runtime Flow

```text
Player Input
  ↓
Turn Engine
  ↓
Dice Roll → Board Movement → Tile Resolution
  ↓
Mini-game Engine / iframe Bridge
  ↓
Rewards, XP, ELO, Shop, Quests
  ↓
Save System
  ↓
UI Render + Audio + Particles
```

## Target Folder Structure

```text
src/
  data/
    tiles.js
    quests.js
    shop.js
  game/
    constants.js
    dice.js
    movement.js
    economy.js
    elo.js
    saveSchema.js
  integration/
    iframeBridge.js
  minigames/
    basket.js
    memory.js
    maze.js
  ui/
    renderBoard.js
    modals.js
    mobile.js
  utils/
    storage.js
    audio.js
```

## Current Migration Strategy

The existing `index.html` remains the playable production entry point. New code should be extracted in small, safe steps:

1. Move pure logic first: dice, board movement, economy, ELO, save validation.
2. Add tests for each extracted helper before wiring it back into the UI.
3. Extract data tables after logic is stable.
4. Extract rendering and DOM updates last because they are most likely to affect gameplay.
5. Keep GitHub Pages deployment static throughout the migration.

## Core Systems

### Turn Engine

The turn loop is modeled as:

```text
roll → move → resolve tile → play mini-game/event → apply reward → save → next player
```

The helper modules in `src/game/` isolate the most important pieces of this loop so they can be tested independently from the DOM.

### Board State

Board positions should always use zero-based tile indexes. Movement helpers normalize indexes so wrapping around the 24-tile board is deterministic.

### Economy

Economy helpers should treat player objects as immutable values. A purchase or reward returns a new player snapshot rather than mutating the original object.

### Save System

All exported saves should use a versioned envelope:

```json
{
  "schemaVersion": 1,
  "savedAt": "2026-04-25T00:00:00.000Z",
  "state": {}
}
```

This makes future migrations safer when the shape of player, quest, or board data changes.

### iframe Bridge

External mini-games must communicate with the board through a narrow `postMessage` contract. The bridge should validate:

- the message origin;
- the message type;
- the score payload;
- whether the iframe failed to load and should fall back to a local mini-game.

## Testing Strategy

Unit tests live in `tests/` and cover pure gameplay logic. Recommended next tests:

- quest completion and reward claims;
- shop inventory edge cases;
- save import failure modes;
- ELO win/loss/draw scenarios;
- iframe timeout fallback behavior;
- reduced-motion mode disabling animation-heavy effects.

## Deployment

GitHub Pages can continue serving `index.html` directly. Vite is included as a local development server and quality tooling layer, not as a required runtime dependency.
