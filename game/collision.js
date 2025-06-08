import * as THREE from 'three';

let gameStartTime = Date.now();
let playerHasMoved = false;
let gameOver = false;

// Call this when the player makes a valid move
export function onPlayerMove() {
  playerHasMoved = true;
}

export function detectCollision(player, vehicles) {
  if (gameOver) return;

  // Skip collision check during grace period
  if (Date.now() - gameStartTime < 2000) return;

  // Skip if player hasn't moved yet
  if (!playerHasMoved) return;

  const playerBox = new THREE.Box3().setFromObject(player);

  for (const vehicle of vehicles) {
    const vehicleBox = new THREE.Box3().setFromObject(vehicle);
    if (playerBox.intersectsBox(vehicleBox)) {
      gameOver = true;
      alert('Game Over!');
      window.location.reload();
      break;
    }
  }
}
