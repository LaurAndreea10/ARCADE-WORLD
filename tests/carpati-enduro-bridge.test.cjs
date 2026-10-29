const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const context={};vm.runInNewContext(fs.readFileSync(__dirname+'/../src/integration/carpatiEnduroBridge.js','utf8'),context);const valid=context.validCarpatiEnduroResult;
const frame={},good={origin:'https://laurandreea10.github.io',source:frame,data:{type:'GAME_SCORE',gameId:'carpati-enduro',completed:true,score:90,time:55.25,crashes:2,version:'2.0.0'}};
test('accepts a bounded result only from the active game iframe',()=>assert.equal(valid(good,frame,'carpatienduro'),true));
test('rejects origin/source/session spoofing',()=>{assert.equal(valid({...good,origin:'https://evil.example'},frame,'carpatienduro'),false);assert.equal(valid({...good,source:{}},frame,'carpatienduro'),false);assert.equal(valid(good,frame,'kygo'),false)});
test('rejects malformed and unbounded score messages',()=>{for(const data of [{...good.data,score:Infinity},{...good.data,time:-1},{...good.data,crashes:1.5},{...good.data,completed:'yes'},{...good.data,version:'<img>'},null])assert.equal(valid({...good,data},frame,'carpatienduro'),false)});
