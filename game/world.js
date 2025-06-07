import { createGrass } from "./terrain.js";
import { tileSize } from "./constants.js";

export function initializeMap(scene) {
  for (let i = 0; i < 10; i++) {
    const grass = createGrass(i);
    scene.add(grass);
  }
}
