import { installArcadeProductLoopUi } from './productLoopUi.js';

const mountProductLoop = () => {
  if (window.ArcadeProductLoop?.root?.isConnected) return;
  installArcadeProductLoopUi({
    enableDebugActions: false,
    decorateTiles: true,
  });
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', mountProductLoop, { once: true });
} else {
  mountProductLoop();
}
