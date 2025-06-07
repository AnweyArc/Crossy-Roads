import * as THREE from 'three';

const LANE_HEIGHT = 42;

export const spawnVehicle = (type, laneIndex, lanePosition, direction = 1) => {
  const length = type === 'truck' ? 3 : 2;
  const color = type === 'truck' ? 0x0000ff : 0xff0000;

  const vehicle = new THREE.Mesh(
    new THREE.BoxGeometry(length * 10, 4, 4),
    new THREE.MeshLambertMaterial({ color })
  );

  vehicle.position.set(lanePosition, laneIndex * LANE_HEIGHT, 2);
  vehicle.userData = { type, direction };
  vehicle.castShadow = true;
  vehicle.receiveShadow = true;
  return vehicle;
};

export const moveVehicle = (vehicle, speed, delta) => {
  const dir = vehicle.userData.direction || 1;
  vehicle.position.x += speed * delta * dir;
};

export const resetVehiclePosition = (vehicle, limit) => {
  const dir = vehicle.userData.direction || 1;
  if (dir > 0 && vehicle.position.x > limit) {
    vehicle.position.x = -limit;
  } else if (dir < 0 && vehicle.position.x < -limit) {
    vehicle.position.x = limit;
  }
};
