const 
let foodX;
let foodY;
let gameOver = false;
let context;
let snakeX
let snakeY
let speedX = 0;
let speedY = 0;
let snakeBody = [];

// game functionality

function initializeVar() {
  snakeBody = [[0, 0]];
  food = 0;
  direction = 'right';
  canMove = false;
  isPlaying = false;
}

// const changeFoodPosition = () => {}

// window.onload = function() {
//   board = document.getElementById('board');
//   board.height = rows * sqrSize;
//   board.width = columns * sqrSize;
//   context = board.getContext('2d');

//   update();
// }

// render 

// win conditions

// lose conditions
