import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createRenderer } from './renderer.js';
import { createDirectionalLight } from './lighting.js';
import { createPlayer } from './player.js';
import { initializeMap } from './world.js';  // initializes grass, roads, trees
import { animate } from './animation.js';
import { setupControls } from './controls.js';
import { detectCollision } from './collision.js';
import { spawnVehicle, moveVehicle, resetVehiclePosition } from './vehicles.js';

export function initGame(container) {
  const scene = new THREE.Scene();
  const camera = createCamera();
  const renderer = createRenderer(container);
  const player = createPlayer();
  const light = createDirectionalLight();

  scene.add(camera, light, player);

  // Initialize map (adds grass, roads, trees)
  initializeMap(scene);

  // Vehicles array to hold all vehicle meshes
  const vehicles = [];

  // Example spawn positions for vehicles aligned with roads/lanes
  // Adjust 'z' values based on road lane positions in your world
  vehicles.push(spawnVehicle('car', -10, 0));     // Lane 0
  vehicles.push(spawnVehicle('truck', -20, 1));   // Lane 1
  vehicles.push(spawnVehicle('car', -30, 0));     // Lane 0

  // Add all vehicles to the scene
  vehicles.forEach(vehicle => scene.add(vehicle));

  // Setup player controls and collision detection against vehicles
  setupControls(player, () => {
    detectCollision(player, vehicles);
  });

  // Game loop for animation and updates
  function gameLoop(time) {
    const delta = time ? time * 0.001 : 0; // Convert ms to seconds

    // Update vehicles: move forward and reset if out of bounds
    const speed = 5;
    const limit = 30;

    vehicles.forEach(vehicle => {
      moveVehicle(vehicle, speed, delta);
      resetVehiclePosition(vehicle, limit);
    });

    // Render scene and camera
    animate(renderer, scene, camera);

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}
