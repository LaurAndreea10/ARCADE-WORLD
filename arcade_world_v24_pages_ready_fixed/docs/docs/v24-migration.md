# v24 real migration notes

This package upgrades the previous scaffold by moving the working Arcade World board build into the modular `static-app/` structure.

## What changed
- `static-app/index.html` now contains the actual board markup.
- `static-app/styles.css` contains the extracted CSS from the working build.
- `static-app/app.js` contains the extracted game logic from the working build.

## Next steps
- Move inline data constants from `app.js` into `data/*.json`.
- Replace remaining inline SVG/emoji with shared assets.
- Port validated features from the single-file build into the React app incrementally.
- Connect backend endpoints to save/load flows.