import { Road } from './roads.js';
import { Tree } from './trees.js';
import { createGrass } from './terrain.js';

export function initializeMap(scene) {
  const mapLength = 10;

  for (let i = 0; i < mapLength; i++) {
    // Add grass tile
    const grass = createGrass(i);
    scene.add(grass);

    // Add road tile
    const road = Road(i);
    scene.add(road);

    // Add tree on the left side
    const tree = Tree(i);
    scene.add(tree);
  }
}
