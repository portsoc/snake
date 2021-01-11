import { queueDirectionChange, DIRECTIONS } from './game.mjs';

export function keydown(key) {
  switch (key) {
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
