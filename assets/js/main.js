/* eslint-disable no-multi-spaces */
const digitsAndSuffix = /\d+[s|m|h|d]/gi;
const inputTimes = {
  s: 0,
  m: 0,
  h: 0,
  d: 0,
};

function getUserInput() {
  const userInput = document.getElementById('user-input').value;
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
