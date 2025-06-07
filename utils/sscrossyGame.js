// utils/crossyGame.js
import * as THREE from "three";

let scene, camera, renderer, player, map, movesQueue = [];

function DirectionalLight() {
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(100, 100, 100);
  return light;
}

function Camera() {
  const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  cam.position.z = 20;
  return cam;
}

function Renderer() {
  const rend = new THREE.WebGLRenderer({ antialias: true });
  rend.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(rend.domElement);
  return rend;
}

function initializeMap() {
  // Basic placeholder map
  map = new THREE.Group();
  const geometry = new THREE.BoxGeometry(4, 4, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x228B22 });
  for (let i = 0; i < 10; i++) {
    const tile = new THREE.Mesh(geometry, material);
    tile.position.y = i * 4.2;
    map.add(tile);
  }
}

function initializePlayer() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  player = new THREE.Mesh(geometry, material);
  player.position.y = 0;
  scene.add(player);
}

function stepCompleted() {
  movesQueue.shift();
  const score = Math.floor(player.position.y / 4.2);
  const scoreElement = document.getElementById("score");
  if (scoreElement) scoreElement.innerText = `Score: ${score}`;
}

function queueMove(direction) {
  movesQueue.push(direction);
}

export function startCrossyGame() {
  scene = new THREE.Scene();
  scene.add(DirectionalLight());

  initializeMap();
  initializePlayer();

  camera = Camera();
  renderer = Renderer();

  scene.add(map);
  scene.add(player);

  document.addEventListener("keydown", (e) => {
    if (["ArrowUp", "KeyW"].includes(e.code)) queueMove("forward");
    if (["ArrowDown", "KeyS"].includes(e.code)) queueMove("backward");
    if (["ArrowLeft", "KeyA"].includes(e.code)) queueMove("left");
    if (["ArrowRight", "KeyD"].includes(e.code)) queueMove("right");
  });

  function animate() {
    requestAnimationFrame(animate);

    if (movesQueue.length) {
      const direction = movesQueue[0];
      if (direction === "forward") player.position.y += 4.2;
      if (direction === "backward") player.position.y -= 4.2;
      if (direction === "left") player.position.x -= 4.2;
      if (direction === "right") player.position.x += 4.2;

      if (player.position.x % 4.2 === 0 && player.position.y % 4.2 === 0) {
        stepCompleted();
      }
    }

    renderer.render(scene, camera);
  }

  animate();
}
