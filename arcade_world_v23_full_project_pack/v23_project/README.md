# Arcade World v23 Project Pack

Acest pachet livrează toate cele 10 direcții cerute la nivel de scaffold practic:

1. Split real pe fișiere curate (`static-app/`)
2. Portare React scaffold (`react-app/`)
3. Backend real scaffold (`backend/`)
4. Integrare reală cu jocurile externe prin contract (`static-app/docs/iframe-bridge.md`)
5. Art pass de bază (`static-app/assets/`)
6. QA docs (`qa/`)
7. Economy & design ready prin `data/` și hooks în app
8. Content expansion pipeline (`data/*.json`)
9. Accessibility starter pass (responsive CSS + import/export + clean labels)
10. Release package (`release/`)

## Cum îl folosești
- Rulezi varianta statică: deschizi `static-app/index.html`
- Migrare React: `cd react-app && npm install && npm run dev`
- Backend local: `cd backend && npm install && npm run dev`

## Notă sinceră
Backend-ul și React-ul sunt scaffold-uri funcționale de pornire, nu produsul final complet migrat/deployat.
## Plan de execuție recomandat
- Folosește `MASTER_CONSOLIDATION_PLAN.md` pentru ordinea de execuție (consolidare → bugfix/playtest → modularizare → React port → bridge → AI/content/art → release/deploy).
- Începe cu Faza 1 + Faza 2 pentru a valida baza unică înainte de extinderi.
