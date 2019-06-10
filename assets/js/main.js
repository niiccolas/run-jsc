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
