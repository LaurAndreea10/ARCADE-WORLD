import { useEffect, useMemo, useState } from 'react';
import { Board } from './components/Board.jsx';
import { Hud } from './components/Hud.jsx';
import tiles from './data/tiles.json';

const STORAGE_KEY = 'arcade-world-react-v24';
const DEMO_URL = 'https://example.com/minigame';

function defaultState() {
  return {
    onboardingDone: false,
    mode: 'solo',
    turn: 1,
    activePlayer: 0,
    difficulty: 'medium',
    launcherOpen: false,
    saveText: '',
    players: [
      { id: 1, name: 'Player 1', color: '#60a5fa', position: 0, coins: 140, xp: 90 },
      { id: 2, name: 'Player 2', color: '#f472b6', position: 2, coins: 125, xp: 70 },
    ],
  };
}

export default function App() {
  const [game, setGame] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
    } catch {
      return defaultState();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  }, [game]);

  const current = game.players[game.activePlayer];
  const owned = useMemo(() => tiles.filter(t => t.owner != null).length, []);
  const selectedTile = tiles[current.position % tiles.length];

  function updateCurrent(mutator) {
    setGame(prev => {
      const players = prev.players.map(p => ({ ...p }));
      mutator(players[prev.activePlayer], players, prev);
      return { ...prev, players };
    });
  }

  function roll() {
    setGame(prev => {
      const players = prev.players.map(p => ({ ...p }));
      const steps = 1 + Math.floor(Math.random() * 6);
      players[prev.activePlayer].position = (players[prev.activePlayer].position + steps) % tiles.length;
      players[prev.activePlayer].coins += 10;
      return {
        ...prev,
        players,
        turn: prev.turn + 1,
        activePlayer: (prev.activePlayer + 1) % players.length,
      };
    });
  }

  function exportSave() {
    setGame(prev => ({ ...prev, saveText: btoa(unescape(encodeURIComponent(JSON.stringify(prev)))) }));
  }

  function importSave() {
    try {
      const parsed = JSON.parse(decodeURIComponent(escape(atob(game.saveText.trim()))));
      setGame({ ...defaultState(), ...parsed });
    } catch {
      alert('Save invalid');
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">React foundation</p>
          <h1>Arcade World React</h1>
          <p className="muted">Board, HUD, onboarding, modal launcher și save local într-un port real de bază.</p>
        </div>
        <div className="actions">
          <button onClick={() => setGame(prev => ({ ...prev, onboardingDone: false }))}>Onboarding</button>
          <button onClick={() => setGame(prev => ({ ...prev, launcherOpen: true }))}>Launcher</button>
          <button onClick={roll}>Roll</button>
        </div>
      </header>

      {!game.onboardingDone && (
        <section className="panel onboarding">
          <h2>Bine ai venit</h2>
          <p>Alege mod, rulează board-ul și lansează minigame-ul din tile-ul curent.</p>
          <div className="row">
            {['solo', 'pvp', 'ai'].map(mode => (
              <button key={mode} onClick={() => setGame(prev => ({ ...prev, mode }))}>{mode.toUpperCase()}</button>
            ))}
            <button className="primary" onClick={() => setGame(prev => ({ ...prev, onboardingDone: true }))}>Start</button>
          </div>
        </section>
      )}

      <Hud meta={{ mode: game.mode, turn: game.turn, coins: current.coins, xp: current.xp, difficulty: game.difficulty }} current={current} owned={owned} />

      <section className="panel controls">
        <div>
          <span className="label">Current tile</span>
          <strong>{selectedTile.name}</strong>
        </div>
        <div>
          <span className="label">Difficulty</span>
          <select value={game.difficulty} onChange={e => setGame(prev => ({ ...prev, difficulty: e.target.value }))}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="row">
          <button onClick={() => updateCurrent(player => { player.coins += 50; })}>+50 coins</button>
          <button onClick={() => updateCurrent(player => { player.xp += 25; })}>+25 XP</button>
          <button onClick={() => setGame(prev => ({ ...prev, launcherOpen: true }))}>Open minigame</button>
        </div>
      </section>

      <Board tiles={tiles} players={game.players} onTileClick={(idx) => updateCurrent(player => { player.position = idx; })} />

      <section className="panel savePanel">
        <div className="row between">
          <h2>Save / Load</h2>
          <div className="row">
            <button onClick={exportSave}>Export</button>
            <button onClick={importSave}>Import</button>
          </div>
        </div>
        <textarea value={game.saveText} onChange={e => setGame(prev => ({ ...prev, saveText: e.target.value }))} placeholder="Base64 save" />
      </section>

      {game.launcherOpen && (
        <section className="modalWrap" onClick={() => setGame(prev => ({ ...prev, launcherOpen: false }))}>
          <div className="modalCard" onClick={e => e.stopPropagation()}>
            <div className="row between">
              <div>
                <p className="eyebrow">Minigame launcher</p>
                <h2>{selectedTile.name}</h2>
              </div>
              <button onClick={() => setGame(prev => ({ ...prev, launcherOpen: false }))}>Close</button>
            </div>
            <p className="muted">Bridge-ready launcher shell pentru start / score / finish flow.</p>
            <iframe title="minigame" src={DEMO_URL} className="frame" />
            <div className="row">
              <button className="primary" onClick={() => { updateCurrent(player => { player.coins += 30; player.xp += 20; }); setGame(prev => ({ ...prev, launcherOpen: false })); }}>Win</button>
              <button onClick={() => setGame(prev => ({ ...prev, launcherOpen: false }))}>Finish</button>
              <button onClick={() => setGame(prev => ({ ...prev, launcherOpen: false }))}>Abandon</button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
