# iframe Bridge Contract

Arcade World can launch full mini-games in an iframe and receive their result through `postMessage`. Because iframe messages can come from unexpected sources, every message must be validated before it changes game state.

## Allowed Origins

The current helper accepts these origins by default:

- `https://codepen.io`
- `https://cdpn.io`
- `https://laurandreea10.github.io`

Update `src/game/constants.js` when adding a new trusted mini-game host.

## Message Format

Mini-games should send a compact score message:

```js
window.parent.postMessage(
  {
    type: 'GAME_SCORE',
    gameId: 'basket',
    score: 42,
    won: true,
  },
  'https://laurandreea10.github.io',
);
```

## Validation Rules

The board should reject messages when:

- the origin is not trusted;
- `type` is not `GAME_SCORE`;
- `score` is not a finite number;
- required fields are missing or malformed.

## Fallback Behavior

When an iframe does not load quickly enough, the UI should show a clear message and launch the local fallback engine:

```text
Mini-game unavailable. Launching local fallback...
```

`createIframeLoadGuard` in `src/integration/iframeBridge.js` centralizes this timeout behavior.

## Security Notes

- Prefer explicit `targetOrigin` over `'*'` when mini-games call `postMessage`.
- Add `sandbox` attributes to iframe embeds.
- Keep the message payload small and declarative.
- Never execute code received from iframe messages.
