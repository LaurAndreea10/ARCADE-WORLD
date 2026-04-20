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
  <img src="https://img.shields.io/badge/No_Dependencies-30d27c?style=flat-square" alt="Zero Dependencies"/>
  <img src="https://img.shields.io/badge/Mobile_First-a78bfa?style=flat-square" alt="Mobile First"/>
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

**Built as a portfolio project** to demonstrate frontend architecture, game state management, animation systems, and responsive design — all in vanilla JavaScript with zero dependencies.

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
- **Zero dependencies** — pure HTML/CSS/JS, no build step
- **LocalStorage persistence** — auto-save, 2 profile slots, JSON export/import
- **Iframe bridge** — postMessage protocol for full-game score integration
- **Sync links** — share save state via URL hash (no backend needed)
- **Spectator mode** — minimal HUD for streaming/recording
- **Screenshot mode** — clean board-only view
- **Dev metrics** — FPS, DOM nodes, storage usage (Ctrl+Shift+D)
- **Accessibility** — reduced motion, large UI, high contrast, keyboard nav, ARIA labels, skip link

---

## Tech Stack

| Layer | Tech |
|-------|------|
| **Markup** | Semantic HTML5 |
| **Styling** | CSS3 with CSS custom properties, `@media` queries, `backdrop-filter`, CSS Grid/Flexbox |
| **Logic** | Vanilla ES6+ JavaScript — no framework, no bundler |
| **Audio** | Web Audio API (AudioContext oscillator synthesis) |
| **Storage** | localStorage with JSON serialization |
| **Fonts** | Google Fonts (Outfit, JetBrains Mono) |
| **Hosting** | GitHub Pages (static) |
| **Mini-games** | 11 embedded via iframe (CodePen-hosted) + local mini-engine fallbacks |

---

## Architecture

```
index.html          — Single-file build (CodePen-compatible)
├── <style>         — CSS: layout, board, tiles, animations, mobile, themes
├── <body>          — DOM: board grid, center screen, sidebar, modals, mobile nav
└── <script>        — JS modules (inline):
    ├── Data        — TILES[], SHOP_ITEMS[], QUESTS[], BADGES[], TREE[]
    ├── State       — Game state object, save/load, player defaults
    ├── Board       — Render tiles, connectors, token movement, SVG icons
    ├── Turn        — Dice roll, movement, landing resolution, turn cycle
    ├── Mini-games  — 11 game engines (basket, maze, bomber, etc.)
    ├── PvP         — Dedicated 2-player versions of each mini-game
    ├── Economy     — Rewards, shop, XP, leveling, streaks, season pass
    ├── Events      — Bonus/trap card system with flip animation
    ├── Full Game   — Iframe overlay with postMessage bridge
    ├── Mobile      — Tab bar, FAB, game zone, score strip, panels
    ├── Audio       — AudioContext SFX synthesis
    └── Polish      — Confetti, particles, tour, accessibility, dev tools
```

---

## Run Locally

```bash
# Clone
git clone https://github.com/LaurAndreea10/ARCADE-WORLD.git
cd ARCADE-WORLD

# Open directly — no build step needed
open index.html
# or
python -m http.server 8000
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

- [ ] React/Next.js port with component architecture
- [ ] Online multiplayer via WebSocket
- [ ] Cloud save with OAuth
- [ ] Custom tile editor
- [ ] Additional mini-game packs
- [ ] Leaderboard API

---

## License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  <sub>Built by <a href="https://github.com/LaurAndreea10">Laura Andreea</a> — a portfolio project demonstrating frontend architecture, game design, and responsive UI.</sub>
</p>
