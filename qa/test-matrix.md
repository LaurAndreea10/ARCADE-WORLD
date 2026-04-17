# QA Matrix

## Devices
- Desktop 1440x900
- Tablet 1024x768
- Mobile 390x844 portrait
- Mobile 844x390 landscape

## Core flows
- Start session: solo / vsAi / pvp
- Save export/import
- Territory capture
- Boss fight flow
- Bridge result handling
- Reduced motion and contrast toggles


## Fixed in master patched v2
- Save import/load now sanitizes player positions, visited/completed arrays and clamps stale indices to current board size
- Player count changes reset transient mode/difficulty context before next turn
- Full game sessions now expose timeout monitoring and close cleanly on Escape
