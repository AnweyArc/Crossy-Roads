export function generateRows(count) {
    const rows = [];
  
    for (let i = 0; i < count; i++) {
      if (i % 3 === 0) {
        // Forest row
        rows.push({
          type: "forest",
          trees: [
            { tileIndex: 1, height: 10 },
            { tileIndex: 3, height: 15 },
            // add more trees as needed
          ],
        });
      } else if (i % 3 === 1) {
        // Car row
        rows.push({
          type: "car",
          direction: 1,
          vehicles: [
            { initialTileIndex: 0, color: 0xff0000 },
            { initialTileIndex: 2, color: 0xff0000 },
            // add more cars as needed
          ],
        });
      } else {
        // Truck row
        rows.push({
          type: "truck",
          direction: -1,
          vehicles: [
            { initialTileIndex: 1, color: 0x0000ff },
            // add more trucks as needed
          ],
        });
      }
    }
  
    return rows;
  }
  