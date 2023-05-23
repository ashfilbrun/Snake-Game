// define variables
let sqrSize = 25;
let rows = 20;
let columns = 20;
let board;
let context;
let canvas = document.getElementById('snake')
let canvas2d = canvas.getContext('2d')
// game functionality

window.onload = function() {
  board = document.getElementById('board');
  board.height = rows * sqrSize;
  board.width = columns * sqrSize;
  context = board.getContext('2d');

  update();
}
// render 

// win conditions

// lose conditions