import * as THREE from 'three';

const tileSize = 42;
const LANE_HEIGHT = 42;

// Helper to generate canvas-based textures
function Texture(width, height, rects) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "rgba(0,0,0,0.6)";
  rects.forEach((rect) => {
    context.fillRect(rect.x, rect.y, rect.w, rect.h);
  });
  return new THREE.CanvasTexture(canvas);
}

// Car textures
const carFrontTexture = Texture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }]);
const carBackTexture = Texture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
const carRightSideTexture = Texture(110, 40, [
  { x: 10, y: 0, w: 50, h: 30 },
  { x: 70, y: 0, w: 30, h: 30 },
]);
const carLeftSideTexture = Texture(110, 40, [
  { x: 10, y: 10, w: 50, h: 30 },
  { x: 70, y: 10, w: 30, h: 30 },
]);

// Truck textures
const truckFrontTexture = Texture(30, 30, [{ x: 5, y: 0, w: 10, h: 30 }]);
const truckBackTexture = Texture(30, 30, [{ x: 5, y: 0, w: 10, h: 30 }]);
const truckRightSideTexture = Texture(25, 30, [{ x: 15, y: 5, w: 10, h: 10 }]);
const truckLeftSideTexture = Texture(25, 30, [{ x: 15, y: 15, w: 10, h: 10 }]);

// Wheel generator
function Wheel(xOffset) {
  const geometry = new THREE.CylinderGeometry(5, 5, 2, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  wheel.rotation.x = Math.PI / 2;
  wheel.position.z = 5;
  wheel.position.x = xOffset;
  return wheel;
}

// Car constructor
export function Car(initialTileIndex, direction = 1, color = 0xff0000) {
  const car = new THREE.Group();
  car.position.x = initialTileIndex * tileSize;
  if (direction < 0) car.rotation.z = Math.PI;

  const main = new THREE.Mesh(
    new THREE.BoxGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  main.position.z = 12;
  main.castShadow = true;
  main.receiveShadow = true;
  car.add(main);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(33, 24, 12), [
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carBackTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carFrontTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carRightSideTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0xcccccc,
      flatShading: true,
      map: carLeftSideTexture,
    }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // top
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }), // bottom
  ]);
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);

  car.add(Wheel(18));
  car.add(Wheel(-18));

  return car;
}

// Truck constructor
export function Truck(initialTileIndex, direction = 1, color = 0x0000ff) {
  const truck = new THREE.Group();
  truck.position.x = initialTileIndex * tileSize;
  if (direction < 0) truck.rotation.z = Math.PI;

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(100, 25, 15),
    new THREE.MeshLambertMaterial({ color, flatShading: true })
  );
  base.position.z = 12;
  truck.add(base);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(33, 24, 12), [
    new THREE.MeshPhongMaterial({
      color: 0x888888,
      flatShading: true,
      map: truckBackTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0x888888,
      flatShading: true,
      map: truckFrontTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0x888888,
      flatShading: true,
      map: truckRightSideTexture,
    }),
    new THREE.MeshPhongMaterial({
      color: 0x888888,
      flatShading: true,
      map: truckLeftSideTexture,
    }),
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true }), // top
    new THREE.MeshPhongMaterial({ color: 0x888888, flatShading: true }), // bottom
  ]);
  cabin.position.x = -30;
  cabin.position.z = 25.5;
  truck.add(cabin);

  truck.add(Wheel(25));
  truck.add(Wheel(-25));

  return truck;
}

// Legacy function for generic vehicle spawning
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

// Movement functions
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
