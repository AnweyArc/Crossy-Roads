import * as THREE from 'three';
import { tileSize } from "./constants.js";
import { treeObstacles } from "./map.js"; // Import obstacle list
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

  // Calculate proposed new position
  const newPos = player.position.clone();
  switch (direction) {
    case 'up':
      newPos.y += moveDistance;
      break;
    case 'down':
      newPos.y -= moveDistance;
      break;
    case 'left':
      newPos.x -= moveDistance;
      break;
    case 'right':
      newPos.x += moveDistance;
      break;
  }

  // Check for tree obstacle at new tile
  const newTileX = Math.round(newPos.x / tileSize);
  const newTileY = Math.round(newPos.y / tileSize);

  const blocked = treeObstacles.some(ob => {
    const obTileX = Math.round(ob.x / tileSize);
    const obTileY = Math.round(ob.y / tileSize);
    return obTileX === newTileX && obTileY === newTileY;
  });

  if (blocked) {
    console.log("Blocked by tree!");
    return;
  }

  player.position.copy(newPos);
  onPlayerMove();
}

