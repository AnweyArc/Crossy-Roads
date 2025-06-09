let score = 0;
let onScoreChangeCallback = null;

export function resetScore() {
  score = 0;
  if (onScoreChangeCallback) onScoreChangeCallback(score);
}

export function incrementScore() {
  score += 1;
  if (onScoreChangeCallback) onScoreChangeCallback(score);
}

export function getScore() {
  return score;
}

export function onScoreChange(callback) {
  onScoreChangeCallback = callback;
}
