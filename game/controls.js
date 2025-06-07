import { tileSize } from './constants.js';

export function setupControls(player, onMove = () => {}) {
  const keys = new Set();

  const movePlayer = (dx, dz) => {
    player.position.x += dx * tileSize;
    player.position.z += dz * tileSize;
    onMove(); // Safe now
  };

  const keyDownHandler = (e) => {
    if (keys.has(e.code)) return;
    keys.add(e.code);
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        movePlayer(0, 1);
        break;
      case 'ArrowDown':
      case 'KeyS':
        movePlayer(0, -1);
        break;
      case 'ArrowLeft':
      case 'KeyA':
        movePlayer(-1, 0);
        break;
      case 'ArrowRight':
      case 'KeyD':
        movePlayer(1, 0);
        break;
    }
  };
  document.getElementById("forward")?.addEventListener("click", () => movePlayer(0, -1));
  document.getElementById("backward")?.addEventListener("click", () => movePlayer(0, 1));
  document.getElementById("left")?.addEventListener("click", () => movePlayer(-1, 0));
  document.getElementById("right")?.addEventListener("click", () => movePlayer(1, 0));


  const keyUpHandler = (e) => keys.delete(e.code);

  // Attach listeners
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);

  // Optional cleanup
  return () => {
    window.removeEventListener('keydown', keyDownHandler);
    window.removeEventListener('keyup', keyUpHandler);
  };
}
