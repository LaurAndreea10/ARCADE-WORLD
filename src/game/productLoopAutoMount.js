import { installArcadeProductLoopUi } from './productLoopUi.js';

window.addEventListener('DOMContentLoaded', () => {
  installArcadeProductLoopUi({
    enableDebugActions: false,
    decorateTiles: true,
  });
});
