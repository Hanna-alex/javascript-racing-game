const MAX_ENEMY = 7;

const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

const music = new Audio ('audio/stop-living-a-lie.mp3');
 console.log(music)

//music.classList.add('visually-hidden');

car.classList.add('car')

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
  score: 0,
  speed: 3,
  traffic: 2
};

function getQuantityElements(hightElement) {
  return document.documentElement.clientHeight / hightElement + 1;
}

const getRandomEnemy = (max) => Math.floor((Math.random() * max) + 1);

function startGame() {
  music.play();
  setting.score = 0;
  score.classList.remove('hide');
  start.classList.add('hide');

  gameArea.innerHTML = '';
  
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = `transparent 
    url(../img/enemy${getRandomEnemy(MAX_ENEMY)}.png)
    center / cover
    no-repeat`;
    gameArea.appendChild(enemy);
  }

 
  setting.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
  car.style.top = 'auto';
  car.style.bottom = '10px';
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {

  score.innerHTML = 'SCORE:<br> ' + setting.score;

  if (setting.start) {
    setting.score += setting.speed;   
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }

    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed;
    }

    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }

    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed;
    }

    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';


    requestAnimationFrame(playGame);
  }

}

function startRun(event) {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();
    keys[event.key] = true;
  //console.log(event.key);
  }
  
}

function spotRun(event) {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();
    keys[event.key] = false;
    //console.log(event.key);
  }
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (line, i) {
    line.y += setting.speed;
    line.style.top = line.y + 'px';

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  })
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function (item) {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if (carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top) {
      setting.start = false;
      music.pause();
      //console.warm('ДТП');
      start.classList.remove('hide');
     // score.style.top = start.offsetHeight;
    }
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });


}