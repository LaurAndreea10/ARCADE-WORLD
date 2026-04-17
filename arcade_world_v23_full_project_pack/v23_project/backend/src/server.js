import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
const saves = new Map();
const leaderboard = [{ name: 'Player 1', rating: 1042 }, { name: 'AI Nova', rating: 1016 }];

app.get('/health', (_req, res) => res.json({ ok: true, service: 'arcade-world-backend' }));
app.get('/leaderboard', (_req, res) => res.json(leaderboard));
app.post('/save/:profileId', (req, res) => { saves.set(req.params.profileId, req.body); res.json({ ok: true }); });
app.get('/save/:profileId', (req, res) => res.json(saves.get(req.params.profileId) || { ok: false, empty: true }));
app.post('/iframe-result', (req, res) => res.json({ ok: true, normalized: { coins: req.body.coins || 0, xp: req.body.xp || 0 } }));
app.listen(8787, () => console.log('Arcade World backend on http://localhost:8787'));