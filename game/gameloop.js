// /game/gameLoop.js
import { moveVehicle, resetVehiclePosition } from './vehicles';
import { updateCamera } from './camera';
import { detectCollision } from './collision';
import { checkPlayerGoldReward } from './GoldGeneration';
import { checkCoinPickup } from './coinPickupHandler'; // ✅ Fix import path

export const gameLoop = ({
  scene, camera, player, vehicles, clock, renderer
}) => {
  const rewardedVehicles = new Set();
  let totalGold = 0;

  const animate = () => {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const limit = 1000;

    vehicles.forEach(vehicle => {
      moveVehicle(vehicle, 2, delta);
      resetVehiclePosition(vehicle, limit);
    });

    // Reward gold from golden vehicles
    const goldEarned = checkPlayerGoldReward(player, vehicles, rewardedVehicles);
    if (goldEarned > 0) {
      totalGold += goldEarned;
      window.dispatchEvent(new CustomEvent('goldEarned', {
        detail: { totalGold }
      }));
    }

    // ✅ Check coin pickups and remove from scene
    checkCoinPickup(player, scene);

    updateCamera(camera, player);
    detectCollision(player, vehicles);

    renderer.render(scene, camera);
  };

  animate();
};
