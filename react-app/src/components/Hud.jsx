export function Hud({ meta, current, owned }) {
  return (
    <section className="hud">
      <div><span>Mode</span><strong>{meta.mode}</strong></div>
      <div><span>Turn</span><strong>#{meta.turn}</strong></div>
      <div><span>Current</span><strong>{current.name}</strong></div>
      <div><span>Coins</span><strong>{meta.coins}</strong></div>
      <div><span>XP</span><strong>{meta.xp}</strong></div>
      <div><span>Owned</span><strong>{owned}</strong></div>
    </section>
  );
}
