import * as THREE from 'three';
import {
  carFrontTexture, carBackTexture, carRightSideTexture, carLeftSideTexture,
  truckFrontTexture, truckBackTexture, truckRightSideTexture, truckLeftSideTexture,
  goldenCarFrontTexture, goldenCarBackTexture, goldenCarRightSideTexture, goldenCarLeftSideTexture,
  goldenTruckFrontTexture, goldenTruckBackTexture, goldenTruckRightSideTexture, goldenTruckLeftSideTexture
} from './textures';

export const TILE_SIZE = 42;
export const LANE_HEIGHT = 42;
export const MIN_TILE_INDEX = -10;
export const MAX_TILE_INDEX = 9;

function Wheel(xOffset) {
  const geometry = new THREE.CylinderGeometry(5, 5, 2, 16);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  const material = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  wheel.rotation.x = Math.PI / 2;
  wheel.position.z = 8;
  wheel.position.x = xOffset;
  return wheel;
}

export function Car(initialTileIndex, direction = 1, speed = 20, color = 0xff0000, textures = {}) {
  const car = new THREE.Group();
  car.position.x = initialTileIndex * TILE_SIZE;
  if (direction < 0) car.rotation.z = Math.PI;

  const carGeometry = new THREE.BoxGeometry(60, 30, 15);
  carGeometry.computeBoundingSphere();
  const main = new THREE.Mesh(
    carGeometry,
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  main.position.z = 12;
  main.castShadow = true;
  main.receiveShadow = true;
  car.add(main);

  const cabinGeometry = new THREE.BoxGeometry(33, 24, 12);
  cabinGeometry.computeBoundingSphere();
  const cabin = new THREE.Mesh(cabinGeometry, [
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: textures.back || carBackTexture }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: textures.front || carFrontTexture }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: textures.right || carRightSideTexture }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: textures.left || carLeftSideTexture }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
  ]);
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);

  car.add(Wheel(18));
  car.add(Wheel(-18));

  car.userData = { type: 'car', direction, speed };

  return car;
}

export function Truck(initialTileIndex, direction = 1, speed = 20, color = 0x0000ff, textures = {}) {
  const truck = new THREE.Group();
  truck.position.x = initialTileIndex * TILE_SIZE;
  if (direction < 0) truck.rotation.z = Math.PI;

  const truckGeometry = new THREE.BoxGeometry(100, 25, 15);
  truckGeometry.computeBoundingSphere();
  const base = new THREE.Mesh(
    truckGeometry,
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  base.position.z = 12;
  truck.add(base);

  const cabinGeometry = new THREE.BoxGeometry(33, 24, 12);
  cabinGeometry.computeBoundingSphere();
  const cabin = new THREE.Mesh(cabinGeometry, [
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true, map: textures.back || truckBackTexture }),
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true, map: textures.front || truckFrontTexture }),
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true, map: textures.right || truckRightSideTexture }),
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true, map: textures.left || truckLeftSideTexture }),
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true }),
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true }),
  ]);
  cabin.position.x = -30;
  cabin.position.z = 25.5;
  truck.add(cabin);

  truck.add(Wheel(25));
  truck.add(Wheel(-25));

  truck.userData = { type: 'truck', direction, speed };

  return truck;
}

export const moveVehicle = (vehicle, baseSpeed, delta) => {
  const dir = vehicle.userData.direction || 1;
  const speed = vehicle.userData.speed ?? baseSpeed;
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

export function collectVehiclesFromMap(mapGroup) {
  const vehicles = [];
  mapGroup.children.forEach(row => {
    row.children.forEach(object => {
      if (object.userData?.type === 'car' || object.userData?.type === 'truck' || object.userData?.type?.startsWith('golden')) {
        vehicles.push(object);
      }
    });
  });
  return vehicles;
}

export function GoldenCar(initialTileIndex, direction = 1, speed = 30) {
  const textures = {
    front: goldenCarFrontTexture,
    back: goldenCarBackTexture,
    left: goldenCarLeftSideTexture,
    right: goldenCarRightSideTexture,
  };
  const car = Car(initialTileIndex, direction, speed, 0xffd700, textures);
  car.userData.isGolden = true;
  car.userData.type = 'golden_car';
  return car;
}

export function GoldenTruck(initialTileIndex, direction = 1, speed = 35) {
  const textures = {
    front: goldenTruckFrontTexture,
    back: goldenTruckBackTexture,
    left: goldenTruckLeftSideTexture,
    right: goldenTruckRightSideTexture,
  };
  const truck = Truck(initialTileIndex, direction, speed, 0xffa500, textures);
  truck.userData.isGolden = true;
  truck.userData.type = 'golden_truck';
  return truck;
}
