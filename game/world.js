// world.js

import { Road as createRoad, Truck } from "./roads.js";
import { Tree as createTree } from "./trees.js";
import { createGrass } from "./terrain.js";

export function initializeMap(scene) {
  const mapLength = 10;

  for (let i = 0; i < mapLength; i++) {
    // Add grass tile
    const grass = createGrass(i);
    scene.add(grass);

    // Add road tile
    const road = createRoad(i);
    scene.add(road);

    // Add tree
    const tree = createTree(i);
    scene.add(tree);
  }
}
