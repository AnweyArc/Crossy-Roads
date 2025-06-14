import * as THREE from 'three';
import { tileSize } from './constants.js';
import { LANE_HEIGHT } from './vehicles.js';


export const coins = [];

// Create a standing spinning coin
export function createCoin(tileX, rowY) {
  const coin = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 2, 16),
    new THREE.MeshLambertMaterial({ color: 0xFFD700 })
  );
  
  // Correct positioning to match map row layout
  coin.position.set(tileX * tileSize, rowY * LANE_HEIGHT, 12); // use LANE_HEIGHT for consistency
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
