<p align="center">
  <img src="docs/logo.svg" width="120" alt="Arcade World Logo"/>
</p>

<h1 align="center">ARCADE WORLD</h1>

<p align="center">
  <strong>Browser-based board game with 11 embedded mini-games, territory capture, boss fights, and local multiplayer.</strong>
</p>

<p align="center">
  <a href="https://laurandreea10.github.io/ARCADE-WORLD/">
    <img src="https://img.shields.io/badge/▶_PLAY_LIVE-6ee7ff?style=for-the-badge&labelColor=0b1630" alt="Play Live"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=000" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=fff" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=fff" alt="CSS3"/>
  <img src="https://img.shields.io/badge/Mobile_First-a78bfa?style=flat-square" alt="Mobile First"/>
  <img src="https://img.shields.io/badge/Quality-CI_Ready-30d27c?style=flat-square" alt="Quality CI Ready"/>
</p>

---

## What Is This

Arcade World is a **digital board game** where 2–4 players roll dice, move around a 24-tile circuit, and play mini-games to earn coins, XP, and territory. Think Mario Party meets a browser arcade.

**Built as a portfolio project** to demonstrate frontend architecture, game state management, animation systems, quality tooling, and responsive design — all while keeping the live game deployable as a static site.

---

## Features

### Core Gameplay
- **24-tile board** with game tiles, bonus events, traps, and a START reward
- **11 unique mini-games** — Basket, Hockey, Bounce, Maze, Bomber, Shooter, TicTacToe, Memory, Breakout, Fusion, PvAI duel
- **Pizza tiles** — PIZZA GAME and PIZZA DELUXE are tracked for the pizza quest
- **2–4 local players** — player-count helpers are ready for setup UI wiring
- **4 play modes** per tile — Solo, vs AI (3 difficulties), Quiz, Full Game (iframe overlay)
- **Dice roll → move → resolve → play** turn loop with smooth token animation

### Product Systems Ready for UI Wiring
- **Player count setup** — helpers for choosing, clamping, creating, and resizing 2–4 players
- **Pizza quest** — helper that completes the quest after a pizza mini-game is finished
- **Mini-game registry** — one source of truth for game IDs, modes, categories, scoring, iframe URLs, and fallbacks
- **Save migrations** — versioned migration path for old local saves and imported JSON
- **Recovery helpers** — reset, repair, or download broken saves instead of losing player progress
- **Settings model** — theme, sound, reduced motion, large UI, high contrast, auto-save, and haptics
- **Player profiles** — wins, losses, coins earned, XP earned, tiles captured, favorite game, streaks, and ELO history
- **Achievements gallery** — unlock metadata with rarity levels
- **Daily challenge** — deterministic daily objective, reward, progress, and streak helpers
- **Match summary** — replay-style timeline and formatted event summaries

### Technical Highlights

- State-machine-friendly turn loop: `roll → move → resolve → mini-game/event → reward → save → next player`
- Testable pure helper modules for dice, board movement, economy, ELO, player setup, pizza quest, save validation, iframe messages, player stats, settings, achievements, daily challenges, and match summaries
- Versioned local save envelope with migration and recovery helpers
- Static GitHub Pages deployment with optional Vite dev server for local work
- Dedicated docs for architecture, iframe security, accessibility, performance, save migrations, mini-game contribution, player count, pizza quest, security, and contribution workflow
- CI workflow for format checks, linting, and unit tests

---

## Architecture

The playable app is still served by `index.html`, while new testable logic is being extracted into `src/` incrementally.

```text
Player Count Setup
  ↓
Player Input
  ↓
Turn Engine
  ↓
Dice Roll → Board Movement → Tile Resolution
  ↓
Mini-game Engine / iframe Bridge
  ↓
Rewards, XP, ELO, Shop, Quests, Pizza Quest
  ↓
Profiles, Achievements, Daily Challenge, Match Summary
  ↓
Save System → Migrations → Recovery
  ↓
UI Render + Audio + Particles
```

### Current Structure

```text
index.html          — playable static game entry point
src/data/           — mini-game registry and future extracted data tables
src/game/           — extracted pure gameplay and product-system helpers
src/integration/    — iframe bridge and external game communication helpers
tests/              — Vitest coverage for core helpers and product systems
docs/               — architecture, accessibility, performance, save, player-count, pizza, and iframe docs
.github/workflows/  — CI quality checks
```

---

## Quality

```bash
npm install
npm run format:check
npm run lint
npm test
```

| Check | Status |
|---|---|
| Formatting | Prettier config added |
| Linting | ESLint config added |
| Unit tests | Vitest tests added for core helpers, player count, pizza quest, and product systems |
| CI | GitHub Actions workflow added |
| Accessibility/performance | Checklist documented in `docs/accessibility-performance.md` |
| iframe safety | Contract documented in `docs/iframe-bridge.md` |
| Save safety | Migrations and recovery documented in `docs/save-system.md` |
| Player count and pizza quest | Documented in `docs/player-count-and-pizza-quest.md` |
| Contribution flow | `CONTRIBUTING.md` and `docs/add-mini-game.md` added |
| Security | `SECURITY.md` added |

---

## Run Locally

```bash
# Clone
git clone https://github.com/LaurAndreea10/ARCADE-WORLD.git
cd ARCADE-WORLD

# Option 1: open directly — no build step needed
open index.html

# Option 2: simple static server
python -m http.server 8000

# Option 3: local dev server with tooling
npm install
npm run dev
```

---

## Pizza Quest

Pentru misiunea cu pizza: aterizează pe tile-ul **PIZZA GAME** sau **PIZZA DELUXE**, pornește mini-game-ul și finalizează-l. După ce rezultatul mini-game-ului este înregistrat, progresul misiunii devine **1/1**.

---

## Documentation

- [`CONTRIBUTING.md`](CONTRIBUTING.md) — local setup, PR checklist, and contribution flow
- [`SECURITY.md`](SECURITY.md) — iframe, save import, DOM, and dependency security policy
- [`docs/architecture.md`](docs/architecture.md) — system architecture and migration plan
- [`docs/add-mini-game.md`](docs/add-mini-game.md) — checklist for adding a new mini-game
- [`docs/player-count-and-pizza-quest.md`](docs/player-count-and-pizza-quest.md) — player-count setup and pizza quest behavior
- [`docs/iframe-bridge.md`](docs/iframe-bridge.md) — validated mini-game iframe contract
- [`docs/save-system.md`](docs/save-system.md) — save envelope, migrations, and recovery flow
- [`docs/accessibility-performance.md`](docs/accessibility-performance.md) — repeatable accessibility and performance checklist
- [`CHANGELOG.md`](CHANGELOG.md) — release and migration notes

---

## License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  <sub>Built by <a href="https://github.com/LaurAndreea10">Laura Andreea</a> — a portfolio project demonstrating frontend architecture, game design, responsive UI, and maintainable frontend engineering.</sub>
</p>
