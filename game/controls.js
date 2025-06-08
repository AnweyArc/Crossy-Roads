import { movePlayer } from './player.js';

export function setupControls(player, collisionCallback) {
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

    // Only check collision if a move was attempted
    if (moved && collisionCallback) {
      collisionCallback();
    }
  });
}
