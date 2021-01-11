import { game, size } from './game.mjs';

let gameEl;

export function startView() {
  initializeGameEl();
  view();
}

function view() {
  if (!game.player.alive) {
    gameEl.classList.add('gameover');
  } else {
    gameEl.classList.remove('gameover');

    // clear the view
    for (const child of gameEl.children) {
      child.className = '';
    }

    // add snake
    for (const coords of game.player.body) {
      coordsToChild(coords).classList.add('snake');
    }

    coordsToChild(game.food).classList.add('food');
  }

  requestAnimationFrame(view);
}

function initializeGameEl() {
  if (!gameEl) {
    gameEl = document.createElement('div');
    gameEl.id = 'game';
    gameEl.classList.add('gridon');

    for (let i = 0; i < size*size; i += 1) {
      gameEl.append(document.createElement('div'));
    }

    document.body.append(gameEl);
  }
}

function coordsToChild({x, y}) {
  const pos = x + y*size;
  if (!gameEl.children[pos]) { console.log({x,y,pos}); debugger; }
  return gameEl.children[pos];
}
