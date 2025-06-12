import * as THREE from 'three';

function createTexture(width, height, rects, backgroundColor = "#fff") {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  context.fillStyle = "rgba(0,0,0,0.6)";
  rects.forEach(({ x, y, w, h }) => context.fillRect(x, y, w, h));

  return new THREE.CanvasTexture(canvas);
}

// Standard Car Textures
export const carFrontTexture = createTexture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }]);
export const carBackTexture = createTexture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
export const carRightSideTexture = createTexture(110, 40, [
  { x: 10, y: 0, w: 50, h: 30 }, { x: 70, y: 0, w: 30, h: 30 }
]);
export const carLeftSideTexture = createTexture(110, 40, [
  { x: 10, y: 10, w: 50, h: 30 }, { x: 70, y: 10, w: 30, h: 30 }
]);

// Standard Truck Textures
export const truckFrontTexture = createTexture(30, 30, [{ x: 5, y: 0, w: 10, h: 30 }]);
export const truckBackTexture = createTexture(30, 30, [{ x: 5, y: 0, w: 10, h: 30 }]);
export const truckRightSideTexture = createTexture(25, 30, [{ x: 15, y: 5, w: 10, h: 10 }]);
export const truckLeftSideTexture = createTexture(25, 30, [{ x: 15, y: 15, w: 10, h: 10 }]);

// Golden Car Textures
export const goldenCarFrontTexture = createTexture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }], "#ffd700");
export const goldenCarBackTexture = createTexture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }], "#ffd700");
export const goldenCarRightSideTexture = createTexture(110, 40, [
  { x: 10, y: 0, w: 50, h: 30 }, { x: 70, y: 0, w: 30, h: 30 }
], "#ffd700");
export const goldenCarLeftSideTexture = createTexture(110, 40, [
  { x: 10, y: 10, w: 50, h: 30 }, { x: 70, y: 10, w: 30, h: 30 }
], "#ffd700");

// Golden Truck Textures
export const goldenTruckFrontTexture = createTexture(30, 30, [{ x: 5, y: 0, w: 10, h: 30 }], "#ffd700");
export const goldenTruckBackTexture = createTexture(30, 30, [{ x: 5, y: 0, w: 10, h: 30 }], "#ffd700");
export const goldenTruckRightSideTexture = createTexture(25, 30, [{ x: 15, y: 5, w: 10, h: 10 }], "#ffd700");
export const goldenTruckLeftSideTexture = createTexture(25, 30, [{ x: 15, y: 15, w: 10, h: 10 }], "#ffd700");
