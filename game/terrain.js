import * as THREE from 'three';
import { tileSize, tilesPerRow } from "./constants.js";

export function createGrass(rowIndex) {
  const group = new THREE.Group();
  group.position.y = rowIndex * tileSize;

  const middle = createSection(0xbaf455);
  middle.receiveShadow = true;
  group.add(middle);

  const left = createSection(0x99c846);
  left.position.x = -tilesPerRow * tileSize;
  group.add(left);

  const right = createSection(0x99c846);
  right.position.x = tilesPerRow * tileSize;
  group.add(right);

  return group;

  function createSection(color) {
    return new THREE.Mesh(
      new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
      new THREE.MeshLambertMaterial({ color })
    );
  }
}
export function createRoad(rowIndex) {
  const group = new THREE.Group();
  group.position.y = rowIndex * tileSize;

  const road = new THREE.Mesh(
    new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
    new THREE.MeshLambertMaterial({ color: 0x333333 }) // dark gray road color
  );
  road.receiveShadow = true;
  group.add(road);

  return group;
}

export function createTree(tileIndex, height) {
  const tree = new THREE.Group();

  // Position tree along the X axis based on tileIndex
  tree.position.x = tileIndex * tileSize;

  // Create trunk
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, height, 8),
    new THREE.MeshLambertMaterial({ color: 0x8b5a2b })
  );
  trunk.position.y = height / 2;
  tree.add(trunk);

  // Create leaves
  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(height / 2, 8, 8),
    new THREE.MeshLambertMaterial({ color: 0x228b22 })
  );
  leaves.position.y = height;
  tree.add(leaves);

  return tree;
}
