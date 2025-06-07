import * as THREE from 'three';

export function detectCollision(player, vehicles) {
    const playerBox = new THREE.Box3().setFromObject(player);
  
    for (const vehicle of vehicles) {
      const vehicleBox = new THREE.Box3().setFromObject(vehicle);
      if (playerBox.intersectsBox(vehicleBox)) {
        alert('Game Over!');
        window.location.reload(); // Restart game
        break;
      }
    }
  }