// /game/coinPickupHandler.js
import { coins, removeCoin } from './coins.js';
import { tileSize } from './constants.js';

let totalGold = 0;

export function checkCoinPickup(player, scene) {
  const playerTileX = Math.round(player.position.x / tileSize);
  const playerTileY = Math.round(player.position.y / tileSize);

  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    const coinTileX = Math.round(coin.position.x / tileSize);
    const coinTileY = Math.round(coin.position.y / tileSize);

    if (coinTileX === playerTileX && coinTileY === playerTileY) {
      totalGold++;
      console.log("🪙 Coin collected! Total gold:", totalGold);

      if (coin.parent) {
        coin.parent.remove(coin);
      }
       // ✅ cleaner and handles parent removal
    }
  }
}
