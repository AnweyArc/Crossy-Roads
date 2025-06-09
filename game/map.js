import * as THREE from "three";
import { Car, Truck, LANE_HEIGHT, TILE_SIZE } from "./vehicles";
import { createGrass, createRoad, createTree } from "./terrain";
import { generateRows } from "./rowGenerator.js";

export const map = new THREE.Group();
export const metadata = [];
export const activeVehicles = [];
export const treeObstacles = []; // stores { x, y } positions of trees
export const blockedTiles = new Set(); // Store "x,y" strings



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
      row.position.y = rowIndex * LANE_HEIGHT;
    
      rowData.vehicles.forEach((v) => {
        const speed = Math.random() * 40 + 5; // ⬅️ Updated car speed (5 to 15)
        const randomTileIndex = Math.floor(Math.random() * 20) - 10;
        const car = Car(randomTileIndex, rowData.direction, speed, v.color);
        car.position.y = 0;
    
        v.ref = car;
        activeVehicles.push(car);
        row.add(car);
      });
    
      map.add(row);
    }
    
    if (rowData.type === "truck") {
      const row = createRoad(rowIndex);
      row.position.y = rowIndex * LANE_HEIGHT;
    
      rowData.vehicles.forEach((v) => {
        const speed = Math.random() * 50 + 2; // ⬅️ Updated truck speed (2 to 8)
        const randomTileIndex = Math.floor(Math.random() * 20) - 10;
        const truck = Truck(randomTileIndex, rowData.direction, speed, v.color);
        truck.position.y = 0;
    
        v.ref = truck;
        activeVehicles.push(truck);
        row.add(truck);
      });
    
      map.add(row);
    }
    

    if (rowData.type === "forest") {
      const row = createGrass(rowIndex);
      row.position.y = rowIndex * LANE_HEIGHT;
    
      rowData.trees.forEach(({ tileIndex, height }) => {
        const tree = createTree(tileIndex, height);
        tree.position.y = 0; // Make sure it's grounded
        row.add(tree);
    
        // 🟢 Record tree tile world position
        treeObstacles.push({
          x: tileIndex * TILE_SIZE,
          y: rowIndex * LANE_HEIGHT
        });
    
        // Optional: Blocked tile key if needed elsewhere
        const key = `${tileIndex},${rowIndex}`;
        blockedTiles.add(key);
      });
    
      map.add(row);
    } 
  });
}
