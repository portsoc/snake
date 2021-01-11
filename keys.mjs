import { queueDirectionChange, DIRECTIONS, pause, turbo } from './game.mjs';
import { viewGrid } from './view.mjs';

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
    case "p":
    case "P":
      pause();
      break;
    case "Shift":
      turbo(true);
      break;
    case "g":
    case "G":
      viewGrid();
      break;
  }
}

function keyup(e) {
  switch (e.key) {
    case "Shift":
      turbo(false);
      break;
  }
}

export function initKeys() {
  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);
}
