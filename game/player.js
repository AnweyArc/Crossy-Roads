import * as THREE from 'three';
import { tileSize } from "./constants.js";
import { onPlayerMove } from './collision.js'; // Import movement tracker

export function createPlayer() {
  const player = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({ color: "white", flatShading: true })
  );
  body.position.z = 10;
  player.add(body);

  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(2, 4, 2),
    new THREE.MeshLambertMaterial({ color: 0xf0619a, flatShading: true })
  );
  cap.position.z = 21;
  player.add(cap);

  return player; // Return the actual player group directly
}

// Call this function when player moves, and notify collision logic
export function movePlayer(player, direction) {
  const moveDistance = tileSize;

  switch (direction) {
    case 'up':
      player.position.y += moveDistance;
      break;
    case 'down':
      player.position.y -= moveDistance;
      break;
    case 'left':
      player.position.x -= moveDistance;
      break;
    case 'right':
      player.position.x += moveDistance;
      break;
  }

  onPlayerMove(); // Notify collision system that the player has moved
}
