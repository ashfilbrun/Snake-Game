var wormBody, food, direction, allowedToMove, isPlaying;
var map;
var speed = 2;
var play;

function initializeVariables() {
  wormBody = [[0, 0]];
  food = 0;
  direction = 'Right';
  allowedToMove = false;
  isPlaying = false;
}

// Creating the map and initializing variables
function initializeGameState(mapElementId) {
  map = document.getElementById(mapElementId);
  initializeVariables();
    // Generating the map pixels
  for (var i = 0; i < 100; i++) {
    var pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    map.appendChild(pixel);
  }
    // Generating the worm body and food
  map.children[0].classList.add('worm-body');
  generateFood();
}

function generateFood() {
  // To prevent generating food over the worm
  while (map.children[food].classList.contains('worm-body')) {
    food = Math.floor(Math.random() * 100);
  }
  // Placing food on the map
  map.children[food].classList.add('food');
}

function startGame() {
  if (!isPlaying) {
    allowedToMove = true;
    play = setInterval(updatePosition, 800 / speed);
    document.getElementById('menu').style.display = 'none';
    document.getElementById('map').style.display = '';
    isPlaying = true;
  }
}

function pauseGame() {
  if (isPlaying) {
    allowedToMove = false;
    clearInterval(play);
    document.getElementById('menu-text').innerText = 'PAUSED\nPress ENTER to resume';
    document.getElementById('menu').style.display = '';
    document.getElementById('map').style.display = 'none';
    isPlaying = false;
  }
}

function gameOver() {
  clearInterval(play);
  document.getElementById('menu-text').innerText =
    'Game Over\nYour Score: ' +
    (wormBody.length - 1) +
    '\nPress ENTER to restart!';
  document.getElementById('menu').style.display = '';
  document.getElementById('map').style.display = 'none';
  map.innerText = ''; // Clearing the map
  initializeGameState(map.id); // Re-generating the map
}

function updatePosition() {
  var newPosR, newPosC;
  var head = wormBody[wormBody.length - 1];
  switch (direction) {
    case 'Up':
      newPosR = head[0] - 1;
      newPosC = head[1];
      break;
    case 'Down':
      newPosR = head[0] + 1;
      newPosC = head[1];
      break;
    case 'Left':
      newPosR = head[0];
      newPosC = head[1] - 1;
      break;
    case 'Right':
      newPosR = head[0];
      newPosC = head[1] + 1;
      break;
    default:
      break;
  }
    // Checking if worm hit the wall
  if (newPosR < 0 || newPosR > 9 || newPosC < 0 || newPosC > 9) {
    gameOver();
  } else {
    wormBody.push([newPosR, newPosC]);
    updateScreen();
    allowedToMove = true;
  }
}

function updateScreen() {
  var tailArray = wormBody.shift();
  var tail = parseInt(tailArray[0] + '' + tailArray[1]);
  var headArray = wormBody[wormBody.length - 1];
  var head = parseInt(headArray[0] + '' + headArray[1]);
  // Checking if the worm bite its body
  if (map.children[head].classList.contains('worm-body')) {
    gameOver();
  } else {
    // Adds the new head block
    map.children[head].classList.add('worm-body');
    // Removes the tail block
    map.children[tail].classList.remove('worm-body');
    // If worm eats the food
    if (head == food) {
      map.children[food].classList.remove('food');
      wormBody.unshift(tailArray);
      // Checking if the worm reached its max size
      wormBody.length == 100 && gameOver();
      generateFood();
    }
  }
}

// CONTROLS
document.onkeydown = keyPress;

function keyPress(e) {
  e.preventDefault();
  e = e || window.event;
  // Escape key is pressed
  e.keyCode == 27 && pauseGame();
  // Enter key is pressed
  e.keyCode == 13 && startGame();
  let up = 38;
  let down = 40;
  let left = 37;
  let right = 39;
  if (allowedToMove) {
    allowedToMove = false;
    switch (e.keyCode) {
      case left:
        direction != 'Right' && (direction = 'Left');
        break;
      case up:
        direction != 'Down' && (direction = 'Up');
        break;
      case right:
        direction != 'Left' && (direction ='Right');
        break;
      case down:
        direction != 'Up' && (direction = 'Down');
        break;
      default:
        allowedToMove = true;
        break;
    }
  }
}

// Initiates the game
initializeGameState('map');
