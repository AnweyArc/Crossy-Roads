/**
 * Check if a vehicle is a golden vehicle based on its userData flag.
 * @param {THREE.Object3D} vehicle
 * @returns {boolean}
 */
export function isGoldenVehicle(vehicle) {
  return vehicle?.userData?.isGolden === true;
}

/**
 * Calculate the gold reward for a given golden vehicle.
 * @param {THREE.Object3D} vehicle
 * @returns {number} gold amount
 */
export function calculateGoldReward(vehicle) {
  if (!isGoldenVehicle(vehicle)) return 0;

  switch (vehicle.userData.type) {
    case 'golden_car':
      return 1;
    case 'golden_truck':
      return 2;
    default:
      return 0;
  }
}

/**
 * Check if the player has passed the vehicle along the Y-axis.
 * @param {THREE.Object3D} player
 * @param {THREE.Object3D} vehicle
 * @returns {boolean}
 */
function isPlayerAheadOfVehicle(player, vehicle) {
  // Assuming positive Y is forward direction for player
  return player.position.y > vehicle.position.y;
}

/**
 * Checks if the player has passed any golden vehicles, awards gold once per vehicle.
 *
 * @param {THREE.Object3D} player - The player object
 * @param {Array<THREE.Object3D>} vehicles - List of vehicles in the game
 * @param {Set<string>} rewardTracker - Set tracking rewarded vehicle UUIDs
 * @returns {number} total gold earned this check
 */
export function checkPlayerGoldReward(player, vehicles, rewardTracker = new Set()) {
  let goldEarned = 0;

  for (const vehicle of vehicles) {
    if (!isGoldenVehicle(vehicle)) continue;

    // Only reward once per vehicle
    if (rewardTracker.has(vehicle.uuid)) continue;

    if (isPlayerAheadOfVehicle(player, vehicle)) {
      const reward = calculateGoldReward(vehicle);
      goldEarned += reward;
      rewardTracker.add(vehicle.uuid);

      console.log(`Gold earned: ${reward} from vehicle ${vehicle.userData.type} (UUID: ${vehicle.uuid})`);
    }
  }

  return goldEarned;
}
