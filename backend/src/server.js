import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
const savesFile = path.join(dataDir, 'saves.json');
fs.mkdirSync(dataDir, { recursive: true });

function loadSaves() {
  try {
    return new Map(Object.entries(JSON.parse(fs.readFileSync(savesFile, 'utf8'))));
  } catch {
    return new Map();
  }
}
function persistSaves(store) {
  fs.writeFileSync(savesFile, JSON.stringify(Object.fromEntries(store), null, 2));
}
function normalizeReward(body = {}) {
  const score = Number(body.score || 0);
  const result = body.result || 'finish';
  const bonus = result === 'win' ? 1.2 : result === 'abandon' ? 0.45 : 0.75;
  return {
    result,
    score,
    coins: Math.max(0, Math.round((Number(body.coins || 20) + score * 0.08) * bonus)),
    xp: Math.max(0, Math.round((Number(body.xp || 14) + score * 0.05) * bonus)),
    gameId: body.gameId || 'unknown',
    source: 'iframe-bridge',
  };
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
const saves = loadSaves();
const leaderboard = [{ name: 'Player 1', rating: 1042 }, { name: 'AI Nova', rating: 1016 }];

app.get('/health', (_req, res) => res.json({ ok: true, service: 'arcade-world-backend' }));
app.get('/leaderboard', (_req, res) => res.json(leaderboard));
app.post('/save/:profileId', (req, res) => {
  saves.set(req.params.profileId, { updatedAt: new Date().toISOString(), payload: req.body });
  persistSaves(saves);
  res.json({ ok: true, profileId: req.params.profileId });
});
app.get('/save/:profileId', (req, res) => res.json(saves.get(req.params.profileId) || { ok: false, empty: true }));
app.post('/iframe-result', (req, res) => res.json({ ok: true, normalized: normalizeReward(req.body) }));
app.listen(8787, () => console.log('Arcade World backend on http://localhost:8787'));
