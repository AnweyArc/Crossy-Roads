import * as THREE from 'three';

const minTileIndex = -8;
const maxTileIndex = 8;
const tilesPerRow = maxTileIndex - minTileIndex + 1;
const tileSize = 42;

export function Road(rowIndex) {
  const road = new THREE.Group();
  road.position.y = rowIndex * tileSize;

  const createSection = (color) =>
    new THREE.Mesh(
      new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize),
      new THREE.MeshLambertMaterial({ color })
    );

  const middle = createSection(0x454a59);
  middle.receiveShadow = true;
  road.add(middle);

  const left = createSection(0x393d49);
  left.position.x = -tilesPerRow * tileSize;
  road.add(left);

  const right = createSection(0x393d49);
  right.position.x = tilesPerRow * tileSize;
  road.add(right);

  return road;
}

export function Truck(initialTileIndex, direction, color) {
  const truck = new THREE.Group();
  truck.position.x = initialTileIndex * tileSize;
  if (!direction) truck.rotation.z = Math.PI;

  const cargo = new THREE.Mesh(
    new THREE.BoxGeometry(70, 35, 35),
    new THREE.MeshLambertMaterial({
      color: 0xb4c6fc,
      flatShading: true,
    })
  );
  cargo.position.x = -15;
  cargo.position.z = 25;
  cargo.castShadow = true;
  cargo.receiveShadow = true;
  truck.add(cargo);

  const truckFrontTexture = createTruckFrontTexture();
  const truckLeftSideTexture = createTruckLeftSideTexture();
  const truckRightSideTexture = createTruckRightSideTexture();

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), [
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
      map: truckFrontTexture,
    }), // front
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
    }), // back
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
      map: truckLeftSideTexture,
    }),
    new THREE.MeshLambertMaterial({
      color,
      flatShading: true,
      map: truckRightSideTexture,
    }),
    new THREE.MeshPhongMaterial({ color, flatShading: true }), // top
    new THREE.MeshPhongMaterial({ color, flatShading: true }), // bottom
  ]);
  cabin.position.x = 35;
  cabin.position.z = 20;
  cabin.castShadow = true;
  cabin.receiveShadow = true;

  truck.add(cabin);

  const frontWheel = Wheel(37);
  truck.add(frontWheel);

  const middleWheel = Wheel(5);
  truck.add(middleWheel);

  const backWheel = Wheel(-35);
  truck.add(backWheel);

  return truck;
}

function Wheel(x) {
  const wheel = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({
      color: 0x333333,
      flatShading: true,
    })
  );
  wheel.position.x = x;
  wheel.position.z = 6;
  return wheel;
}

function createTruckFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 30;
  canvas.height = 30;
  const context = canvas.getContext("2d");

  context.fillStyle = "#b4c6fc";
  context.fillRect(0, 0, 30, 30);

  context.fillStyle = "rgba(255, 255, 255, 0.7)";
  context.fillRect(5, 0, 10, 30);

  return new THREE.CanvasTexture(canvas);
}

function createTruckLeftSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 25;
  canvas.height = 30;
  const context = canvas.getContext("2d");

  context.fillStyle = "#b4c6fc";
  context.fillRect(0, 0, 25, 30);

  context.fillStyle = "rgba(255, 255, 255, 0.7)";
  context.fillRect(15, 15, 10, 10);

  return new THREE.CanvasTexture(canvas);
}

function createTruckRightSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 25;
  canvas.height = 30;
  const context = canvas.getContext("2d");

  context.fillStyle = "#b4c6fc";
  context.fillRect(0, 0, 25, 30);

  context.fillStyle = "rgba(255, 255, 255, 0.7)";
  context.fillRect(15, 5, 10, 10);

  return new THREE.CanvasTexture(canvas);
}
