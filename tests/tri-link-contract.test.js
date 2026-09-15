import {describe,it,expect} from 'vitest';

const ORIGIN='https://laurandreea10.github.io';
function validTriLinkEvent(event,frameWindow,session){
 const d=event.data||{};
 return event.origin===ORIGIN&&event.source===frameWindow&&d.type==='ARCADE_GAME_RESULT'&&d.gameId==='tri-link-quest'&&d.completed===true&&session?.triLink===true;
}

describe('Tri-Link iframe result contract',()=>{
 const frame={};const session={triLink:true};
 const good={origin:ORIGIN,source:frame,data:{type:'ARCADE_GAME_RESULT',gameId:'tri-link-quest',completed:true,stage:'connect',score:900}};
 it('accepts a valid result from the active iframe',()=>expect(validTriLinkEvent(good,frame,session)).toBe(true));
 it('rejects another origin',()=>expect(validTriLinkEvent({...good,origin:'https://evil.example'},frame,session)).toBe(false));
 it('rejects another window',()=>expect(validTriLinkEvent({...good,source:{}},frame,session)).toBe(false));
 it('rejects an inactive session',()=>expect(validTriLinkEvent(good,frame,null)).toBe(false));
 it('rejects a different game id',()=>expect(validTriLinkEvent({...good,data:{...good.data,gameId:'other'}},frame,session)).toBe(false));
});
