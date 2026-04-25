# Contributing to Arcade World

Thanks for helping improve Arcade World. This guide explains how to run the project, add content safely, and keep the game maintainable.

## Local Setup

```bash
git clone https://github.com/LaurAndreea10/ARCADE-WORLD.git
cd ARCADE-WORLD
npm install
npm run dev
```

The production game can still be opened directly from `index.html`, but the npm scripts provide a better development workflow.

## Quality Commands

Run these before opening a pull request:

```bash
npm run format:check
npm run lint
npm test
```

Use this to auto-format files:

```bash
npm run format
```

## Project Direction

Arcade World is being migrated from a single-file static game to a modular architecture. Keep changes small and safe:

1. Extract pure logic before DOM-heavy code.
2. Add tests for extracted helpers.
3. Keep `index.html` playable during every migration step.
4. Document new systems in `docs/`.
5. Avoid adding runtime dependencies unless they solve a clear problem.

## How to Add a Mini-game

1. Add metadata to `src/data/miniGameRegistry.js`.
2. Document the game in `docs/add-mini-game.md`.
3. Add a local fallback or mark why one is not available yet.
4. If using an iframe, add the trusted origin to `ALLOWED_IFRAME_ORIGINS` only after reviewing the host.
5. Add tests for registry validation or scoring rules.

## How to Add a Board Tile

1. Add tile metadata to the target data module once tiles are extracted.
2. Keep tile IDs stable; saves may reference them.
3. Add a display name, category, icon, unlock rule, and reward rule.
4. Update docs if the tile introduces a new system.
5. Add a save migration if old saves need a default value.

## How to Add Tests

Place unit tests in `tests/`. Prefer pure helpers that do not require DOM setup.

Good candidates:

- dice and movement rules;
- shop purchases;
- quest progress;
- reward calculations;
- save migrations;
- iframe message validation;
- settings normalization.

## Pull Request Checklist

- [ ] The game still loads from `index.html`.
- [ ] `npm run format:check` passes.
- [ ] `npm run lint` passes.
- [ ] `npm test` passes.
- [ ] README or docs are updated when behavior changes.
- [ ] New external iframe origins are documented and reviewed.
