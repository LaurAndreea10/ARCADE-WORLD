# Player Count and Pizza Quest

## Player Count Selection

Arcade World supports 2-4 local players. The setup screen should expose a visible selector before starting/resetting a match:

```html
<label for="playerCount">Players</label>
<select id="playerCount">
  <option value="2">2 players</option>
  <option value="3">3 players</option>
  <option value="4">4 players</option>
</select>
```

Use `src/game/playerSetup.js` for the underlying logic:

```js
import { createDefaultPlayers, resizePlayers } from './src/game/playerSetup.js';

const count = Number(document.querySelector('#playerCount').value);
state.players = resizePlayers(state.players, count);
```

Recommended behavior:

- default to 2 players;
- keep existing names/stats when resizing if possible;
- clamp invalid values to 2-4;
- reset `currentPlayer` to `0` if the current index is out of range;
- re-render player cards, tokens, score strip, and turn HUD after changing the count.

## Pizza Quest

The pizza mission is completed by playing one of the pizza board tiles:

- `PIZZA GAME` / `pizza_game`
- `PIZZA DELUXE` / `pizza_deluxe`

Player-facing explanation:

```text
Pentru misiunea cu pizza: aterizează pe tile-ul PIZZA GAME sau PIZZA DELUXE, pornește mini-game-ul și finalizează-l. După ce rezultatul mini-game-ului este înregistrat, progresul misiunii devine 1/1.
```

The testable helper is in `src/game/pizzaQuest.js`:

```js
import { getPizzaQuestProgress } from './src/game/pizzaQuest.js';

const progress = getPizzaQuestProgress([
  {
    type: 'mini-game-completed',
    payload: {
      tile: { id: 'pizza_game', name: 'PIZZA GAME' },
      completed: true,
    },
  },
]);
```

## Integration Notes for `index.html`

When the full `index.html` extraction pass happens, wire these steps into the current inline game code:

1. Add the player-count selector to the setup/reset modal.
2. Replace hardcoded default player creation with `createDefaultPlayers(count)` or equivalent inline logic.
3. On player-count change, call `resizePlayers(existingPlayers, count)`.
4. Add pizza quest text to the quest card so players know they must land on and finish a pizza tile.
5. When a pizza mini-game returns a completed result through local play or iframe `postMessage`, emit a `mini-game-completed` event with the tile payload.
6. Use `getPizzaQuestProgress(events)` to show `0/1` or `1/1`.
