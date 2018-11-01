"use strict";

const size=25;
const pos= {x:12,y:12, xdir:1, ydir:0};
let lastUpdated=new Date().getMilliseconds();
let speed = 200;

const game = document.createElement("div");
game.id="game";
document.body.appendChild(game);

const active = [];

const futureDirectionChanges = [];


for (let y = 0; y<size; y++) {
    for (let x = 0; x<size; x++) {
        let e = document.createElement("div");
        e.id=`x${x}y${y}`;
        game.appendChild(e);
    }
}

activate( document.querySelector(`#x${pos.x}y${pos.y}`) );
addRandomFood();

function addRandomFood() {
    let x=0, y=0, searching=true, cell;
    while (searching) {
        x = Math.round(Math.random()*25);
        y = Math.round(Math.random()*25);
        cell = document.querySelector(`#x${x}y${y}`);
        searching = cell.classList.contains("snake"); 
    }
    cell.classList.add("food");
}


function activate(c) {
    active.push(c);
    c.classList.add("snake");    
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
        speed-=1
    } else {
        // otherwise deactivate the other end
        let tail = active.shift();
        tail.classList.remove("snake");
    }

}

function gameover() {
    game.classList.add("gameover"); 
}

function toggleGrid() {
    game.classList.toggle("gridon")
}

function move(cell) {
    cell.x += cell.xdir;
    cell.y += cell.ydir;
}

function step(now) {    
    try {
        if(now-lastUpdated > speed) {
            lastUpdated = now;
            changeDirection();
            move(pos);
            check(pos);
        }
        window.requestAnimationFrame(step);
    } catch (e) {
        console.log(e);
        gameover();
    }
}


function joystick(e) {
    console.log(e.key);
    switch (e.key) {
        case "ArrowDown":
        case "ArrowUp":
        case "ArrowLeft":
        case "ArrowRight":
            futureDirectionChanges.push(e.key);
            break;
        case "G":
        case "g":
            toggleGrid();
            break;
        default:
            break;
    }
}

function changeDirection() {
    let key
    if (futureDirectionChanges.length > 0) {
        const key = futureDirectionChanges.shift();
        switch (key) {
            case "ArrowDown":
                pos.xdir=0;
                pos.ydir=1;
                break;
            case "ArrowUp":
                pos.xdir=0;
                pos.ydir=-1;
                break;
            case "ArrowLeft":
                pos.xdir=-1;
                pos.ydir=0;
                break;
            case "ArrowRight":
                pos.xdir=1;
                pos.ydir=0;
                break;
        }
    }
}

document.addEventListener("keydown", joystick);
window.requestAnimationFrame(step);
