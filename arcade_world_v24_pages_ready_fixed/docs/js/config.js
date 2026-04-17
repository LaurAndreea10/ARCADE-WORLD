(function(global){
  const GAME_URLS = [
    'https://es-d-5697283320260328-019d2b27-6fb7-7f3c-ae84-cf130aae5231.codepen.dev/',
    'https://es-d-5697283320260328-019d267b-0535-7927-99da-f35c852ebaf1.codepen.dev/',
    'https://es-d-5697283320260328-019d202f-93fa-7c03-8496-9a9f55afbf17.codepen.dev/',
    'https://es-d-5697283320260328-019d1ef0-2fb8-7dea-9187-a0ec413b8b23.codepen.dev/',
    'https://es-d-5697283320260328-019d19ba-35cc-7dc8-93fb-0f7b3071579c.codepen.dev/',
    'https://es-d-5697283320260328-019cceb2-062d-7969-8c7f-407fbcfeac92.codepen.dev/',
    'https://es-d-5697283320260328-019ccc82-9700-75d0-8200-29b1d0b01b21.codepen.dev/',
    'https://es-d-1768016420260328-019cf0ef-e43a-76c2-8a55-17856c11fe89.codepen.dev/',
    'https://es-d-9192350520260329-019d2f0c-26b1-74c4-a2c0-04310269a74f.codepen.dev/',
    'https://es-d-9192350520260329-019d2f46-380a-7240-86d0-2a6138bfc072.codepen.dev/',
    'https://es-d-9192350520260329-019d2f38-a9f8-7ecb-9ef2-986872686b7a.codepen.dev/',
    'https://es-d-5927833420260331-019d35b9-3b6b-728e-99f9-1e9a2bc673fa.codepen.dev/',
    'https://es-d-5927833420260331-019d35b6-42da-71e8-a23f-17e06e63e336.codepen.dev/',
    'https://es-d-5927833420260331-019d35c8-6e69-7bba-9adc-38275de6f7ca.codepen.dev/',
    'https://es-d-6681629020260406-019d59e3-a37f-7501-934b-600ada71d3d6.codepen.dev/'
  ];

  const TILES = [
    {type:'special', id:'start', name:'START', icon:'🏁', effect:'start', step:0},
    {type:'game', id:'basket_1', name:'BASKET', icon:'🏀', family:'basket', kind:'timing', reward:110, url:GAME_URLS[0]},
    {type:'game', id:'labirint', name:'LABIRINTO', icon:'🗺️', family:'maze', kind:'progress', reward:100, url:GAME_URLS[10]},
    {type:'special', id:'bonus_1', name:'BONUS +3', icon:'⭐', effect:'bonus'},
    {type:'game', id:'bomber_1', name:'BOMBER', icon:'💣', family:'bomber', kind:'choice', reward:105, url:GAME_URLS[6]},
    {type:'game', id:'void', name:'VOID', icon:'🚀', family:'shooter', kind:'progress', reward:145, url:GAME_URLS[3]},
    {type:'game', id:'tufusion', name:'TUFUSION', icon:'🎭', family:'fusion', kind:'progress', reward:140, url:GAME_URLS[11]},
    {type:'special', id:'trap_1', name:'CAPCANĂ', icon:'💀', effect:'trap'},
    {type:'game', id:'hockey_1', name:'HOCKEY', icon:'🏒', family:'hockey', kind:'timing', reward:108, url:GAME_URLS[5]},
    {type:'game', id:'ttt', name:'TICTACTO', icon:'❌', family:'ttt', kind:'board', reward:90, url:GAME_URLS[2]},
    {type:'game', id:'bounce', name:'BOUNCE', icon:'🔵', family:'bounce', kind:'timing', reward:95, url:GAME_URLS[8]},
    {type:'special', id:'bonus_2', name:'BONUS +4', icon:'⭐', effect:'bonus'},
    {type:'game', id:'memory_1', name:'MEMORY', icon:'🃏', family:'memory', kind:'memory', reward:96, url:GAME_URLS[14]},
    {type:'game', id:'breakout_1', name:'BREAKOUT', icon:'📦', family:'breakout', kind:'progress', reward:108, url:GAME_URLS[7]},
    {type:'special', id:'trap_2', name:'CAPCANĂ', icon:'💀', effect:'trap'},
    {type:'game', id:'basket_2', name:'BASKET +', icon:'🏀', family:'basket', kind:'timing', reward:132, url:GAME_URLS[1]},
    {type:'game', id:'pvai', name:'PVAI', icon:'⚔️', family:'pvai', kind:'duel', reward:150, url:GAME_URLS[4]},
    {type:'special', id:'bonus_3', name:'BONUS +2', icon:'⭐', effect:'bonus'},
    {type:'game', id:'shooter_2', name:'SHOOTER', icon:'🚀', family:'shooter', kind:'progress', reward:152, url:GAME_URLS[9]},
    {type:'game', id:'bomba_2', name:'BOMBA!', icon:'💣', family:'bomber', kind:'choice', reward:110, url:GAME_URLS[6]},
    {type:'game', id:'mem_pro', name:'MEM.PRO', icon:'🃏', family:'memory', kind:'memory', reward:103, url:GAME_URLS[14]},
    {type:'game', id:'hockey_2', name:'HOCKEY +', icon:'🏒', family:'hockey', kind:'timing', reward:114, url:GAME_URLS[5]},
    {type:'game', id:'breakout_2', name:'BREAKOUT', icon:'📦', family:'breakout', kind:'progress', reward:112, url:GAME_URLS[7]},
    {type:'game', id:'fusion_2', name:'FUSION +', icon:'🎭', family:'fusion', kind:'progress', reward:148, url:GAME_URLS[12]}
  ];

  global.AW_CONFIG = {
    GAME_URLS,
    TILES,
    TOP_IDS:[0,1,2,3,4,5,6],
    RIGHT_IDS:[7,8,9,10,11],
    BOTTOM_IDS:[12,13,14,15,16,17,18],
    LEFT_IDS:[19,20,21,22,23],
    STORAGE:'arcade_world_v24_master',
    PROFILE_PREFIX:'arcade_world_v24_slot_',
    THEMES:['theme-cyan','theme-purple','theme-sunset'],
    SPECIAL_START_PASS_REWARD:{coins:40,xp:25},
  };
})(window);
