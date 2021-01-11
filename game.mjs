export const size = 25;
const initialSize = 10;

export const DIRECTIONS = {
  u: { x: 0, y: -1 },
  d: { x: 0, y: 1 },
  l: { x: -1, y: 0 },
  r: { x: 1, y: 0 },
};

export let game;

function createGame() {
  const body = makeBody();
  const game = {
    speed: 200,
    player: {
      body,
      direction: DIRECTIONS.r,
      alive: true,
      moves: [],
    },
    food: generateFoodPosition(body),
  };
  return game;
}

function move() {
  if (game.pause) return true; // pretend we moved

  // add cell to head
  const oldHead = game.player.body[game.player.body.length - 1];

  if (game.player.moves.length !== 0) {
    const nextDirection = game.player.moves.shift();
    game.player.direction = nextDirection;
  }

  const newHead = {
    x: oldHead.x + game.player.direction.x,
    y: oldHead.y + game.player.direction.y,
  }

  if (isColliding(newHead, game.player.body)) {
    game.player.alive = false;
    return false;
  }

  const eating = newHead.x === game.food.x && newHead.y === game.food.y;
  game.player.body.push(newHead);
  if (eating) {
    game.food = generateFoodPosition(game.player.body);
    game.speed -= 1;
  } else {
    game.player.body.shift();
  }
  return true;
}

function isColliding(newHead, body) {
  return bodyContainsCoordinates(body, newHead) ||
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= size ||
    newHead.y >= size;
}

export function queueDirectionChange(direction) {
  if (!Object.values(DIRECTIONS).includes(direction)) {
    throw new TypeError('unsupported direction, must be a value from DIRECTIONS');
  }
  game.player.moves.push(direction);
}

function makeBody() {
  const retval = [];
  for (let i=0; i<initialSize; i+=1) {
    retval.push({
        x: i,
        y: size-1,
    })
  }
  return retval;
}

function randomCoords() {
  return {
    x: Math.trunc(Math.random() * size),
    y: Math.trunc(Math.random() * size),
  };
}

function generateFoodPosition(body) {
  let coords;
  do {
    coords = randomCoords();
  } while (bodyContainsCoordinates(body, coords));
  return coords;
}

function bodyContainsCoordinates(body, coords) {
  for (const {x, y} of body) {
    if (x === coords.x && y === coords.y) return true;
  }
  return false;
}

let currentTimeout;

export function startGame() {
  game = createGame();
  step();
}

function step() {
  clearTimeout(currentTimeout);
  const moved = move();
  if (moved) currentTimeout = setTimeout(step, game.turbo ? game.speed / 2 : game.speed);
}

export function pause(value = !game.pause) {
  game.pause = value;
}

export function turbo(value = !game.turbo) {
  game.turbo = value;
  if (value) step(); // start turbo immediately
}
