# QA Matrix (Playtest Pass)

## Devices
- Desktop 1440x900
- Tablet 1024x768
- Mobile 390x844 portrait
- Mobile 844x390 landscape

## Moduri obligatorii
- Solo
- Vs AI
- PvP local

## Fluxuri core game (per mod)
- Start sesiune + onboarding
- Runde complete până la victorie/înfrângere
- Territory capture + ownership transfer
- Boss trigger + boss resolution
- Rewards acordate corect
- Save + load în mijlocul progresului

## Bridge/minigame
- start / score / finish / abandon
- Reward după `finish`
- Timeout controlat (fără blocaj UI)
- Reconnect/retry flow

## Compatibilitate date
- Import save vechi după update de content
- Export/Import fără pierdere de progres
- Validare minimă schema pentru payload-uri externe

## Edge cases mobile/tablet
- Overlay/modale fără overflow
- Board scroll/zoom utilizabil touch
- HUD lizibil în portrait/landscape
- Butoane critice în viewport fără overlap
