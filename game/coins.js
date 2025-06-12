import * as THREE from 'three';
import { tileSize } from './constants.js';

export const coins = [];

// Create a standing spinning coin
export function createCoin(tileX, rowY) {
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 2, 16),
      new THREE.MeshLambertMaterial({ color: 0xFFD700 })
    );
    
    // Make coin stand vertically
    // (do NOT rotate it if you want side to face camera)
    coin.position.set(tileX * tileSize, rowY * tileSize, 12); // raised for visibility
    coin.userData.isCoin = true;
  
    coins.push(coin);
    return coin;
  }
  

// Remove coin from scene and list
export function removeCoin(coin) {
  const index = coins.indexOf(coin);
  if (index !== -1) {
    coins.splice(index, 1);
  }

  if (coin.parent) {
    coin.parent.remove(coin);
    console.log("✅ Coin removed from scene");
  } else {
    console.warn("⚠️ Coin had no parent");
  }
}

// Call this in your main game loop to animate all coins
export function spinCoins(delta = 0.016) {
  coins.forEach(coin => {
    coin.rotation.y += delta * 5; // Spin faster
  });
}
