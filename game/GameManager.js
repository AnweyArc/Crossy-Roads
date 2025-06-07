import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createRenderer } from './renderer.js';
import { createDirectionalLight, createAmbientLight } from './lighting.js';
import { createPlayer } from './player.js';
import { initializeMap } from './world.js';
import { setupControls } from './controls.js';
import { detectCollision } from './collision.js';
import { spawnVehicle, moveVehicle, resetVehiclePosition } from './vehicles.js';

export function initGame(container) {
  const scene = new THREE.Scene();
  const camera = createCamera();
  const renderer = createRenderer(container);
  const player = createPlayer();
  const directionalLight = createDirectionalLight();
  const ambientLight = createAmbientLight();

  scene.add(player);
  scene.add(directionalLight);
  scene.add(ambientLight);

  initializeMap(scene);

  const vehicles = [];

  vehicles.push(spawnVehicle('car', 1, -50, 1));   // row 1, left lane, moving right
  vehicles.push(spawnVehicle('truck', 3, 0, -1));  // row 3, center lane, moving left
  vehicles.push(spawnVehicle('car', 5, 50, 1));    // row 5, right lane, moving right

  vehicles.forEach(v => scene.add(v));

  setupControls(player, () => {
    detectCollision(player, vehicles);
  });

  camera.position.set(0, -300, 200);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  function gameLoop(time = 0) {
    const delta = time * 0.001;
    const speed = 20;
    const limit = 100;

    vehicles.forEach(vehicle => {
      moveVehicle(vehicle, speed, delta);
      resetVehiclePosition(vehicle, limit);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}
