(function(global){
  const { STORAGE, TILES } = global.AW_CONFIG;
  const { defaultPlayer, defaultSave } = global.AW_STATE;

  function clamp(value, min, max){
    return Math.max(min, Math.min(max, value));
  }
  function uniqueNumbers(list){
    return [...new Set((Array.isArray(list) ? list : []).map(v => Number(v)).filter(Number.isFinite))];
  }
  function sanitizePlayer(raw, i){
    const base = Object.assign(defaultPlayer(i), raw || {});
    const maxIdx = Math.max(0, TILES.length - 1);
    base.position = clamp(Number(base.position || 0), 0, maxIdx);
    base.level = Math.max(1, Number(base.level || 1));
    base.coins = Math.max(0, Number(base.coins || 0));
    base.xp = Math.max(0, Number(base.xp || 0));
    base.totalWins = Math.max(0, Number(base.totalWins || 0));
    base.bonusTurns = Math.max(0, Number(base.bonusTurns || 0));
    base.skipTurns = Math.max(0, Number(base.skipTurns || 0));
    base.boardPasses = Math.max(0, Number(base.boardPasses || 0));
    base.bonusHits = Math.max(0, Number(base.bonusHits || 0));
    base.trapHits = Math.max(0, Number(base.trapHits || 0));
    base.shopBuys = Math.max(0, Number(base.shopBuys || 0));
    base.visited = uniqueNumbers([0, ...base.visited]).map(v => clamp(v, 0, maxIdx));
    base.completed = uniqueNumbers(base.completed).map(v => clamp(v, 0, maxIdx));
    base.questsDone = [...new Set(Array.isArray(base.questsDone) ? base.questsDone.map(String) : [])];
    base.inventory = Object.assign(defaultPlayer(i).inventory, base.inventory || {});
    base.chests = Object.assign(defaultPlayer(i).chests, base.chests || {});
    base.unlocks = Object.assign(defaultPlayer(i).unlocks, base.unlocks || {});
    base.full = Object.assign(defaultPlayer(i).full, base.full || {});
    base.history = Array.isArray(base.history) ? base.history.slice(0, 120) : [];
    return base;
  }
  function hydratePlayers(players){
    return (players||[defaultPlayer(0), defaultPlayer(1)]).map((p,i)=>sanitizePlayer(p,i));
  }
  function snapshot(state){
    return {
      players: state.players,
      activePlayer: state.activePlayer,
      selectedTile: state.selectedTile,
      sound: state.sound,
      themeIndex: state.themeIndex,
      multiplayerCount: state.multiplayerCount,
    };
  }
  function saveState(state){
    localStorage.setItem(STORAGE, JSON.stringify(snapshot(state)));
  }
  function loadState(state){
    try{
      const raw = localStorage.getItem(STORAGE);
      if(!raw) return false;
      const s = JSON.parse(raw);
      state.players = hydratePlayers(s.players);
      state.multiplayerCount = clamp(Number(s.multiplayerCount || state.players.length || 2), 2, 4);
      state.players = hydratePlayers(state.players.slice(0, state.multiplayerCount));
      state.activePlayer = clamp(Number(s.activePlayer || 0), 0, Math.max(0, state.players.length - 1));
      state.selectedTile = clamp(Number(s.selectedTile || 0), 0, Math.max(0, TILES.length - 1));
      state.sound = s.sound !== false;
      state.themeIndex = Math.max(0, Number(s.themeIndex || 0));
      return true;
    }catch(_){
      return false;
    }
  }
  function exportState(state){
    return btoa(unescape(encodeURIComponent(JSON.stringify(snapshot(state)))));
  }
  function importState(state, raw){
    const data = JSON.parse(decodeURIComponent(escape(atob(String(raw || '').trim()))));
    state.players = hydratePlayers(data.players || []);
    state.activePlayer = clamp(Number(data.activePlayer || 0), 0, Math.max(0, state.players.length - 1));
    state.selectedTile = clamp(Number(data.selectedTile || 0), 0, Math.max(0, TILES.length - 1));
    state.sound = data.sound !== false;
    state.themeIndex = Math.max(0, Number(data.themeIndex || 0));
    state.multiplayerCount = clamp(Number(data.multiplayerCount || state.players.length || 2), 2, 4);
    state.players = hydratePlayers(state.players.slice(0, state.multiplayerCount));
    return data;
  }

  global.AW_SAVE = { snapshot, saveState, loadState, exportState, importState, hydratePlayers, defaultSave };
})(window);
