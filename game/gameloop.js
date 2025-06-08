import { moveVehicle, resetVehiclePosition } from './vehicles';
import { updateCamera } from './camera';
import { detectCollision } from './collision';

export const gameLoop = ({
  scene, camera, player, vehicles, clock, renderer
}) => {
  const animate = () => {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const limit = 1000; // adjust this based on your scene width

    vehicles.forEach(v => {
      moveVehicle(v, 2, delta);
      resetVehiclePosition(v, limit);
    });

    updateCamera(camera, player);
    detectCollision(player, vehicles);

    renderer.render(scene, camera);
  };

  animate();
};
