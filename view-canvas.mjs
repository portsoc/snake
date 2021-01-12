import { game, size } from './game.mjs';

const UNIT = 40;
let xyMax;
let gameEl;
let gridOn = true;
let c;
const colors = {};

export function startView() {
  xyMax = UNIT * size;

  gameEl = document.createElement('canvas');
  c = gameEl.getContext('2d');

  gameEl.width = size * UNIT;
  gameEl.height = size * UNIT;
  gameEl.id = 'canvasGame';
  gameEl.classList.add('game');
  document.body.append(gameEl);

  prepColorReference();
  view();
}

function cssVarToProperty(name, obj) {
  obj[name] = getComputedStyle(document.documentElement).getPropertyValue("--"+name);
}

function prepColorReference() {
  const props = ['bg', 'snake', 'food', 'gameover', 'border', 'grid'];
  props.forEach( prop => cssVarToProperty(prop, colors) );
}

function line(x1,y1,x2,y2, col = 'grey') {
  c.beginPath();
  c.strokeStyle=col;
  c.moveTo(x1-0.5,y1-0.5);
  c.lineTo(x2-0.5,y2-0.5);
  c.stroke();
}

function drawGrid() {
  for (let x=0; x<size; x++) {
    line(0, x*UNIT, xyMax, x*UNIT);
    line(x*UNIT, 0, x*UNIT, xyMax);
  }
}

function drawFood() {
  c.fillStyle = colors.food;
  c.fillRect(game.food.x*UNIT,game.food.y*UNIT,UNIT,UNIT);
}

function drawSnake() {
  c.fillStyle = game.player.alive ? colors.snake : colors.gameover;
  for (const coords of game.player.body) {
    c.fillRect(coords.x*UNIT,coords.y*UNIT,UNIT,UNIT);
  }
}

function view() {
  c.clearRect(0,0,xyMax,xyMax);
  drawSnake();
  drawFood();
  if (gridOn) {
    drawGrid();
  }

  requestAnimationFrame(view);
}

export function viewGrid(value = !gridOn) {
  gridOn = value;
}
