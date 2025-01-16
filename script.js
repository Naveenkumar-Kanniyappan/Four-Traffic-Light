const lights = {
  north: {
    red: document.querySelector('#north-red'),
    yellow: document.querySelector('#north-yellow'),
    green: document.querySelector('#north-green'),
    timer: document.querySelector('#north-timer'),
  },
  east: {
    red: document.querySelector('#east-red'),
    yellow: document.querySelector('#east-yellow'),
    green: document.querySelector('#east-green'),
    timer: document.querySelector('#east-timer'),
  },
  south: {
    red: document.querySelector('#south-red'),
    yellow: document.querySelector('#south-yellow'),
    green: document.querySelector('#south-green'),
    timer: document.querySelector('#south-timer'),
  },
  west: {
    red: document.querySelector('#west-red'),
    yellow: document.querySelector('#west-yellow'),
    green: document.querySelector('#west-green'),
    timer: document.querySelector('#west-timer'),
  },
};

const directions = ['north', 'east', 'south', 'west'];
let currentDirectionIndex = 0;
let timers = {}; 

function resetLights() {
  Object.values(lights).forEach((direction) => {
    direction.red.classList.add('active');
    direction.yellow.classList.remove('active');
    direction.green.classList.remove('active');
    direction.timer.textContent = '15';  
  });
}

function activateLight(direction, color) {
  resetLights();
  lights[direction].red.classList.remove('active');
  lights[direction][color].classList.add('active');
  startTimer(direction, color);
}

function startTimer(direction, color) {
  let timeLeft = color === 'green' ? 15 : color === 'yellow' ? 10 : 20;
  lights[direction].timer.textContent = timeLeft; 

  if (timers[direction]) {
    clearInterval(timers[direction]); 
  }
  timers[direction] = setInterval(() => {
    timeLeft--;
    lights[direction].timer.textContent = timeLeft; 
    if (timeLeft <= 0) {
      clearInterval(timers[direction]); 
      if (color === 'green') {
        setTimeout(() => {
          activateLight(direction, 'yellow');
        }, 1000);
      } else if (color === 'yellow') {
        setTimeout(() => {
          resetLights();
          currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
          startLights();
        }, 1000);
      }
    }
  }, 1000);
}

function startLights() {
  const direction = directions[currentDirectionIndex];
  activateLight(direction, 'green'); 
  setTimeout(() => {
    activateLight(direction, 'yellow'); 
  }, 15000);
}

function setLight() {
  resetLights();
  activateLight('north', 'green'); 
  setTimeout(startLights, 3000); 
}

setLight(); 
