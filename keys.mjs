import * as game from './game.mjs';
import * as view from './view-canvas.mjs';

function keydown(e) {
  switch (e.key) {
    case "ArrowDown":
      game.queueDirectionChange(game.DIRECTIONS.d);
      break;
    case "ArrowUp":
      game.queueDirectionChange(game.DIRECTIONS.u);
      break;
    case "ArrowLeft":
      game.queueDirectionChange(game.DIRECTIONS.l);
      break;
    case "ArrowRight":
      game.queueDirectionChange(game.DIRECTIONS.r);
      break;
    case "p":
    case "P":
      game.pause();
      break;
    case "Shift":
      game.turbo(true);
      break;
    case "g":
    case "G":
      view.viewGrid();
      break;
    case " ":
    case "r":
    case "R":
      if (!game.game.player.alive) game.startGame();
  }
}

function keyup(e) {
  switch (e.key) {
    case "Shift":
      game.turbo(false);
      break;
  }
}

export function initKeys() {
  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);
}
