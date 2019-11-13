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
  const userInput = document.getElementById('user-input');
  let generatedNumeral = generatedNumber;

  userInput.addEventListener('keyup', (event)=>{
    if (event.code === 'Enter'){
      let userInputValue = document.getElementById('user-input').value;

      bullsAndCows(userInputValue, generatedNumeral);
    }
  }, false)

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
  const errorDiv = document.getElementById('error-div');
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

  console.log(enteredNumber.length);

  if (enteredNumeral.length !== 4
      || enteredNumber.length >= 5
      || !/[0-9]/.test(enteredNumber)
      || isNaN(enteredNumber)) {
        errorDiv.innerHTML =
            `<br> You can only use a four-digit number. <br>
              You cannot use duplicate numbers or any other characters.`;
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
    userNumber.innerHTML =
        `<img src="pictures/hooray.jpg" alt="hooray" class="hooray-pic"> <br>
          <span class="hooray-text">You are the winner of this game! <br>
           <input type="button" value="Start New Game" id="gameBtn" class="button"></span>`;

    const gameBtn = document.getElementById('gameBtn');

    gameBtn.addEventListener('click', ()=>{
      window.location.reload();
      enteredNumber = 0;
    },false);
    return;
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
