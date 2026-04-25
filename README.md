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

## Screenshots

<p align="center">
  <img src="docs/screenshot-desktop.png" width="720" alt="Desktop Board View"/>
</p>

<p align="center">
  <img src="docs/screenshot-mobile.png" width="280" alt="Mobile View"/>
  &nbsp;&nbsp;
  <img src="docs/screenshot-game.png" width="280" alt="Mini-Game Active"/>
  &nbsp;&nbsp;
  <img src="docs/screenshot-setup.png" width="280" alt="Player Setup"/>
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
- **4 play modes** per tile — Solo, vs AI (3 difficulties), Quiz, Full Game (iframe overlay)
- **Dice roll → move → resolve → play** turn loop with smooth token animation

### Multiplayer & Competition
- **2–4 local players** with custom names, avatars, and token colors
- **PvP duels** — dedicated 2-player versions of every mini-game
- **vs AI mode** — AI opponent with safe/balanced/greedy behavior profiles
- **Territory system** — win tiles to own them; opponents pay tolls
- **Ranked ELO** — local rating system tracks player skill
- **Season pass** — 10-level reward track with milestone bonuses
- **Cup/tournament** — bracket system with season standings table

### Progression & Economy
- **XP & leveling** — unlock game modes and skill tree perks
- **Shop** — shields, rerolls, x2 multipliers, freeze cards
- **Quests** — 5 tracked objectives with coin/XP rewards
- **Badges** — Common → Legendary rarity system
- **Streak combos** — consecutive wins multiply rewards (3x, 5x, 10x)
- **Daily login** — 7-day reward cycle with increasing bonuses

### Visual & UX
- **3 color themes** — Cyan, Purple, Sunset
- **SVG tile icons** — custom-drawn for each game family
- **Glassmorphism UI** — blur, gradients, animated borders
- **Event card flip** — 3D card reveal for bonus/trap events
- **Confetti & particles** — ambient board particles, win celebrations
- **Sound FX** — synthesized AudioContext sounds (dice, win, lose, buy)
- **Keyboard shortcuts** — Space=roll, B=bonus, T=theme, F=fullscreen, arrows=browse

### Mobile
- **Bottom tab bar** — Board / Play / Stats / Shop / More
- **Floating dice FAB** — always-accessible roll button
- **Score strip** — fixed top bar with all player stats
- **Swipe navigation** — browse tiles with horizontal swipe
- **Touch-optimized** — 44px+ targets, safe-area insets, haptic feedback
- **Game zone** — fills mobile viewport with active tile card, mode selector, quest tracker

### Technical
- **Static-first deployment** — the live game still works from `index.html` on GitHub Pages
- **LocalStorage persistence** — auto-save, 2 profile slots, JSON export/import
- **Versioned save schema helpers** — safer future migrations for exported save files
- **Iframe bridge** — validated `postMessage` protocol for full-game score integration
- **Sync links** — share save state via URL hash (no backend needed)
- **Spectator mode** — minimal HUD for streaming/recording
- **Screenshot mode** — clean board-only view
- **Dev metrics** — FPS, DOM nodes, storage usage (Ctrl+Shift+D)
- **Accessibility** — reduced motion, large UI, high contrast, keyboard nav, ARIA labels, skip link

---

## Technical Highlights

- State-machine-friendly turn loop: `roll → move → resolve → mini-game/event → reward → save → next player`
- Testable pure helper modules for dice, board movement, economy, ELO, save validation, and iframe message validation
- Versioned local save envelope for future data migrations
- Static GitHub Pages deployment with optional Vite dev server for local work
- Dedicated docs for architecture, iframe security, accessibility, and performance
- CI workflow for format checks, linting, and unit tests

---

## Tech Stack

| Layer | Tech |
|-------|------|
| **Markup** | Semantic HTML5 |
| **Styling** | CSS3 with CSS custom properties, `@media` queries, `backdrop-filter`, CSS Grid/Flexbox |
| **Logic** | Vanilla ES6+ JavaScript with extracted testable modules |
| **Tooling** | Vite, ESLint, Prettier, Vitest |
| **Audio** | Web Audio API (AudioContext oscillator synthesis) |
| **Storage** | localStorage with JSON serialization and schema helpers |
| **Fonts** | Google Fonts (Outfit, JetBrains Mono) |
| **Hosting** | GitHub Pages (static) |
| **Mini-games** | 11 embedded via iframe (CodePen-hosted) + local mini-engine fallbacks |

---

## Architecture

The playable app is still served by `index.html`, while new testable logic is being extracted into `src/` incrementally.

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

### Current Structure

```text
index.html          — playable static game entry point
src/game/           — extracted pure gameplay helpers
src/integration/    — iframe bridge and external game communication helpers
tests/              — Vitest coverage for core helpers
docs/               — architecture, accessibility, performance, and iframe docs
.github/workflows/  — CI quality checks
```

### Target Structure

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

Read the full architecture notes in [`docs/architecture.md`](docs/architecture.md).

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
| Unit tests | Vitest tests added for core helpers |
| CI | GitHub Actions workflow added |
| Accessibility/performance | Checklist documented in `docs/accessibility-performance.md` |
| iframe safety | Contract documented in `docs/iframe-bridge.md` |

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

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Roll dice |
| `B` | Use bonus turn |
| `T` | Cycle theme |
| `F` | Toggle fullscreen |
| `←` `→` | Browse tiles |
| `1-4` | Select game mode |
| `Ctrl+Shift+D` | Dev metrics overlay |
| `Ctrl+Shift+S` | Spectator mode |
| `Ctrl+Shift+P` | Screenshot mode |

---

## Roadmap

### Maintainability
- [x] Add `package.json` with dev, lint, format, and test scripts
- [x] Add ESLint, Prettier, Vitest, and GitHub Actions
- [x] Add MIT license file
- [x] Add changelog
- [x] Extract core helper modules into `src/`
- [x] Add tests for dice, movement, economy, ELO, save schema, and iframe bridge helpers
- [ ] Continue extracting the existing inline game code from `index.html` into modules
- [ ] Remove legacy version comments from the HTML during the full extraction pass

### Gameplay and Platform
- [ ] React/Next.js port with component architecture
- [ ] Online multiplayer via WebSocket
- [ ] Cloud save with OAuth
- [ ] Custom tile editor
- [ ] Additional mini-game packs
- [ ] Leaderboard API

### Quality Evidence
- [ ] Add Lighthouse desktop screenshot/result
- [ ] Add Lighthouse mobile screenshot/result
- [ ] Add reduced-motion verification result
- [ ] Add keyboard navigation verification result

---

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — system architecture and migration plan
- [`docs/iframe-bridge.md`](docs/iframe-bridge.md) — validated mini-game iframe contract
- [`docs/accessibility-performance.md`](docs/accessibility-performance.md) — repeatable accessibility and performance checklist
- [`CHANGELOG.md`](CHANGELOG.md) — release and migration notes

---

## License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  <sub>Built by <a href="https://github.com/LaurAndreea10">Laura Andreea</a> — a portfolio project demonstrating frontend architecture, game design, responsive UI, and maintainable frontend engineering.</sub>
</p>
