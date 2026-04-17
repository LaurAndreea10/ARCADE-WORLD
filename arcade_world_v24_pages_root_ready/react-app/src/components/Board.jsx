export function Board({ tiles, players, onTileClick }) {
  return (
    <section className="board panel">
      {tiles.map((tile, idx) => {
        const here = players.filter(p => p.position === idx);
        return (
          <article key={tile.id} className={`tile ${tile.boss ? 'boss' : ''}`} onClick={() => onTileClick?.(idx)}>
            <div className="row between">
              <strong>{tile.name}</strong>
              <small>#{idx}</small>
            </div>
            <small>{tile.family}</small>
            <div className="tokens">
              {here.map(p => <span key={p.id} className="token" style={{ background: p.color }} title={p.name} />)}
            </div>
          </article>
        );
      })}
    </section>
  );
}
