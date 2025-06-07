import * as THREE from 'three';

export function createDirectionalLight() {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-100, -100, 200);
  light.castShadow = true;

  light.shadow.mapSize.set(2048, 2048);
  light.shadow.camera.left = -400;
  light.shadow.camera.right = 400;
  light.shadow.camera.top = 400;
  light.shadow.camera.bottom = -400;
  light.shadow.camera.near = 50;
  light.shadow.camera.far = 400;

  return light;
}

export function createAmbientLight() {
  return new THREE.AmbientLight(0xffffff, 0.4);
}
