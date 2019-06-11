/* eslint-disable no-multi-spaces */
const digitsAndSuffix = /\d+[s|m|h|d]/gi;
const inputTimes = {
  s: 0,
  m: 0,
  h: 0,
  d: 0,
};
const offset = 1000;
const node   = document.getElementById('time-input');
let timeTarget;
let countInterval;

function getUserInput() {
  const userInput = document.getElementById('time-input').value;
  const userInputArray = userInput.match(digitsAndSuffix);

  // Populate inputTimes object
  if (userInputArray) {
    userInputArray.forEach((el) => {
      const timeUnitSuffix = el.substr(-1);
      inputTimes[timeUnitSuffix] += Number(el.match(/\d+/g).join());
    });
  }
}

function userInputToMs() {
  getUserInput();
  let totalMs = 0;

  Object.keys(inputTimes).forEach((key) => {
    switch (key) {
      case 's':
        totalMs += inputTimes[key] * 1000;
        break;
      case 'm':
        totalMs += inputTimes[key] * 60000;
        break;
      case 'h':
        totalMs += inputTimes[key] * 3600000;
        break;
      case 'd':
        totalMs += inputTimes[key] * 86400000;
        break;
      default:
        totalMs += 0;
    }
  });

  return totalMs;
}

function launchTimer() {
  const timeCurrent = Date.now();
  const timeDelta   = timeTarget - timeCurrent;
  const days    = Math.floor((timeDelta / (24 * 60 * 60 * 1000)));
  const hours   = Math.floor((timeDelta % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((timeDelta % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeDelta % (60 * 1000)) / 1000);

  // Populate DOM
  document.getElementById('days').innerHTML    = days;
  document.getElementById('hours').innerHTML   = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  // When countdown is over, say/play something nice :-)
  if (timeDelta <= 10) {
    clearInterval(countInterval);
    document.querySelector('#time-input').value = 'TIME‘S UP!';
    new Audio('./assets/audio/atria.ogg').play();

    // Change background color for clearer UI
    document.querySelector('#time-input').style.background = 'red';
    document.querySelector('body').classList.add('countdown-over');
  }
}

document.getElementById('start').addEventListener('click', () => {
  timeTarget    = Date.now() + offset + userInputToMs();
  countInterval = setInterval(launchTimer, 1);
});

node.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    timeTarget    = Date.now() + offset + userInputToMs();
    countInterval = setInterval(launchTimer, 1);
    node.value    = '';
  }
});
