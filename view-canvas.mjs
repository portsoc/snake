import { game, size } from './game.mjs';

const UNIT = 40;
let xyMax;
let gameEl;
let gridOn = true;
let c;

export function startView() {
  xyMax = UNIT * size;

  gameEl = document.createElement('canvas');
  gameEl.width = size * UNIT;
  gameEl.height = size * UNIT;
  gameEl.id = 'canvasGame';
  gameEl.classList.add('game');
  document.body.append(gameEl);

  c = gameEl.getContext('2d');
  view();
}

function line(x1,y1,x2,y2, col = 'grey') {
  c.beginPath();
  c.strokeStyle=col;
  c.moveTo(x1,y1);
  c.lineTo(x2,y2);
  c.stroke();
}

function drawGrid() {
  for (let x=0; x<size; x++) {
    line(0, x*UNIT, xyMax, x*UNIT);
    line(x*UNIT, 0, x*UNIT, xyMax);
  }
}

function drawFood() {
  c.fillStyle = 'purple';
  c.fillRect(game.food.x*UNIT,game.food.y*UNIT,UNIT,UNIT);
}

function drawSnake() {
  c.fillStyle = game.player.alive ? 'green' : 'red';
  for (const coords of game.player.body) {
    c.fillRect(coords.x*UNIT,coords.y*UNIT,UNIT,UNIT);
  }
}

function view() {
  if (!game.player.alive) {
    gameEl.classList.add('gameover');
  } else {
    gameEl.classList.remove('gameover');
  }

  c.clearRect(0,0,xyMax,xyMax);
  drawSnake();
  drawFood();
  if (gridOn) {
    drawGrid();
  }

  requestAnimationFrame(view);
}

function coordsToChild({x, y}) {
  const pos = x + y*size;
  return gameEl.children[pos];
}

export function viewGrid(value = !gridOn) {
  gridOn = value;
}
