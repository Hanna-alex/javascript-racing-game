const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

  car.classList.add('car')

 //устарел 
//start.onclick = function () {
  //start.classList.add('hide');
//}
  
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', spotRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  scrore: 0,
  speed: 3
};

function startGame() {
  start.classList.add('hide');
  setting.start = true;
  gameArea.appendChild(car);
  requestAnimationFrame(playGame);
}

function playGame() {
  console.log('Play game!');
  if (setting.start) {
    requestAnimationFrame(playGame);
  }
 
}

function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
  //console.log(event.key);
}

function spotRun(event) {
  event.preventDefault();
  keys[event.key] = false;
  //console.log(event.key);
}
