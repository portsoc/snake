"use strict";
import * as keys from './keysWeb.mjs';

const SNAKE_SAVE_GAME = "snakeSaveGame";

let g, paused, turbo, lastUpdated, futureDirectionChanges, game;

function activate(c) {
    g.active.push(c);
    c.classList.add("snake");
}

function createGrid(where) {
  for (let y = 0; y<g.size; y++) {
    for (let x = 0; x<g.size; x++) {
      let e = document.createElement("div");
      e.id=`x${x}y${y}`;
      where.appendChild(e);
    }
  }
}

function addRandomFood() {
  let x=0, y=0, searching=true, cell;
  while (searching) {
    x = Math.round(Math.random()*1000) % g.size;
    y = Math.round(Math.random()*1000) % g.size;
    cell = document.querySelector(`#x${x}y${y}`);
    searching = cell.classList.contains("snake");
  }
  cell.classList.add("food");
}



function check(cell) {
  const c = document.querySelector(`#x${cell.x}y${cell.y}`);

  // if it's a snake cell, die.
  if (c.classList.contains("snake")) {
    throw new Exception("game over");
  }

  activate(c);

  if (c.classList.contains("food")) {
    // if it's a food cell, grow
    c.classList.remove("food")
    addRandomFood();
    g.speed-=1
  } else {
    // otherwise deactivate the other end
    let tail = g.active.shift();
    tail.classList.remove("snake");
  }

}

function gameover() {
    game.classList.add("gameover");
}

function toggleGrid() {
    game.classList.toggle("gridon")
}

function saveGame() {
    g.snake = Array.from(game.querySelectorAll(".snake")).map(x => x.id);
    g.food = Array.from(game.querySelectorAll(".food")).map(x => x.id);
    g.activeStore = Array.from(g.active).map(x => x.id);
    localStorage[snakeSaveGame] = JSON.stringify(g);
}

function loadGame() {
    togglePause();
    g = JSON.parse(localStorage[snakeSaveGame]);
    g.snake.forEach(e => {
        document.getElementById(e).classList.add("snake");
    });
    g.food.forEach(e => {
        document.getElementById(e).classList.add("food");
    });
    g.active = g.activeStore.map( id =>
        document.getElementById(id)
    );
    localStorage.removeItem(snakeSaveGame);
}

function move(cell) {
    cell.x += cell.xdir;
    cell.y += cell.ydir;
}

function step(now) {
    try {
        if(now-lastUpdated > (turbo ? g.speed/2 : g.speed)) {
            lastUpdated = now;
            changeDirection();
            move(g.pos);
            check(g.pos);
        }
        if (!paused) {
            window.requestAnimationFrame(step);
        }
    } catch (e) {
        console.log(e);
        gameover();
    }
}


function changeDirection() {
    let key
    if (futureDirectionChanges.length > 0) {
        const key = futureDirectionChanges.shift();
        switch (key) {
            case "d":
                g.pos.xdir=0;
                g.pos.ydir=1;
                break;
            case "u":
                g.pos.xdir=0;
                g.pos.ydir=-1;
                break;
            case "l":
                g.pos.xdir=-1;
                g.pos.ydir=0;
                break;
            case "r":
                g.pos.xdir=1;
                g.pos.ydir=0;
                break;
        }
    }
}

function queueDirectionChange(dir) {
    futureDirectionChanges.push(dir);
}


function togglePause() {
    if (!paused) {
      saveGame();
    }
    paused = !paused;
    if (!paused) {
      window.requestAnimationFrame(step);
    }
}

function toggleTurbo(bool) {
    console.log('turb'+bool);
  turbo = bool;
}

function prep() {
    keys.init()
    window.addEventListener('turbo', e => toggleTurbo(e.detail));
    window.addEventListener('pause', togglePause);
    window.addEventListener('direction', e => queueDirectionChange(e.detail));
    window.addEventListener('grid', toggleGrid);

    g = {
        size: 25,
        pos: {x:12,y:12, xdir:1, ydir:0},
        speed: 200,
        active: []
    };

    paused=false;
    turbo = false;
    lastUpdated=new Date().getMilliseconds();
    futureDirectionChanges = [];

    game = document.createElement("div");
    game.id="game";
    document.body.append(game);

    createGrid(game);

    if (localStorage.SNAKE_SAVE_GAME) {
        loadGame();
    } else {
        activate( document.querySelector(`#x${g.pos.x}y${g.pos.y}`) );
        addRandomFood();
    }
    toggleGrid();

    window.requestAnimationFrame(step);
}

window.addEventListener('load', prep);