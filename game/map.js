import * as THREE from "three";
import {
  Car, Truck, GoldenCar, GoldenTruck,
  LANE_HEIGHT, TILE_SIZE
} from "./vehicles";
import { createGrass, createRoad, createTree } from "./terrain";
import { generateRows } from "./rowGenerator.js";
import { createCoin, coins } from './coins.js';

export const map = new THREE.Group();
export const metadata = [];
export const activeVehicles = [];
export const treeObstacles = [];
export const blockedTiles = new Set();

export function initializeMap() {
  metadata.length = 0;
  coins.length = 0;
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

    function addBoundaryWalls(rowGroup) {
      [-10, 9].forEach((tileIndex) => {
        const wall = createTree(tileIndex, 1.2);
        wall.position.y = 0;
        rowGroup.add(wall);

        treeObstacles.push({
          x: tileIndex * TILE_SIZE,
          y: rowIndex * LANE_HEIGHT
        });

        const key = `${tileIndex},${rowIndex}`;
        blockedTiles.add(key);
      });
    }

    if (rowData.type === "car" || rowData.type === "truck") {
      const row = createRoad(rowIndex);
      row.position.y = rowIndex * LANE_HEIGHT;

      const isCar = rowData.type === "car";
      const vehicleFactory = isCar ? Car : Truck;
      const goldenFactory = isCar ? GoldenCar : GoldenTruck;

      rowData.vehicles.forEach((v) => {
        const speed = isCar ? Math.random() * 40 + 5 : Math.random() * 50 + 2;
        const randomTileIndex = Math.floor(Math.random() * 20) - 10;

        const vehicle = (v.color === "golden")
          ? goldenFactory(randomTileIndex, rowData.direction, speed)
          : vehicleFactory(randomTileIndex, rowData.direction, speed, v.color);

        vehicle.position.y = 0;

        v.ref = vehicle;
        activeVehicles.push(vehicle);
        row.add(vehicle);
      });

      // ✅ Add coins to road rows
      const coinCount = Math.floor(Math.random() * 3); // 0 to 2 coins
      for (let i = 0; i < coinCount; i++) {
        const coinTileIndex = Math.floor(Math.random() * 18) - 9;
        const coin = createCoin(coinTileIndex, rowIndex);
        coin.position.y = 0;
        coins.push(coin);
        row.add(coin);
      }

      addBoundaryWalls(row);
      map.add(row);
    }

    if (rowData.type === "forest") {
      const row = createGrass(rowIndex);
      row.position.y = rowIndex * LANE_HEIGHT;

      rowData.trees.forEach(({ tileIndex, height }) => {
        const tree = createTree(tileIndex, height);
        tree.position.y = 0;
        row.add(tree);

        treeObstacles.push({
          x: tileIndex * TILE_SIZE,
          y: rowIndex * LANE_HEIGHT
        });

        const key = `${tileIndex},${rowIndex}`;
        blockedTiles.add(key);
      });

      addBoundaryWalls(row);
      map.add(row);
    }
  });
}
