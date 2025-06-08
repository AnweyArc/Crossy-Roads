import * as THREE from 'three';

export function createCamera() {
  const size = 300;
  const viewRatio = window.innerWidth / window.innerHeight;
  const width = viewRatio < 1 ? size : size * viewRatio;
  const height = viewRatio < 1 ? size / viewRatio : size;

  const camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    1,     // near plane closer to 1
    1000   // far plane far away
  );

  camera.up.set(0, 0, 1);
  camera.position.set(300, -300, 300);
  camera.lookAt(0, 0, 0);

  return camera;
}

export function updateCamera(camera, player) {
  camera.position.y = player.position.y + 300; // ahead of player (not behind)
  camera.lookAt(new THREE.Vector3(0, player.position.y, 0));
}

