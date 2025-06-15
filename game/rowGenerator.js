// /game/rowGenerator.js
import { tilesPerRow, tileSize } from './constants.js';
import { createCoin, coins } from './coins.js'; // ✅ also import coins


function maybeGolden(defaultColor, chance = 0.2) {
  return Math.random() < chance ? "golden" : defaultColor;
}

// ✅ Pass scene as an argument
export function generateRows(count, scene, currentRowIndex = 0) {
  const rows = [];

  for (let i = 0; i < count; i++) {
    const globalRowIndex = currentRowIndex + i;

    if (i % 3 === 0) {
      // Forest row
      const treeCount = Math.floor(Math.random() * 6) + 3; // 3–8 trees
      const takenIndices = new Set();
      const trees = [];

      while (trees.length < treeCount) {
        const tileIndex = Math.floor(Math.random() * tilesPerRow * 2) - tilesPerRow;
        if (takenIndices.has(tileIndex)) continue;

        takenIndices.add(tileIndex);
        trees.push({
          tileIndex,
          height: Math.floor(Math.random() * 20) + 20, // height 20–40
        });
      }

      // ✅ Place a coin on a random untaken tile
      const possibleIndices = [];
      for (let idx = -tilesPerRow; idx <= tilesPerRow; idx++) {
        if (!takenIndices.has(idx)) {
          possibleIndices.push(idx);
        }
      }

      if (possibleIndices.length > 0) {
        const coinTileIndex = possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
        const coin = createCoin(coinTileIndex, -globalRowIndex);
        scene.add(coin);
        coins.push(coin); // ✅ this line is crucial
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
          { initialTileIndex: 0, color: maybeGolden(0xff0000) },
          { initialTileIndex: 2, color: maybeGolden(0xff0000) },
        ],
      });
    } else {
      // Truck row
      rows.push({
        type: "truck",
        direction: -1,
        vehicles: [
          { initialTileIndex: 1, color: maybeGolden(0x0000ff) },
        ],
      });
    }
  }

  return rows;
}
