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
