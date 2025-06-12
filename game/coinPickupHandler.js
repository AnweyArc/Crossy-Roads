// /game/coinPickupHandler.js
import { coins, removeCoin } from './coins';

let totalGold = 0;

export function checkCoinPickup(player, scene) {
  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    const dx = player.position.x - coin.position.x;
const dz = player.position.z - coin.position.z;

if (Math.abs(dx) < 10 && Math.abs(dz) < 10) {
  totalGold += 1;
  removeCoin(coin, scene);
  console.log("✅ Coin collected! Total Gold:", totalGold);

  window.dispatchEvent(new CustomEvent('goldEarned', {
    detail: { totalGold }
  }));
}


  }
}
