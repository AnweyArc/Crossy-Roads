import { moveVehicle } from './vehicles';
import { updateCamera } from './camera';
import { detectCollision } from './collision';

export const gameLoop = ({
  scene, camera, player, vehicles, clock, renderer
}) => {
  const animate = () => {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    vehicles.forEach(v => moveVehicle(v, 2, delta, v.userData.type === 'car' ? -1 : 1));
    updateCamera(camera, player);

    detectCollision(player, vehicles);
    renderer.render(scene, camera);
  };

  animate();
};
