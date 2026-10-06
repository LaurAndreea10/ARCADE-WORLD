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

