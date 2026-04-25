# Changelog

All notable changes to Arcade World will be documented in this file.

The format follows the spirit of [Keep a Changelog](https://keepachangelog.com/), and this project uses semantic versioning for public releases.

## [Unreleased]

### Added
- Tooling foundation with Vite, ESLint, Prettier, and Vitest.
- GitHub Actions quality workflow for formatting, linting, and tests.
- Core game helper modules for dice, movement, economy, ELO, save schema, and iframe bridge behavior.
- Unit tests for core gameplay helpers.
- Architecture, accessibility, performance, and iframe integration documentation.
- MIT license file.

### Changed
- Project roadmap now separates playable demo work from maintainable architecture work.
- Version notes are tracked here instead of inside inline HTML comments.

### Planned
- Incremental extraction of the existing single-file game into the new `src/` module structure.
- Lighthouse audit artifacts for desktop and mobile.
- Online multiplayer prototype behind a feature flag.
