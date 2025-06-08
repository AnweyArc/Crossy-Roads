import * as THREE from 'three';

export function createCamera() {
  const fov = 45; // Field of view
  const aspect = window.innerWidth / window.innerHeight;
  const near = 1;
  const far = 10000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // Position camera behind and above player
  camera.position.set(0, -300, 200); // Adjust as needed
  camera.up.set(0, 0, 1);

  // Look slightly ahead of the origin (player will be near 0,0)
  camera.lookAt(new THREE.Vector3(0, 100, 0));

  return camera;
}

export function updateCamera(camera, player) {
  // Position camera relative to player
  // Behind on Y axis, above on Z axis
  camera.position.x = player.position.x;
  camera.position.y = player.position.y - 300; // behind player
  camera.position.z = player.position.z + 200; // above player

  // Look at a point slightly ahead of player to give forward view
  const lookAtPoint = new THREE.Vector3(
    player.position.x,
    player.position.y + 100,
    player.position.z
  );

  camera.lookAt(lookAtPoint);
}
