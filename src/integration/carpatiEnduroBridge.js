/* External results update a summary, never a board tile. */
function validCarpatiEnduroResult(event, frameWindow, active) {
  const data = event && event.data;
  return (
    active === 'carpatienduro' &&
    event.origin === 'https://laurandreea10.github.io' &&
    event.source === frameWindow &&
    !!data &&
    data.type === 'GAME_SCORE' &&
    data.gameId === 'carpati-enduro' &&
    typeof data.completed === 'boolean' &&
    Number.isInteger(data.score) &&
    data.score >= 0 &&
    data.score <= 100 &&
    Number.isFinite(data.time) &&
    data.time >= 0 &&
    data.time <= 86400 &&
    Number.isInteger(data.crashes) &&
    data.crashes >= 0 &&
    data.crashes <= 999 &&
    typeof data.version === 'string' &&
    /^\d+\.\d+\.\d+$/.test(data.version)
  );
}
