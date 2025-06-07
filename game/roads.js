import * as THREE from 'three';

export const minTileIndex = -8;
export const maxTileIndex = 8;
export const tilesPerRow = maxTileIndex - minTileIndex + 1;
export const tileSize = 42;

export function Road(rowIndex) {
  const road = new THREE.Group();
  road.position.y = rowIndex * tileSize;

  const createSection = (color) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize),
      new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide }) // ✅ double-sided
    );
    mesh.position.z = -1; // ✅ slightly under everything
    return mesh;
  };

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
