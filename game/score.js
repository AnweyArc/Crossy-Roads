// /game/score.js
let score = 0;

export function resetScore() {
  score = 0;
}

export function incrementScore() {
  score += 1;
}

export function getScore() {
  return score;
}
