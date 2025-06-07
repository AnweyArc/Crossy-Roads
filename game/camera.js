import * as THREE from 'three';

export function createCamera() {
  const size = 400; // bigger size to cover more area
  const viewRatio = window.innerWidth / window.innerHeight;
  const width = viewRatio < 1 ? size : size * viewRatio;
  const height = viewRatio < 1 ? size / viewRatio : size;

  const camera = new THREE.OrthographicCamera(
    width / -2, width / 2,
    height / 2, height / -2,
    1, 1000
  );
  camera.up.set(0, 0, 1);
  camera.position.set(0, -300, 200);
  camera.lookAt(0, 0, 0);

  return camera;
}
