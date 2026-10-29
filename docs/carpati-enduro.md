# Carpați Enduro integration

Adds one external experience card to the existing Arcade World launcher and mobile-cloned catalogue. It opens `https://laurandreea10.github.io/codepen-portfolio/carpati-enduro/` in the existing dialog, with a separate-tab fallback, English link and bilingual case study.

The game retains its own local progress. Standalone rides do not claim board tiles or change board match rewards.

## Result contract

`GAME_SCORE`, `gameId: carpati-enduro`, boolean `completed`, integer `score` from 0 to 100, finite `time` from 0 to 86400 seconds, integer `crashes` from 0 to 999, semantic `version` string.

The listener requires all of: trusted GitHub Pages origin, exact active iframe `contentWindow`, active experience `carpatienduro`, and a valid bounded payload. Results are rendered with `textContent`. No new origins, account services or permission requests are added.

Run `node --test tests/carpati-enduro-bridge.test.cjs` for acceptance/rejection cases. The game-side sender is in the companion codepen-portfolio PR. Merge the game PR first if the card should show Expedition 2 immediately; the launcher URL itself already points to the existing game.
