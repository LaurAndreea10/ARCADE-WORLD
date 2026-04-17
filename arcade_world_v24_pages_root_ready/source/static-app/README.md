# Static app

Acesta este build-ul master curent pentru Arcade World v24.

## Start rapid
Poți deschide `index.html` direct în browser sau poți servi folderul local:

```bash
python3 -m http.server 8080
```

## Zone cheie
- `app.js` — gameplay principal și UI wiring
- `js/config.js` — config și constante
- `js/state.js` — state implicit și factory-uri
- `js/save.js` — persistență și import/export
- `js/bridge.js` — bridge pentru minigame / full game
- `data/` — conținut de joc
