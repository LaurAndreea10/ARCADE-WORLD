# Tri-Link Quest

Joc accesibil 3-în-1 inclus în ARCADE WORLD: puzzle glisant, match-3 și connect.

## Funcții

- 10 niveluri de campanie și trei dificultăți
- scor, XP, streak, record și progres persistent
- română/engleză, dark/light, contrast ridicat și reduced motion
- control tactil și tastatură
- PWA/offline
- integrare prin `data-mini-game-id="tri-link-quest"`
- evenimente `arcade:result`, `mini-game:result`, `product-loop:result`
- rezultat transmis către portal prin `postMessage`

## Rulare

Deschide `games/tri-link-quest/index.html` sau pornește un server static local.

## Recompense ARCADE WORLD

Portalul interpretează rezultatul `ARCADE_GAME_RESULT`. O etapă finalizată trimite scorul și XP-ul, iar finalizarea Connect încheie misiunea completă.
