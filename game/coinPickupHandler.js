// /game/coinPickupHandler.js
import { coins, removeCoin } from './coins.js';

let totalGold = 0;

export function checkCoinPickup(player, scene) {
  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    const dx = coin.position.x - player.position.x;
    const dy = coin.position.y - player.position.y;

    // ✅ Coin pickup threshold: within half a tile
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      totalGold++;
      console.log("Coin collected! Total gold:", totalGold);

      // ✅ Remove from scene and list
      coin.parent?.remove(coin);
      coins.splice(i, 1);
    }
  }
}
