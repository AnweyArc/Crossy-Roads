// pages/GamePages/game.js
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Game() {
  const canvasRef = useRef();

  useEffect(() => {
    // === Scene Setup ===
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // === Camera Setup ===
    const size = 300;
    const aspect = window.innerWidth / window.innerHeight;
    const width = aspect < 1 ? size : size * aspect;
    const height = aspect < 1 ? size / aspect : size;
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      100, 900
    );
    camera.up.set(0, 0, 1);
    camera.position.set(300, -300, 300);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(-100, -100, 200);
    dirLight.castShadow = true;
    scene.add(dirLight);
    camera.add(dirLight);

    // === Sample Ground ===
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(1000, 1000, 10),
      new THREE.MeshPhongMaterial({ color: 0x556655 })
    );
    ground.receiveShadow = true;
    ground.position.z = -5;
    scene.add(ground);

    // === Sample Player ===
    const player = new THREE.Mesh(
      new THREE.BoxGeometry(30, 30, 30),
      new THREE.MeshStandardMaterial({ color: 0xff4444 })
    );
    player.castShadow = true;
    player.position.set(0, 0, 15);
    scene.add(player);

    // === Input Handling ===
    const moveQueue = [];
    function handleKey(e) {
      if (e.key === "ArrowUp") moveQueue.push({ x: 0, y: 40 });
      else if (e.key === "ArrowLeft") moveQueue.push({ x: -40, y: 0 });
      else if (e.key === "ArrowRight") moveQueue.push({ x: 40, y: 0 });
    }
    window.addEventListener("keydown", handleKey);

    // === Animation ===
    let clock = new THREE.Clock();
    let moveTarget = null;

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Move player toward target
      if (!moveTarget && moveQueue.length > 0) {
        const move = moveQueue.shift();
        moveTarget = {
          x: player.position.x + move.x,
          y: player.position.y + move.y
        };
      }
      if (moveTarget) {
        const speed = 200 * delta;
        const dx = moveTarget.x - player.position.x;
        const dy = moveTarget.y - player.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < speed) {
          player.position.x = moveTarget.x;
          player.position.y = moveTarget.y;
          moveTarget = null;
        } else {
          player.position.x += (dx / dist) * speed;
          player.position.y += (dy / dist) * speed;
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    // === Resize ===
    function onResize() {
      const aspect = window.innerWidth / window.innerHeight;
      const w = aspect < 1 ? size : size * aspect;
      const h = aspect < 1 ? size / aspect : size;
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // === Cleanup ===
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", handleKey);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
    />
  );
}
