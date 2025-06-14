import { movePlayer } from './player.js';
import { checkCoinPickup } from './coinPickupHandler.js'; // ✅ import this

export function setupControls(player, scene) {
  window.addEventListener('keydown', (event) => {
    let moved = false;

    switch (event.key) {
      case 'ArrowUp':
        movePlayer(player, 'up');
        moved = true;
        break;
      case 'ArrowDown':
        movePlayer(player, 'down');
        moved = true;
        break;
      case 'ArrowLeft':
        movePlayer(player, 'left');
        moved = true;
        break;
      case 'ArrowRight':
        movePlayer(player, 'right');
        moved = true;
        break;
    }

    if (moved) {
      checkCoinPickup(player, scene); // ✅ check here after move
    }
  });
}
