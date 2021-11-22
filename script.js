"use strict";

const gridEl = document.querySelector('.gridEl');
const startBtn = document.querySelector('#startBtn');
const scoreEl = document.querySelector('#scoreEl');

let grid = [];
let snake = [2, 1, 0];
let tail = '';
let direction = 1;
let intervalID = 0;
let gameBegan = false;
let appleIndex = 0;
let defaultSpeed = 1000;
let speedUp = 0.9;
let playerScore = 0;

function renderGrid() {
   for (let i = 0; i < 100; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      gridEl.append(square);
      grid.push(square);
   }
}
renderGrid();

snake.forEach( (index) => { grid[index].classList.add('snake') });

startBtn.addEventListener('click', function() {
   if (!gameBegan) {
      intervalID = setInterval(moveSnake, defaultSpeed);
      gameBegan = "true";
   } else {
      clearInterval(intervalID);
      gameBegan = "false";
   }
})

function moveSnake() {

   if ( snake[0] % 10 === 9 && direction === 1
      || snake[0] % 10 === 0 && direction === -1
      || snake[0] + 10 >= 100 && direction === 10
      || snake[0] - 10 <= 0 && direction === -10 
      || grid[snake[0] + direction].classList.contains('snake')) {
         return clearInterval(intervalID);
   }

   tail = snake[snake.length - 1];
   grid[tail].classList.remove('snake');
   snake.pop();
   grid[snake[0] + direction].classList.add('snake');
   snake.unshift(snake[0] + direction);

   eatApple();
}

function controlSnake(event) {
   if (event.key === 'ArrowDown' || event.key === 'Down') {
      direction = 10;
   } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      direction = -10;
   } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
      direction = -1;
   } else if (event.key === 'ArrowRight' || event.key === 'Right') {
      direction = 1;
   }
}
document.addEventListener('keyup', controlSnake);

function showApple() {
   do {
      appleIndex = Math.floor(Math.random() * 100);
   } while( grid[appleIndex].classList.contains('snake') ) {
      grid[appleIndex].classList.add('apple');
   }
}
showApple();

function eatApple() {
   if (grid[snake[0]].classList.contains('apple')) {
      grid[snake[0]].classList.remove('apple');
      showApple();
      grid[tail].classList.add('snake');
      snake.push(tail);
      playerScore++;
      scoreEl.innerHTML = playerScore;

      clearInterval(intervalID);
      defaultSpeed *= speedUp;
      intervalID = setInterval(moveSnake, defaultSpeed);
   }
}


// think need to add this comment to make a merge
