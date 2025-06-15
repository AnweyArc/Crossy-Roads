import * as THREE from 'three';
import { coins } from './coins.js';

let totalGold = 0;

export function checkCoinPickup(player, scene) {
  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];

    const coinWorldPos = new THREE.Vector3();
    coin.getWorldPosition(coinWorldPos);

    const dx = coinWorldPos.x - player.position.x;
    const dy = coinWorldPos.y - player.position.y;

    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      totalGold++;
      console.log("Coin collected! Total gold:", totalGold);

      coin.parent?.remove(coin);
      coins.splice(i, 1);

      // ✅ Dispatch event so UI updates
      window.dispatchEvent(new CustomEvent('goldEarned', {
        detail: { totalGold }
      }));
    }
  }
}
