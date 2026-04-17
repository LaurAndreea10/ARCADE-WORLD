# Arcade World v24

This repository is configured so GitHub Pages can serve the game directly from the repository root.

## Live app source
The playable build is published from the root of the repository:
- `index.html`
- `app.js`
- `styles.css`
- `assets/`
- `data/`
- `js/`

## Source folders
- `source/static-app/` — original static source snapshot
- `react-app/` — React migration base
- `backend/` — demo backend
- `qa/` — QA notes
- `release/` — changelog, help, credits

## GitHub Pages setup
In **Settings → Pages** choose:
- **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

Then the site should open directly at the repository URL.
