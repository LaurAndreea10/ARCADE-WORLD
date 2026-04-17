import { useMemo, useState } from 'react';
import { Board } from './components/Board.jsx';
import { Hud } from './components/Hud.jsx';
import tiles from './data/tiles.json';

export default function App() {
  const [players] = useState([
    { id: 1, name: 'Player 1', color: '#60a5fa', position: 0 },
    { id: 2, name: 'Player 2', color: '#f472b6', position: 3 },
  ]);
  const [meta] = useState({ mode: 'pvp', turn: 1, coins: 140, xp: 90 });
  const owned = useMemo(() => tiles.filter(t => t.owner != null).length, []);
  return (
    <main className="page">
      <header><h1>Arcade World React scaffold</h1><p>Pregătit pentru portarea completă.</p></header>
      <Hud meta={meta} current={players[0]} owned={owned} />
      <Board tiles={tiles} players={players} />
    </main>
  );
}