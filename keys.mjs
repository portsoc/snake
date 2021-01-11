import { queueDirectionChange, DIRECTIONS } from './game.mjs';

function keydown(e) {
  switch (e.key) {
    case "ArrowDown":
      queueDirectionChange(DIRECTIONS.d);
      break;
    case "ArrowUp":
      queueDirectionChange(DIRECTIONS.u);
      break;
    case "ArrowLeft":
      queueDirectionChange(DIRECTIONS.l);
      break;
    case "ArrowRight":
      queueDirectionChange(DIRECTIONS.r);
      break;
  }
}

export function initKeys() {
  document.addEventListener("keydown", keydown);
}
