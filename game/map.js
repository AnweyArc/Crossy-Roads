// map.js
import * as THREE from "three";
import { Car, Truck } from "./vehicles";
import { createGrass, createRoad, createTree } from "./terrain";
import { generateRows } from "./rowGenerator.js";

export const map = new THREE.Group();
export const metadata = [];

export function initializeMap() {
  metadata.length = 0;
  map.remove(...map.children);

  for (let rowIndex = 0; rowIndex > -10; rowIndex--) {
    const grass = createGrass(rowIndex);
    map.add(grass);
  }

  addRows();
}

export function addRows() {
  const newMetadata = generateRows(20);
  const startIndex = metadata.length;
  metadata.push(...newMetadata);

  newMetadata.forEach((rowData, index) => {
    const rowIndex = startIndex + index + 1;

    if (rowData.type === "forest") {
      const row = createGrass(rowIndex);
      rowData.trees.forEach(({ tileIndex, height }) => {
        row.add(createTree(tileIndex, height));
      });
      map.add(row);
    }

    if (rowData.type === "car") {
      const row = createRoad(rowIndex);
      rowData.vehicles.forEach((v) => {
        const car = Car(v.initialTileIndex, rowData.direction, v.color);
        v.ref = car;
        row.add(car);
      });
      map.add(row);
    }

    if (rowData.type === "truck") {
      const row = createRoad(rowIndex);
      rowData.vehicles.forEach((v) => {
        const truck = Truck(v.initialTileIndex, rowData.direction, v.color);
        v.ref = truck;
        row.add(truck);
      });
      map.add(row);
    }
  });
}
