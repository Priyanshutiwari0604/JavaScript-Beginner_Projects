// --- state -------------------------------------------------
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses       = 0;        // start at 0 – we’ll bump it after a guess is made
const maxGuesses  = 100;
let gameOver      = false;

// --- DOM ---------------------------------------------------
const guessField   = document.getElementById('guessField');
const submitBtn    = document.getElementById('submitguess');
const lastResult   = document.querySelector('.lastResult');
const lowOrHi      = document.querySelector('.lowOrHi');
const guessCount   = document.getElementById('guessCount');
const gameContainer= document.querySelector('.game-container');

// -----------------------------------------------------------
function checkGuess () {
  if (gameOver) return;

  const userGuess = Number(guessField.value);

  if (!Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100) {
    alert('Please enter a whole number between 1 and 100.');
    return;
  }

  guesses += 1;
  guessCount.textContent = guesses;

  if (userGuess === randomNumber) {
    showWin();
  } else if (guesses >= maxGuesses) {
    showLose();
  } else {
    showHint(userGuess);
  }

  guessField.value = '';
  guessField.focus();
}

function showHint (guess) {
  lastResult.textContent = 'Wrong!';
  lastResult.className   = 'lastResult';
  lowOrHi.textContent    =
    guess < randomNumber ? 'Your guess is too low!' : 'Your guess is too high!';
}

function showWin () {
  lastResult.textContent =
    `Congratulations! You got it right in ${guesses} ${guesses === 1 ? 'guess' : 'guesses'}!`;
  lastResult.className   = 'lastResult win-message';
  lowOrHi.textContent    = '';
  gameContainer.classList.add('celebration');
  setTimeout(() => gameContainer.classList.remove('celebration'), 600);
  endGame();
}

function showLose () {
  lastResult.textContent = `Game Over! The number was ${randomNumber}.`;
  lastResult.className   = 'lastResult lose-message';
  lowOrHi.textContent    = '';
  endGame();
}

function endGame () {
  guessField.disabled = true;
  submitBtn.disabled  = true;
  gameOver           = true;

  const restartBtn     = document.createElement('button');
  restartBtn.textContent = 'Start New Game';
  restartBtn.className   = 'restart-btn';
  restartBtn.onclick     = resetGame;
  document.querySelector('.results').appendChild(restartBtn);
}

function resetGame () {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guesses      = 0;
  gameOver     = false;

  guessField.disabled = false;
  submitBtn.disabled  = false;
  guessField.value    = '';
  guessField.focus();

  lastResult.textContent = '';
  lastResult.className   = 'lastResult';
  lowOrHi.textContent    = '';
  guessCount.textContent = '0';

  const restartBtn = document.querySelector('.restart-btn');
  if (restartBtn) restartBtn.remove();
}

// --- listeners --------------------------------------------
submitBtn.addEventListener('click', checkGuess);
guessField.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkGuess();
});

// focus on load
guessField.focus();
