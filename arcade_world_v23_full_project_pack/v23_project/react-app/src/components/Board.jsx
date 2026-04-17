export function Board({ tiles, players }) {
  return (
    <section className="board">
      {tiles.map((tile, idx) => {
        const here = players.filter(p => p.position === idx);
        return (
          <article key={tile.id} className={`tile ${tile.boss ? 'boss' : ''}`}>
            <strong>{tile.name}</strong>
            <small>{tile.family}</small>
            <div className="tokens">{here.map(p => <span key={p.id} className="token" style={{ background: p.color }} title={p.name} />)}</div>
          </article>
        );
      })}
    </section>
  );
}