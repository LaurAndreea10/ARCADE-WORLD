# Mobile launcher reachability — 2026-10-27

- Constrain the board grid and nested panels to the mobile viewport. Intrinsic content previously expanded the 390 px layout to 604 px and placed the More touch target outside the visual viewport.
- Keep fixed score/navigation bars within dynamic viewport width; preserve the existing Candy Route card and launcher.

# Candy Route v4 launcher — 2026-10-27

- Updated the existing Candy Route card for the story map, visual creator and local tournaments.
- Preserved the single source card, large launcher, RO/EN links and independent progress. No extra board rewards or duplicate catalogue entry.
- Deploy the companion codepen-portfolio v4 update before publishing this label. Public Arena hosting is not activated by this launcher.

# Candy Route v3 launcher — 2026-10-26

- Updated the existing Candy Route card to v3: 12-variant Studio, creator, profiles, local duel, PNG and offline support.
- Kept one source card, the existing large embedded launcher, English/separate-tab links and independent game progress.
- Deploy the companion Candy Route v3 PR in codepen-portfolio before publishing this label update. Local logic/interaction verification belongs to that PR; this change only updates launcher text.

# Candy Route integration — 2026-10-26

- Added Candy Route v2.1 to the existing experience grid and large embedded launcher, with a separate-tab fallback and English link.
- The mobile More panel uses the existing clone mechanism; card IDs stay unique.
- Game progress stays inside Candy Route. No Arcade World board XP or coins are awarded by this launcher.
- The destination ships in the companion codepen-portfolio PR; merge that PR before this one.

# Arcade World complete game catalogue — 2026-10-18

- Expanded the experience grid from 18 to 35 cards, adding Nexus Arcade, Tri-Link Quest, Lily Hop World, Pizza Game, Pizza Chef Deluxe, Neon Island Run 3D, Garden Match Masters, VELOCITY X, BlockForge, StarForge Maze, HexWords 2048, Signal Garden, Maze Adventure, Bounce Ball, Air Hockey Arcade, Neon Drift, and Surfin Bird Quest.
- Each new card links to the playable project and its source repository. Tri-Link Quest also uses the existing in-page launcher.
- Updated the mobile More panel to clone the full experience grid, remove duplicate clones on repeat visits, and preserve unique accessible IDs.
- Standalone games keep their own saved progress; launching a game does not award Arcade World board coins or XP.
- Static checks confirmed 35 unique cards, 17 new game cards, and valid inline launcher syntax. The launcher registry terminator was corrected so the integrated launchers parse. Real-device mobile play remains unverified.

# Portfolio game catalogue expansion — 2026-10-18

- Added Puck & Pool Arena, Ghost Talk, Growth Quest · Funnel Forge, LIVADA · Culesul, LOOP — Cosmic Relay, Gimnaziu Space, Excel Quest, and BASKET VS AI to the Arcade World experience cards.
- Added bilingual card descriptions, embedded launchers, and separate-tab links. The cards stay in the existing responsive experience grid.
- Each project continues to own its progress. These launch cards do not award Arcade World board coins or XP.
- Source-level checks confirmed one card, launcher mapping, and embedded launch action per added experience. Physical-device testing remains unconfirmed.

# PentArena integration — 2026-10-06

- Added a bilingual five-sport PentArena card to desktop experiences and the mobile More panel.
- Reused the existing iframe dialog launcher, with separate-tab play and public version-history links.
- PentArena keeps its own local progress; this integration adds no board rewards or score synchronization.
- Static card/launcher/mobile-clone checks and inline JavaScript syntax checks passed. Live deployment and physical-device behavior were not verified.

# Serpent Prism integration — 2026-10-06

Added Serpent Prism to desktop experiences and the mobile More panel, using the existing iframe launcher. Includes direct RO/EN play and version-history links. Progress remains stored by Serpent Prism; no board rewards or score synchronization are added.

## SlideStorm Arena integration verification — 2026-10-06

- Confirmed the existing single source card, embedded launcher, separate-tab link and mobile catalog clone; no duplicate game card added.
- Confirmed score messages are checked against the active experience, trusted origin, iframe source, game ID and numeric score/level bounds.
- Added RO/EN README documentation for launching SlideStorm Arena and its separate local progress.
- Static source checks passed; live deployment, real-device touch and screen-reader behavior were not verified in this check.

# BooScary integration — 2026-10-06

Added BooScary v4 to desktop/mobile catalog and iframe launcher, with origin/source-checked score messages and direct play/case-study links.

## Odyssey Quest — 2026-09-30

- Added bilingual launch card and embedded play through the existing experience dialog.
- Added validated iframe score display (origin, source window, game ID, score and chapter/stage).
- The standalone experience preserves its own progress and does not change board tile ownership.

## v34 — 2026-09-15

### Tri-Link Quest

- Adăugat jocul 3-în-1: sliding puzzle, match-3 și connect.
- Adăugate 10 niveluri, trei dificultăți, RO/EN, contrast și persistență.
- Adăugat PWA offline, artwork Open Graph și documentație dedicată.
- Integrate coins, XP, istoric, statistici și insigna Triple Crown.
- Securizat contractul postMessage prin validarea originii, iframe-ului și sesiunii.
- Adăugate teste Vitest pentru acceptarea și respingerea mesajelor.

## v33 — 2026-09-04

### Performance architecture

- Redus `index.html` de la aproximativ 527 KB la 19 KB.
- Extras 21 blocuri CSS într-un bundle cacheabil.
- Extras 24 blocuri JavaScript într-un bundle încărcat cu `defer`.
- Adăugat build GitHub Actions reproductibil cu Terser și clean-css.
- Publicate automat fișierele minificate: aproximativ 96 KB CSS și 289 KB JavaScript.
- Lighthouse, trei rulări: Performance 77, 77, 64; Accessibility 100 în toate rulările.
- Baseline anterior: Performance 61. Câștig median: +16 puncte.

# Changelog

All notable changes to Arcade World will be documented in this file.

The format follows the spirit of [Keep a Changelog](https://keepachangelog.com/), and this project uses semantic versioning for public releases.

## [Unreleased]

### Added

- Tooling foundation with Vite, ESLint, Prettier, and Vitest.
- GitHub Actions quality workflow for formatting, linting, and tests.
- Core game helper modules for dice, movement, economy, ELO, save schema, and iframe bridge behavior.
- Product-system helpers for settings, save migrations, recovery actions, player stats, achievements, daily challenges, match summaries, and the mini-game registry.
- Unit tests for core gameplay helpers and product-system helpers.
- Architecture, accessibility, performance, iframe integration, save-system, and mini-game contribution documentation.
- Contributor guide and security policy.
- MIT license file.

### Changed

- Project roadmap now separates playable demo work from maintainable architecture work.
- Version notes are tracked here instead of inside inline HTML comments.
- README now describes the modular migration path, quality workflow, product systems, and contribution docs.

### Planned

- Incremental extraction of the existing single-file game into the new `src/` module structure.
- Lighthouse audit artifacts for desktop and mobile.
- Online multiplayer prototype behind a feature flag.
- UI wiring for achievements, daily challenges, settings, profiles, and match summaries.

