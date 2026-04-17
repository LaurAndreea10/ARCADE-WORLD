(function(global){
  function getOrigin(url){
    try { return new URL(url, global.location.href).origin; } catch (_) { return null; }
  }
  function createBridge(options){
    const bridge = {
      session: null,
      open(meta){
        const allowedOrigin = getOrigin(meta.url);
        bridge.session = Object.assign({
          id: `full-${Date.now()}`,
          allowedOrigin,
          startedAt: Date.now(),
          status: 'opening',
          score: 0,
          reconnects: 0,
          lastEventAt: 0,
        }, meta);
        return bridge.session;
      },
      close(){ bridge.session = null; },
      isAllowed(event){
        if(!bridge.session) return false;
        if(!bridge.session.allowedOrigin) return true;
        return event.origin === bridge.session.allowedOrigin;
      },
      receive(event){
        if(!bridge.session || !event || !event.data || typeof event.data !== 'object') return null;
        const data = event.data;
        if(!String(data.type || '').startsWith('arcade-world-')) return null;
        if(!bridge.isAllowed(event)) return { kind:'ignored-origin', data };
        bridge.session.lastEventAt = Date.now();
        if(data.type === 'arcade-world-handshake') bridge.session.status = 'connected';
        if(data.type === 'arcade-world-start') bridge.session.status = 'started';
        if(data.type === 'arcade-world-progress') {
          bridge.session.status = 'progress';
          bridge.session.score = Number(data.score || bridge.session.score || 0);
        }
        if(data.type === 'arcade-world-reconnect') {
          bridge.session.status = 'reconnected';
          bridge.session.reconnects += 1;
        }
        if(data.type === 'arcade-world-timeout') bridge.session.status = 'timeout';
        if(data.type === 'arcade-world-result') {
          bridge.session.status = data.result || 'result';
          bridge.session.score = Number(data.score || bridge.session.score || 0);
        }
        return { kind:'accepted', data, session: bridge.session };
      }
    };
    return bridge;
  }
  global.AW_BRIDGE = { createBridge };
})(window);
