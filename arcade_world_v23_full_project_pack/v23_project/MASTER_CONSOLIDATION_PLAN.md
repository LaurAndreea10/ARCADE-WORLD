# Arcade World — Plan de consolidare și livrare (v24 → release)

Acest document transformă cele 10 puncte de direcție într-un plan executabil, cu criterii de acceptanță clare.

## Principii
- **O singură bază de cod finală** (single source of truth).
- **Fără duplicate funcționale** între variantele static/react.
- **Flow-uri complete validate cap-coadă** înainte de adăugare de content.
- **Modularizare progresivă** cu risc minim.

## Faza 1 — Consolidare reală (P0)
### Obiectiv
Stabilim un singur build „master” și eliminăm drift-ul între implementări.

### Livrabile
- Decizie explicită: `v24-master` ca bază finală.
- Inventar feature parity (ce există în static-app vs react-app).
- Eliminare cod mort/duplicat și nomenclatură unitară (moduri, state-uri, event-uri).
- Document de arhitectură scurt (module, ownership, convenții).

### Criterii de acceptanță
- Un singur entrypoint principal pentru produs.
- Zero module duplicate cu aceeași responsabilitate.
- Terminologie unificată în cod + docs (`solo`, `vs_ai`, `pvp`; `start/score/finish/abandon`).

## Faza 2 — Bugfix + playtest pass (P0)
### Obiectiv
Închidem bug-urile de gameplay și stabilitate pe toate modurile.

### Scope minim obligatoriu
- Moduri: **PvP**, **Vs AI**, **Solo**.
- Sisteme: ownership, boss, rewards, save/load.
- Device-uri: desktop, tablet, mobile (portrait + landscape).

### Criterii de acceptanță
- Checklist QA complet pentru fiecare mod și device.
- Save/load compatibil cu versiunea curentă de date.
- Fără regressions pe fluxurile critice de onboarding și final de rundă.

## Faza 3 — Migrare completă în modular JS (P1)
### Obiectiv
Separare clară pe responsabilități și date curate.

### Structură țintă
- `board.js`
- `players.js`
- `minigames.js`
- `save.js`
- `ui.js`
- `data/*.json` (normalizate și validate)

### Criterii de acceptanță
- Fiecare modul exportă API clar, fără dependențe circulare.
- Datele sunt în JSON versionat, cu migrare minimă de schemă.
- Teste smoke pe fiecare modul major.

## Faza 4 — React port real (P1)
### Obiectiv
Portare efectivă a jocului, nu scaffold.

### Componente obligatorii
- Board
- HUD
- Onboarding
- Modale
- Save/state management
- Minigame launcher

### Criterii de acceptanță
- Paritate funcțională cu master-ul JS.
- Store de stare predictibil (un singur flux pentru mutații).
- UI responsive și accesibil (focus states, contrast minim, keyboard fallback).

## Faza 5 — Full game bridge real (P1)
### Obiectiv
Protocol stabil pentru integrarea minigame-urilor externe.

### Protocol standard
- `start`
- `score`
- `finish`
- `abandon`

### Cerințe tehnice
- Auto-reward la `finish`.
- Timeout controlat + fallback.
- Reconnect/retry flow robust.
- Validare de origin și payload schema.

## Faza 6 — AI upgrade (P2)
### Obiectiv
AI strategic, cu comportamente distincte.

### Capabilități
- Selectare inteligentă de perks.
- Decizie contextuală: capture / upgrade / avoid trap.
- Profiluri comportamentale (agresiv, economic, disruptiv).

### Criterii de acceptanță
- Diferențe observabile între profiluri.
- Win-rate țintă pe dificultăți stabilite.
- Fără mutări invalide sau blocaje de tură.

## Faza 7 — Content pass (P2)
### Obiectiv
Mai multă varietate și coerență de campanie.

### Livrabile
- Tile-uri îmbunătățite.
- Boss fights extinse.
- Deck-uri de evenimente variate.
- Arc de campanie coerent.

## Faza 8 — Art pass (P3)
### Obiectiv
Aspect final consistent.

### Livrabile
- Iconuri custom finale.
- Asset pack coerent.
- Audio polish.
- Tipografie + spacing final.

## Faza 9 — Release pass (P3)
### Obiectiv
Pregătire pentru versiune demo/final.

### Livrabile
- Splash
- Help
- Settings curate
- Credits
- Changelog
- Build-uri: demo și final

## Faza 10 — Deploy (P3)
### Obiectiv
Livrare tehnică end-to-end.

### Livrabile
- Repo GitHub curat.
- Hosting static pentru client.
- Backend deployat + monitorizare de bază.

---

## Ordine recomandată de execuție (pragmatic)
1. Faza 1 + Faza 2 (stabilitate și claritate de ownership)
2. Faza 3 (modularizare) în paralel cu pregătirea Fazei 5 (bridge)
3. Faza 4 (React real) după ce master-ul modular este stabil
4. Faza 6–8 (AI/content/art)
5. Faza 9–10 (release + deploy)

## Definition of Done pentru „master gata de release candidate”
- Toate fluxurile critice trec QA matrix pe desktop/tablet/mobile.
- Bridge extern funcționează cu timeout/reconnect și reward corect.
- Save/load trece testele de compatibilitate.
- Build demo + build final generate reproductibil.
