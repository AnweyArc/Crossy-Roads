import * as THREE from 'three';

const tileSize = 42;

export function Tree(rowIndex, height = 30) {
  const tree = new THREE.Group();
  tree.position.y = rowIndex * tileSize;
  tree.position.x = -100; // This is updated later during placement

  // Trunk - tall and narrow
  const trunk = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 20),
    new THREE.MeshLambertMaterial({ color: 0x4d2926, flatShading: true })
  );
  trunk.position.z = 10;
  tree.add(trunk);

  // Foliage - stack of green cubes (Crossy Road style)
  const foliageColors = [0x9be564, 0x8dcf4e]; // Slight variation in green
  const foliageSize = 20;

  for (let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(foliageSize, foliageSize, foliageSize),
      new THREE.MeshLambertMaterial({ 
        color: foliageColors[i % foliageColors.length], 
        flatShading: true 
      })
    );
    cube.position.z = 20 + foliageSize / 2 + i * foliageSize;
    cube.castShadow = true;
    cube.receiveShadow = true;
    tree.add(cube);
  }

  return tree;
}
