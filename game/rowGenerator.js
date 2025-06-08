import { tilesPerRow } from './constants.js';

export function generateRows(count) {
  const rows = [];

  for (let i = 0; i < count; i++) {
    if (i % 3 === 0) {
      // Forest row
      const treeCount = Math.floor(Math.random() * 6) + 3; // 3–8 trees
      const takenIndices = new Set();
      const trees = [];

      while (trees.length < treeCount) {
        const tileIndex = Math.floor(Math.random() * tilesPerRow * 2) - tilesPerRow; // -tilesPerRow to (tilesPerRow - 1)
        if (takenIndices.has(tileIndex)) continue;

        takenIndices.add(tileIndex);
        trees.push({
          tileIndex,
          height: Math.floor(Math.random() * 20) + 20, // height 20–40
        });
      }

      rows.push({
        type: "forest",
        trees,
      });
    } else if (i % 3 === 1) {
      // Car row
      rows.push({
        type: "car",
        direction: 1,
        vehicles: [
          { initialTileIndex: 0, color: 0xff0000 },
          { initialTileIndex: 2, color: 0xff0000 },
        ],
      });
    } else {
      // Truck row
      rows.push({
        type: "truck",
        direction: -1,
        vehicles: [
          { initialTileIndex: 1, color: 0x0000ff },
        ],
      });
    }
  }

  return rows;
}
