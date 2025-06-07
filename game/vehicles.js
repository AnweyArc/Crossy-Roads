import * as THREE from 'three';

export const spawnVehicles = (type, x, z) => {
  const length = type === 'truck' ? 3 : 2;
  const vehicle = new THREE.Mesh(
    new THREE.BoxGeometry(length, 1, 1),
    new THREE.MeshLambertMaterial({ color: type === 'truck' ? 0x0000ff : 0xff0000 })
  );
  vehicle.position.set(x, 0.5, z);
  vehicle.userData = { type };
  return vehicle;
};

export const moveVehicle = (vehicle, speed, delta, direction = 1) => {
  vehicle.position.x += speed * delta * direction;
};
