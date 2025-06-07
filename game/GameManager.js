import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createRenderer } from './renderer.js';
import { createDirectionalLight, createAmbientLight } from './lighting.js';
import { createPlayer } from './player.js';
import { initializeMap } from './world.js';
import { setupControls } from './controls.js';
import { detectCollision } from './collision.js';
import { Car, Truck, moveVehicle, resetVehiclePosition } from './vehicles.js';

export function initGame(container) {
  const scene = new THREE.Scene();

  // Camera & Renderer
  const camera = createCamera();
  const renderer = createRenderer(container);

  // Lighting
  const directionalLight = createDirectionalLight();
  const ambientLight = createAmbientLight();
  scene.add(directionalLight, ambientLight);

  // Player
  const player = createPlayer();
  scene.add(player);

  // World terrain
  initializeMap(scene);

  // Vehicles
  const vehicles = [];

  const vehicleConfigs = [
    { type: 'car', index: -2, row: 1, direction: 1 },
    { type: 'truck', index: 0, row: 3, direction: -1 },
    { type: 'car', index: 2, row: 5, direction: 1 }
  ];

  vehicleConfigs.forEach(({ type, index, row, direction }) => {
    const vehicle = type === 'car' ? Car(index, direction) : Truck(index, direction);
    vehicle.position.y = row * 42;
    vehicle.userData = { direction };
    vehicles.push(vehicle);
    scene.add(vehicle);
  });

  // Controls
  setupControls(player, () => {
    detectCollision(player, vehicles);
  });

  // Camera setup
  camera.position.set(0, -300, 200);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  // Game loop
  function gameLoop(time = 0) {
    const delta = time * 0.001;
    const speed = 20;
    const limit = 150;

    vehicles.forEach(vehicle => {
      moveVehicle(vehicle, speed, delta);
      resetVehiclePosition(vehicle, limit);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}
