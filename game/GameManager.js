import * as THREE from 'three';
import { createCamera, updateCamera } from './camera.js';
import { createRenderer } from './renderer.js';
import { createDirectionalLight, createAmbientLight } from './lighting.js';
import { createPlayer } from './player.js';
import { map, initializeMap, addRows, metadata, activeVehicles } from './map.js';
import { setupControls } from './controls.js';
import { detectCollision } from './collision.js';
import {
  moveVehicle,
  resetVehiclePosition,
  LANE_HEIGHT
} from './vehicles.js';

export function initGame(container) {
  const scene = new THREE.Scene();

  // Camera & Renderer
  const camera = createCamera();
  const renderer = createRenderer(container);
  const clock = new THREE.Clock();

  // Lighting
  const directionalLight = createDirectionalLight();
  const ambientLight = createAmbientLight();
  scene.add(directionalLight, ambientLight);

  // Player
  const player = createPlayer();
  scene.add(player);

  // World terrain
  initializeMap();
  scene.add(map);

  // Controls with collision callback
  setupControls(player, () => {
    detectCollision(player, activeVehicles);
  });

  // Camera setup
  camera.position.set(0, -200, 200); // Adjusted to better frame the player
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  // Endless logic
  let maxRowGenerated = metadata.length;

  // Game loop
  function gameLoop() {
    const delta = clock.getDelta();
    const limit = 150;
    const playerY = player.position.y;

    // Move and despawn vehicles far behind the player
    for (let i = activeVehicles.length - 1; i >= 0; i--) {
      const vehicle = activeVehicles[i];
    
      if (vehicle.position.y < playerY - 300) {
        vehicle.parent?.remove(vehicle);
        activeVehicles.splice(i, 1);
        continue;
      }
    
      moveVehicle(vehicle, vehicle.userData.speed || 20, delta);
      resetVehiclePosition(vehicle, limit);
    }
    

    updateCamera(camera, player);
    detectCollision(player, activeVehicles);

    // Add new rows when player advances
    const playerRow = Math.floor(-player.position.y / LANE_HEIGHT);
    if (playerRow + 10 > maxRowGenerated) {
      addRows(10);
      maxRowGenerated = metadata.length;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(gameLoop);
  }

  gameLoop(); // Start the game loop
}
