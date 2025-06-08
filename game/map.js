import * as THREE from "three";
import { Car, Truck } from "./vehicles";
import { createGrass, createRoad, createTree } from "./terrain";
import { generateRows } from "./rowGenerator.js";

export const map = new THREE.Group();
export const metadata = [];

export function initializeMap() {
  metadata.length = 0;
  map.clear();

  for (let rowIndex = 0; rowIndex > -10; rowIndex--) {
    const grass = createGrass(rowIndex);
    map.add(grass);
  }

  addRows(20); // initial rows
}

export function addRows(count = 10) {
  const newMetadata = generateRows(count);
  const startIndex = metadata.length;
  metadata.push(...newMetadata);

  newMetadata.forEach((rowData, index) => {
    const rowIndex = -1 * (startIndex + index);

    if (rowData.type === "forest") {
      const row = createGrass(rowIndex);
      rowData.trees.forEach(({ tileIndex, height }) => {
        row.add(createTree(tileIndex, height));
      });
      map.add(row);
    }

    if (rowData.type === "car" || rowData.type === "truck") {
      const row = createRoad(rowIndex);
      rowData.vehicles.forEach((v) => {
        const vehicle =
          rowData.type === "car"
            ? Car(v.initialTileIndex, rowData.direction, v.color)
            : Truck(v.initialTileIndex, rowData.direction, v.color);
        v.ref = vehicle;
        row.add(vehicle);
      });
      map.add(row);
    }
  });
}
