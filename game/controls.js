const THREE = require('three');

export function setupControls(player, collisionCallback) {
  window.addEventListener('keydown', (event) => {
    const step = 10;
    switch (event.key) {
      case 'ArrowUp':
        player.position.y += step;
        break;
      case 'ArrowDown':
        player.position.y -= step;
        break;
      case 'ArrowLeft':
        player.position.x -= step;
        break;
      case 'ArrowRight':
        player.position.x += step;
        break;
    }
    if (collisionCallback) collisionCallback();
  });
}
