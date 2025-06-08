import * as THREE from "three";
import { Car, Truck, LANE_HEIGHT, TILE_SIZE } from "./vehicles";
import { createGrass, createRoad, createTree } from "./terrain";
import { generateRows } from "./rowGenerator.js";

export const map = new THREE.Group();
export const metadata = [];
export const activeVehicles = [];

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

    if (rowData.type === "car") {
      const row = createRoad(rowIndex);
      
      // Set Y position of the road row group to align vehicles properly
      row.position.y = rowIndex * LANE_HEIGHT;

      rowData.vehicles.forEach((v) => {
        const car = Car(v.initialTileIndex, rowData.direction, v.color);
        car.userData.speed = Math.random() * 2 + 2; // Random speed between 2 and 4

        // Make sure vehicle's Y matches the row's Y
        car.position.y = 0; // relative to row group

        v.ref = car;
        activeVehicles.push(car);
        row.add(car);
      });
      map.add(row);
    }

    if (rowData.type === "truck") {
      const row = createRoad(rowIndex);

      // Set Y position of the road row group to align vehicles properly
      row.position.y = rowIndex * LANE_HEIGHT;

      rowData.vehicles.forEach((v) => {
        const truck = Truck(v.initialTileIndex, rowData.direction, v.color);
        truck.userData.speed = Math.random() * 1.5 + 1.5; // Random speed between 1.5 and 3

        // Make sure vehicle's Y matches the row's Y
        truck.position.y = 0; // relative to row group

        v.ref = truck;
        activeVehicles.push(truck);
        row.add(truck);
      });
      map.add(row);
    }

    if (rowData.type === "forest") {
      const row = createGrass(rowIndex);
      row.position.y = rowIndex * LANE_HEIGHT;

      rowData.trees.forEach((tileIndex) => {
        const tree = createTree(tileIndex);
        row.add(tree);
      });
      map.add(row);
    }
  });
}
