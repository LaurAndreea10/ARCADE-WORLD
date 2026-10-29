/* Result summary only: a standalone ride never claims a board tile. */
(function(root,factory){const valid=factory();if(typeof module==='object'&&module.exports)module.exports=valid;else root.validCarpatiEnduroResult=valid})(typeof globalThis!=='undefined'?globalThis:this,function(){
 return function(event,frameWindow,active){const d=event&&event.data;return active==='carpatienduro'&&event.origin==='https://laurandreea10.github.io'&&event.source===frameWindow&&!!d&&d.type==='GAME_SCORE'&&d.gameId==='carpati-enduro'&&typeof d.completed==='boolean'&&Number.isInteger(d.score)&&d.score>=0&&d.score<=100&&Number.isFinite(d.time)&&d.time>=0&&d.time<=86400&&Number.isInteger(d.crashes)&&d.crashes>=0&&d.crashes<=999&&typeof d.version==='string'&&/^\d+\.\d+\.\d+$/.test(d.version)};
});
