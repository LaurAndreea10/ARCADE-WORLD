# Arcade World v24

Arcade World v24 este un repo pregătit pentru GitHub, organizat în jurul build-ului real din `static-app/`.

## Ce este stabil acum
- `static-app/` este build-ul master actual
- save/load/export/import este unificat
- bridge-ul de iframe are flux clar pentru `handshake`, `start`, `progress`, `result`, `timeout`, `reconnect`
- backend-ul demo normalizează reward-urile și poate salva profile local
- `react-app/` este o bază de portare, nu sursa de adevăr a jocului

## Structură
- `static-app/` — versiunea principală, gata de iterat și testat
- `react-app/` — port React de bază pentru migrare treptată
- `backend/` — server demo Express pentru save și bridge result normalize
- `qa/` — checklist-uri și puncte de atenție pentru testare
- `release/` — help, credits și changelog

## Pornire locală

### 1. Static build
Poți deschide `static-app/index.html` direct în browser pentru un smoke test simplu.

Pentru comportament mai apropiat de producție, servește folderul static cu un server local, de exemplu:

```bash
cd static-app
python3 -m http.server 8080
```

Apoi deschide `http://localhost:8080`.

### 2. React app
```bash
cd react-app
npm install
npm run dev
```

Build:
```bash
npm run build
```

### 3. Backend demo
```bash
cd backend
npm install
npm run dev
```

Serverul pornește implicit pe `http://localhost:8787`.

## Flux recomandat de dezvoltare
1. Lucrează întâi în `static-app/`
2. Fă playtest pe Solo / PvP / Vs AI / save-load / full bridge
3. Extrage logică și date curate în module
4. Abia după stabilizare, adu paritate în `react-app/`

## Ce mai lipsește
- playtest complet cross-browser și mobile
- AI de board mai strategic
- content pass complet
- art pass complet
- release/demo pass final
- deploy final

## GitHub checklist
- repo clean, fără `node_modules`
- `.gitignore` configurat
- licență inclusă
- documentație de pornire inclusă
- date runtime backend excluse din versionare

## Notă despre React
`react-app/` este inclus ca bază de migrare. Nu trebuie tratat încă drept build-ul oficial al jocului.
