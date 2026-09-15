/* global document, window, localStorage */
(function(){
  'use strict';

  const GITHUB='https://github.com/LaurAndreea10/';
  const PAGES='https://laurandreea10.github.io/';
  const games=[
    ['basket','BASKET VS AI','🏀','sports','classic','BASKET-VS-AI'],
    ['basket-pro','BASKET VS AI PRO','🏀','sports','enhanced','BASKET-VS-AI-PRO'],
    ['tic-tac-toe','Tic Tac Toe','❌','strategy','classic','Tic-Tac-Toe'],
    ['void-hunter','VOID HUNTER — Space Shooter','🚀','action','classic','VOID-HUNTER-Space-Shooter'],
    ['pvai','PvAI — New Game+','⚔️','strategy','enhanced','PvAI'],
    ['air-hockey','Home Air Hockey','🏒','sports','classic','Home-Air-Hockey'],
    ['bomberman','Bomberman Neo','💣','action','classic','-Bomberman-Neo'],
    ['breakout','Breakout 2','🧱','arcade','enhanced','Breakout2'],
    ['flappy-ball','Flappy Ball','🐦','reflex','classic','Flappy-Ball'],
    ['bounce-ball','Bounce Ball','🔵','reflex','classic','Bounce-Ball'],
    ['maze-adventure','Maze Adventure','🗺️','puzzle','enhanced','Maze-Adventure'],
    ['arcade-fusion-mobile','Arcade Fusion Mobile','🎭','arcade','classic','Arcade-Fusion-Mobile-Game'],
    ['arcade-fusion','Arcade Fusion','🎮','arcade','classic','Arcade-Fusion'],
    ['arcade-fusion-3','Arcade Fusion 3','🕹️','arcade','enhanced','Arcade-fusion-3'],
    ['particle-memory','Particle Memory','🃏','puzzle','classic','PARTICLE-MEMORY'],
    ['pizza-game','Pizza Game','🍕','puzzle','enhanced','Pizza-Game'],
    ['pizza-chef','Pizza Chef Deluxe','👨‍🍳','puzzle','enhanced','Pizza-Chef-Deluxe'],
    ['signal-garden','Signal Garden','🌱','accessible','enhanced','Signal-Garden'],
    ['cosmic-relay','LOOP — Cosmic Relay','🪐','accessible','enhanced','LOOP-Cosmic-Relay'],
    ['velocity-x','VELOCITY X','🏎️','racing','enhanced','VELOCITYX'],
    ['starforge-maze','StarForge Maze','🌌','puzzle','enhanced','StarForge-Maze'],
    ['neon-island','Neon Island Run 3D','🏝️','racing','enhanced','Neon-Island-Run-3D'],
    ['garden-match','Garden Match Masters','🌺','puzzle','enhanced','Garden-Match-Masters'],
    ['surfin-bird','Surfin Bird Quest Premium','🏄','racing','enhanced','Surfin-bird-quest-premium'],
    ['surf-run','SURF RUN','🌊','racing','classic','SURF-RUN'],
    ['surf-run-2','Surf Run 2','🏄‍♀️','racing','enhanced','Surf-run-2'],
    ['hexwords','HexWords 2048','🔤','puzzle','enhanced','HexWords-2048'],
    ['gravity-draw','Gravity Draw','🪄','creative','classic','Gravity-Draw'],
    ['reef-rush','Reef Rush','🐠','action','enhanced','Reef-Rush'],
    ['neon-drift','Neon Drift','🌃','racing','enhanced','Neon-Drift'],
    ['blockforge','BlockForge','🧱','creative','enhanced','BlockForge-CodePen-Challenge-Blocks'],
    ['signal-orbit','LaurAI — Signal Orbit','📡','reflex','enhanced','LAURAI-SIGNAL-ORBIT'],
    ['bounce-signal','LaurAI — Bounce Signal','📧','reflex','enhanced','LAURAI-BOUNCE-SIGNAL'],
    ['useless-addictive','Useless but Addictive','✨','arcade','classic','Useless-but-addictive'],
    ['nexus-arcade','Nexus Arcade','🔮','arcade','enhanced','Nexus-arcade'],
    ['nexus-protocol','Nexus Protocol','🧬','strategy','enhanced','Nexus-protocol-'],
    ['excel-quest','Excel Quest','📊','learning','enhanced','Excel-Quest'],
    ['arcade-ops','ARCADE OPS — Excel Quest','🏢','learning','enhanced','ARCADE-OPS-EXCEL-QUEST'],
    ['arcade-ops-hq','ARCADE OPS HQ','🛰️','learning','enhanced','ARCADE-OPS-HQ'],
    ['access-coach','Access Arcade Coach Premium','♿','accessible','enhanced','Access-arcade-coach-premium'],
    ['learnflow','LearnFlow Accessible','🧠','accessible','enhanced','learnflow-accessible'],
    ['take-a-slice','Take a Slice','🍰','creative','enhanced','Take-a-Slice-']
  ].map(([id,title,icon,category,edition,repo])=>({id,title,icon,category,edition,repo,play:PAGES+repo+'/'}));

  const labels={classic:'Classic Board',expanded:'Expanded Worlds',all:'All Games'};
  let version=localStorage.getItem('arcade-world-version')||'classic';
  let category='all';

  function card(game){
    return '<article class="aw-game-card" data-category="'+game.category+'"><div class="aw-game-icon" aria-hidden="true">'+game.icon+'</div><h4>'+game.title+'</h4><p>Versiune '+(game.edition==='enhanced'?'nouă / extinsă':'clasică')+' păstrată separat în universul ARCADE WORLD.</p><div class="aw-game-meta"><span class="aw-game-tag">'+game.category+'</span><span class="aw-game-tag">'+game.edition+'</span></div><div class="aw-game-actions"><a class="aw-game-link" href="'+game.play+'" target="_blank" rel="noopener noreferrer">Joacă</a><a class="aw-game-link aw-game-link--repo" href="'+GITHUB+game.repo+'" target="_blank" rel="noopener noreferrer">Cod</a></div></article>';
  }

  function groups(list){
    const order=['accessible','arcade','action','racing','puzzle','sports','strategy','reflex','learning','creative'];
    return order.map(type=>{const subset=list.filter(g=>g.category===type);return subset.length?'<section class="aw-game-section"><h3>'+type[0].toUpperCase()+type.slice(1)+' · '+subset.length+'</h3><div class="aw-game-grid">'+subset.map(card).join('')+'</div></section>':''}).join('');
  }

  function render(){
    document.body.dataset.awVersion=version;
    document.querySelectorAll('.aw-version-btn').forEach(btn=>btn.setAttribute('aria-selected',String(btn.dataset.version===version)));
    const portal=document.getElementById('awGamesPortal');
    if(!portal)return;
    portal.hidden=version==='classic';
    const query=(document.getElementById('awGameSearch')?.value||'').trim().toLowerCase();
    let list=games.filter(g=>(category==='all'||g.category===category)&&(!query||(g.title+' '+g.category+' '+g.repo).toLowerCase().includes(query)));
    if(version==='expanded')list=list.filter(g=>g.edition==='enhanced');
    document.getElementById('awCatalogTitle').textContent=labels[version]||labels.all;
    document.getElementById('awCatalogCount').textContent=list.length+' jocuri · identități și linkuri separate';
    document.getElementById('awGameResults').innerHTML=list.length?groups(list):'<div class="aw-empty">Nu am găsit jocuri pentru filtrul ales.</div>';
  }

  function init(){
    const hero=document.querySelector('.hero');
    if(!hero||document.getElementById('awVersionNav'))return;
    const nav=document.createElement('div');
    nav.id='awVersionNav';nav.className='aw-version-nav';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Versiune ARCADE WORLD');
    nav.innerHTML=Object.entries(labels).map(([id,label])=>'<button class="aw-version-btn" role="tab" data-version="'+id+'" aria-selected="false">'+label+'</button>').join('');
    hero.appendChild(nav);
    const portal=document.createElement('main');
    portal.id='awGamesPortal';portal.className='aw-games-portal';portal.hidden=true;
    const cats=['all',...new Set(games.map(g=>g.category))];
    portal.innerHTML='<header class="aw-catalog-hero"><div class="eyebrow">ARCADE WORLD · Version Library</div><h2 id="awCatalogTitle">All Games</h2><p id="awCatalogCount"></p><div class="aw-catalog-tools"><label><span class="sr-only">Caută joc</span><input id="awGameSearch" class="aw-game-search" type="search" placeholder="Caută joc, categorie sau repository…" autocomplete="off"></label><div class="aw-filter-row" aria-label="Filtre categorii">'+cats.map(c=>'<button class="aw-filter'+(c==='all'?' is-active':'')+'" data-category="'+c+'">'+c+'</button>').join('')+'</div></div></header><div id="awGameResults" aria-live="polite"></div>';
    document.querySelector('.app').after(portal);
    nav.addEventListener('click',event=>{const btn=event.target.closest('[data-version]');if(!btn)return;version=btn.dataset.version;localStorage.setItem('arcade-world-version',version);render();window.scrollTo({top:0,behavior:'smooth'});});
    portal.addEventListener('click',event=>{const btn=event.target.closest('[data-category]');if(!btn)return;category=btn.dataset.category;portal.querySelectorAll('.aw-filter').forEach(x=>x.classList.toggle('is-active',x===btn));render();});
    portal.querySelector('#awGameSearch').addEventListener('input',render);
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.ARCADE_WORLD_GAMES=Object.freeze(games.slice());
})();
