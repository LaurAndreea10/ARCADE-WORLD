(function(global){
  function defaultPlayer(i){
    return {
      id:i,name:'P'+(i+1),position:0,coins:120,xp:0,level:1,totalWins:0,bonusTurns:0,skipTurns:0,
      completed:[],visited:[0],questsDone:[],inventory:{shield:0,reroll:0,double:0,themeToken:0},
      badges:{},stats:{},history:[],boardPasses:0,bonusHits:0,trapHits:0,shopBuys:0,
      full:{started:0,finished:0,wins:0,lastResult:null,lastHeartbeat:0,connected:false},
      chests:{common:0,rare:0,epic:0},unlocks:{}
    };
  }
  function defaultSave(){
    return {players:[defaultPlayer(0),defaultPlayer(1)],activePlayer:0,selectedTile:0,sound:true,themeIndex:0,multiplayerCount:2};
  }
  function createState(){
    return {
      activePlayer:0,selectedTile:0,mode:null,difficulty:null,screenTab:'modes',sound:true,
      timer:null,aux:null,animating:false,daily:null,fullSession:null,basketSession:null,themeIndex:0,
      players:[], multiplayerCount:2
    };
  }
  global.AW_STATE = {state:createState(), defaultPlayer, defaultSave, createState};
})(window);
