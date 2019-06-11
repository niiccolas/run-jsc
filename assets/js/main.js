/* eslint-disable no-multi-spaces */
const digitsAndSuffixes = /\d+[s|m|h|d]/gi;
let inputTimes = {
  s: 0,
  m: 0,
  h: 0,
  d: 0,
};
const offset = 1000;
const node   = document.getElementById('time-input');
const timerCompleteSound = new Audio('./assets/audio/atria.ogg');
let timeTarget;
let countInterval;

function getUserInput() {
  const userInput      = document.getElementById('time-input').value.replace(/ /g, '');
  const userInputArray = userInput.match(digitsAndSuffixes);

  if (userInputArray) {
    // Populate inputTimes object
    // Always reset previous input times to allow for timer queueing
    Object.keys(inputTimes).forEach((el) => { inputTimes[el] = 0 });
    userInputArray.forEach((el) => {
      const timeUnitSuffix = el.substr(-1);
      inputTimes[timeUnitSuffix] += Number(el.match(/\d+/g).join());
    });
  }
  return inputTimes;
}

function userInputToMs() {
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
  // Reset display
  document.querySelector('#time-input').style.background = 'black';
  document.querySelector('body').classList.remove('countdown-over');
  // Reveal rows titles
  var vues = document.getElementsByClassName('vue-row')
  Array.from(vues).forEach( vue => vue.classList.add('reveal'));

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
    timerCompleteSound.play();

    // Change background color for clearer UI
    document.querySelector('#time-input').style.background = 'red';
    document.querySelector('body').classList.add('countdown-over');
  }
}

/*

   ____                    __  __             _             _       _   _
  |  _ \  ___  _ __ ___   |  \/  | __ _ _ __ (_)_ __  _   _| | __ _| |_(_) ___  _ __
  | | | |/ _ \| '_ ` _ \  | |\/| |/ _` | '_ \| | '_ \| | | | |/ _` | __| |/ _ \| '_ \
  | |_| | (_) | | | | | | | |  | | (_| | | | | | |_) | |_| | | (_| | |_| | (_) | | | |
  |____/ \___/|_| |_| |_| |_|  |_|\__,_|_| |_|_| .__/ \__,_|_|\__,_|\__|_|\___/|_| |_|
                                               |_|

*/

document.getElementById('reset').addEventListener('click', () => {
  location.reload();
});

document.getElementById('start').addEventListener('click', () => {
  // At least one valid value has been entered
  const input = Object.values(getUserInput()).some(el => el > 0);
  if (input) {
    timeTarget    = Date.now() + offset + userInputToMs();
    countInterval = setInterval(launchTimer, 1);
  }
});

node.addEventListener('keyup', (event) => {
  // At least one valid value has been entered
  if (event.key === 'Enter') {
    const input = Object.values(getUserInput()).some(el => el > 0);
    if (input) {
      timeTarget       = Date.now() + offset + userInputToMs();
      node.placeholder = '';

      // Clear previous intervals
      clearInterval(countInterval);
      countInterval    = setInterval(launchTimer, 1);
    }
  }
});
