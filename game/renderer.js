// game/renderer.js
import * as THREE from 'three';

export function createRenderer(container) {
  const canvas = document.createElement('canvas');
  canvas.className = 'game';
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
}
