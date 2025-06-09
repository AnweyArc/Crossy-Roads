import * as THREE from 'three';
import { getScore } from './score.js';

let gameStartTime = Date.now();
let playerHasMoved = false;
let gameOver = false;

// Call this when the player makes a valid move
export function onPlayerMove() {
  playerHasMoved = true;
}

export function detectCollision(player, vehicles) {
  if (gameOver) return;

  // Skip collision check during grace period
  if (Date.now() - gameStartTime < 2000) return;

  // Skip if player hasn't moved yet
  if (!playerHasMoved) return;

  const playerBox = new THREE.Box3().setFromObject(player);

  for (const vehicle of vehicles) {
    const vehicleBox = new THREE.Box3().setFromObject(vehicle);
    if (playerBox.intersectsBox(vehicleBox)) {
      gameOver = true;
      showGameOverModal(getScore());
      break;
    }
  }
}

function showGameOverModal(score) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = 9999;
  document.body.appendChild(overlay);

  const modal = document.createElement('div');
  modal.style.background = '#222';
  modal.style.borderRadius = '12px';
  modal.style.padding = '30px 50px';
  modal.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
  modal.style.color = 'white';
  modal.style.fontFamily = "'Arial Black', Arial, sans-serif";
  modal.style.textAlign = 'center';
  modal.style.minWidth = '320px';
  overlay.appendChild(modal);

  const title = document.createElement('h2');
  title.innerText = 'Game Over';
  title.style.marginBottom = '20px';
  modal.appendChild(title);

  const scoreText = document.createElement('p');
  scoreText.innerText = `Your score: ${score} rows passed`;
  scoreText.style.fontSize = '1.2rem';
  scoreText.style.marginBottom = '30px';
  modal.appendChild(scoreText);

  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.justifyContent = 'space-around';
  modal.appendChild(btnContainer);

  const retryBtn = document.createElement('button');
  retryBtn.innerText = 'Retry';
  retryBtn.style.padding = '12px 25px';
  retryBtn.style.margin = '0 10px';
  retryBtn.style.border = 'none';
  retryBtn.style.borderRadius = '8px';
  retryBtn.style.backgroundColor = '#4caf50';
  retryBtn.style.color = 'white';
  retryBtn.style.fontSize = '1rem';
  retryBtn.style.cursor = 'pointer';
  retryBtn.onclick = () => {
    document.body.removeChild(overlay);
    window.location.reload();
  };
  btnContainer.appendChild(retryBtn);

  const backBtn = document.createElement('button');
  backBtn.innerText = 'Go Back';
  backBtn.style.padding = '12px 25px';
  backBtn.style.margin = '0 10px';
  backBtn.style.border = 'none';
  backBtn.style.borderRadius = '8px';
  backBtn.style.backgroundColor = '#f44336';
  backBtn.style.color = 'white';
  backBtn.style.fontSize = '1rem';
  backBtn.style.cursor = 'pointer';
  backBtn.onclick = () => {
    window.location.href = '/GamePages/home';
  };
  btnContainer.appendChild(backBtn);
}
