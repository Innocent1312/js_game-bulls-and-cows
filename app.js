function generateNumber() {
  let generatedNumber = [];

  while (generatedNumber.length < 4) {
    let random = Math.floor(Math.random() * 9) + 1;

    if (generatedNumber.indexOf(random) === -1) {
      generatedNumber.push(random);
    }
  }

  getUserNumber(generatedNumber);
  showComputerValue(generatedNumber);
}

function getUserNumber(generatedNumber) {
  const tryButton = document.getElementById('try-btn');
  let generatedNumeral = generatedNumber;

  tryButton.addEventListener('click', ()=>{
    let userInputValue = document.getElementById('user-input').value;

    bullsAndCows(userInputValue, generatedNumeral);
  }, false);
}

function showComputerValue(generatedNumber) {
  const computerNumber = document.getElementById('computer-number');
  const showButton = document.getElementById('show-btn');

  showButton.addEventListener('click', () => {
    const computerDiv = document.createElement('div');

    computerDiv.innerHTML = `Computer number is: ${generatedNumber}`;
    computerNumber.append(computerDiv);
  },false)
}

function bullsAndCows(enteredNumber, generatedNumber) {
  const generatedNumeral = generatedNumber;
  let enteredNumeral = [...new Set(enteredNumber)];

  for (let i = 0; i < enteredNumeral.length; i++) {
    enteredNumeral[i] = +enteredNumeral[i];
  }

  const gameCounter = {
    bulls: 0,
    cows: 0,
  };

  if (enteredNumeral.length !== 4
      || !/[0-9]/.test(enteredNumber)) {
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (generatedNumeral[i] === enteredNumeral[i]) {
      gameCounter.bulls++;
    } else if (generatedNumeral.includes(enteredNumeral[i])) {
      gameCounter.cows++;
    }
  }

  render(generatedNumeral, enteredNumeral,gameCounter);
}

function render(generatedNumeral, enteredNumeral, gameCounter) {
  const userNumber = document.getElementById('user-number');
  const userDiv = document.createElement('div');
  const gameDiv = document.createElement('div');
  const br = document.createElement('br');

  userDiv.innerHTML = `You'r number is: ${enteredNumeral}`;
  gameDiv.innerHTML = `You have: ${gameCounter.bulls} bulls and ${gameCounter.cows} cows`;

  userNumber.append(userDiv);
  userNumber.append(gameDiv);
  userNumber.append(br);
}

generateNumber();
