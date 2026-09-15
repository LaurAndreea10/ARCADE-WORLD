# Tri-Link Quest — case study

## Problema

ARCADE WORLD avea jocuri de acțiune și memorie, dar îi lipseau trei mecanici clasice: puzzle glisant, match-3 și conectarea perechilor.

## Soluția

Tri-Link Quest le unește într-o misiune progresivă. Fiecare etapă o deblochează pe următoarea și folosește același scor, XP și streak. Campania are 10 niveluri și dificultăți Easy, Normal și Hard.

## Accesibilitate

- interfață RO/EN
- dark/light și contrast ridicat
- ținte tactile mari și layout responsive
- navigare din tastatură pentru puzzle
- focus vizibil, regiuni live și instrucțiuni persistente
- suport pentru `prefers-reduced-motion`
- sunet opțional

## Arhitectură

Jocul este static, fără dependențe, salvează în `localStorage` și rulează offline prin service worker. Containerul poartă `data-mini-game-id="tri-link-quest"`.

La finalizarea unei etape transmite un eveniment intern și un mesaj către portal. ARCADE WORLD validează originea, fereastra iframe, ID-ul jocului și sesiunea activă înainte de a acorda recompensa.

## Recompense

- etapă: +35 coins și +30 XP
- misiune completă: +160 coins, +120 XP și insigna Triple Crown
- protecție anti-dublare pentru evenimente apropiate

## Verificare

Contractul iframe are teste pentru origine greșită, altă fereastră, sesiune inactivă și ID incorect. Jocul include persistență, mod offline și comportament responsive.

## Linkuri

- [Demo live](https://laurandreea10.github.io/ARCADE-WORLD/games/tri-link-quest/)
- [ARCADE WORLD](https://laurandreea10.github.io/ARCADE-WORLD/)
