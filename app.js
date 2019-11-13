function generateNumber() {
  let generatedNumber = [];

  while (generatedNumber.length < 4) {
    let random = Math.floor(Math.random() * 9) + 1;

    if (generatedNumber.indexOf(random) === -1) {
      generatedNumber.push(random);
    }
  }

  getUserNumber(generatedNumber);
  showComputerValue(generatedNumber.join(''));
}

function getUserNumber(generatedNumber) {
  const tryButton = document.getElementById('try-btn');
  let generatedNumeral = generatedNumber;

  tryButton.addEventListener('click', () => {
    let userInputValue = document.getElementById('user-input').value;

    bullsAndCows(userInputValue, generatedNumeral);
  }, false);
}

function showComputerValue(generatedNumber) {
  const computerNumber = document.getElementById('computer-number');
  const showButton = document.getElementById('show-btn');

  showButton.addEventListener('click', () => {
    computerNumber.innerHTML = `Computer number is: ${generatedNumber}`;
  },false)
}

function bullsAndCows(enteredNumber, generatedNumber) {
  const generatedNumeral = generatedNumber;
  let enteredNumeral = [...new Set(enteredNumber)];
  const errorDiv = document.createElement('div');
  const userNumber = document.getElementById('user-number');
  errorDiv.classList.add('error-div');
  errorDiv.innerHTML = '';

  for (let i = 0; i < enteredNumeral.length; i++) {
    enteredNumeral[i] = +enteredNumeral[i];
  }

  const gameCounter = {
    bulls: 0,
    cows: 0,
  };

  if (enteredNumeral.length !== 4
      || !/[0-9]/.test(enteredNumber)
      || isNaN(enteredNumber)) {
    errorDiv.innerHTML =
        `<br> You can only use a four-digit number. <br>
          You cannot use duplicate numbers or any other characters.`;
    userNumber.append(errorDiv);
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (generatedNumeral[i] === enteredNumeral[i]) {
      gameCounter.bulls++;
    } else if (generatedNumeral.includes(enteredNumeral[i])) {
      gameCounter.cows++;
    }
  }

  if (gameCounter.bulls === 4){
    const congratsDiv = document.createElement('div');
    congratsDiv.innerHTML =
        `<img src="pictures/hooray.jpg" alt="hooray" class="hooray-pic"> <br>
          <span class="hooray-text">You are the winner of this game! <br>
                                    Please, refresh the page to start new game</span>`;
    userNumber.append(congratsDiv);
  }

  render(generatedNumeral, enteredNumeral.join(''),gameCounter);
}

function render(generatedNumeral, enteredNumeral, gameCounter) {
  const userNumber = document.getElementById('user-number');
  const userDiv = document.createElement('div');

  userDiv.innerHTML =
  `<br> You'r number is: ${enteredNumeral} <br> 
   You have: ${gameCounter.bulls} bulls and ${gameCounter.cows} cows`;

  userNumber.append(userDiv);
}

generateNumber();
