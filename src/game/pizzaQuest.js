export const PIZZA_TILE_IDS = Object.freeze(['pizza_game', 'pizza_deluxe']);

export const PIZZA_QUEST = Object.freeze({
  id: 'pizza-party',
  title: 'Pizza Party',
  description: 'Complete a pizza tile: land on PIZZA GAME or PIZZA DELUXE, play it, and win/finish the mini-game.',
  target: 1,
  reward: { coins: 75, xp: 50 },
});

export function isPizzaTile(tile) {
  return PIZZA_TILE_IDS.includes(tile?.id) || /pizza/i.test(tile?.name ?? '');
}

export function getPizzaQuestProgress(events = [], quest = PIZZA_QUEST) {
  const completedPizzaEvents = events.filter((event) => {
    const payload = event.payload ?? {};
    return event.type === 'mini-game-completed' && payload.completed !== false && isPizzaTile(payload.tile);
  });

  const current = Math.min(quest.target, completedPizzaEvents.length);

  return {
    quest,
    current,
    target: quest.target,
    completed: current >= quest.target,
    percent: Math.round((current / quest.target) * 100),
  };
}

export function explainPizzaQuest() {
  return 'Pentru misiunea cu pizza: aterizează pe tile-ul PIZZA GAME sau PIZZA DELUXE, pornește mini-game-ul și finalizează-l. După ce rezultatul mini-game-ului este înregistrat, progresul misiunii devine 1/1.';
}
