import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createRenderer } from './renderer.js';
import { createDirectionalLight } from './lighting.js';
import { createPlayer } from './player.js';
import { initializeMap } from './world.js';
import { animate } from './animation.js';
import { setupControls } from './controls.js';
import { detectCollision } from './collision.js';
import { createGrass } from './terrain.js';
import { spawnVehicles } from './vehicles.js';

export function initGame(container) {
  const scene = new THREE.Scene();
  const camera = createCamera();
  const renderer = createRenderer(container);
  const player = createPlayer();
  const light = createDirectionalLight();

  scene.add(camera, light, player);

  initializeMap(scene);        // Setup world
  createGrass(0);              // If needed (if not in world.js)

  const vehicles = spawnVehicles(scene);  // <-- Capture vehicles array

  setupControls(player, () => {
    detectCollision(player, vehicles);
  });  

  animate(renderer, scene, camera);
}
