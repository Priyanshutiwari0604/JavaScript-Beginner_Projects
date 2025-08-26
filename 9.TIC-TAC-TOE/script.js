// Game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    X: 0,
    O: 0,
    draws: 0
};

// DOM elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player-display');
const gameMessage = document.getElementById('game-message');
const resetGameBtn = document.getElementById('reset-game');
const resetScoreBtn = document.getElementById('reset-score');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Initialize game
function init() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
    
    resetGameBtn.addEventListener('click', resetGame);
    resetScoreBtn.addEventListener('click', resetScore);
    
    updateScoreDisplay();
    updateCurrentPlayerDisplay();
}

// Handle cell click
function handleCellClick(index) {
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }
    
    gameBoard[index] = currentPlayer;
    updateCellDisplay(index);
    
    if (checkWin()) {
        handleWin();
        return;
    }
    
    if (checkDraw()) {
        handleDraw();
        return;
    }
    
    switchPlayer();
}

// Update cell display
function updateCellDisplay(index) {
    const cell = cells[index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    // Add animation
    cell.style.transform = 'scale(0.8)';
    setTimeout(() => {
        cell.style.transform = 'scale(1)';
    }, 100);
}

// Check for win
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningCells(combination);
            return true;
        }
        return false;
    });
}

// Highlight winning cells
function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

// Check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Handle win
function handleWin() {
    gameActive = false;
    scores[currentPlayer]++;
    updateScoreDisplay();
    gameMessage.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameMessage.style.color = currentPlayer === 'X' ? '#64b5f6' : '#e57373';
    
    // Add celebration effect
    setTimeout(() => {
        gameMessage.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            gameMessage.style.animation = '';
        }, 600);
    }, 100);
}

// Handle draw
function handleDraw() {
    gameActive = false;
    scores.draws++;
    updateScoreDisplay();
    gameMessage.textContent = "It's a draw! 🤝";
    gameMessage.style.color = '#ffa726';
}

// Switch player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
}

// Update current player display
function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = currentPlayer;
    currentPlayerDisplay.style.color = currentPlayer === 'X' ? '#64b5f6' : '#e57373';
}

// Update score display
function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draws;
}

// Reset game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    gameMessage.textContent = '';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
        cell.style.transform = '';
    });
    
    updateCurrentPlayerDisplay();
    
    // Add reset animation
    cells.forEach((cell, index) => {
        cell.style.opacity = '0';
        setTimeout(() => {
            cell.style.opacity = '1';
        }, index * 50);
    });
}

// Reset score
function resetScore() {
    scores = {
        X: 0,
        O: 0,
        draws: 0
    };
    updateScoreDisplay();
    
    // Add confirmation animation
    [scoreX, scoreO, scoreDraw].forEach(element => {
        element.style.transform = 'scale(1.2)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    });
}

// Add smooth transitions
function addSmoothTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .cell {
            transition: all 0.3s ease, transform 0.1s ease;
        }
        #score-x, #score-o, #score-draw {
            transition: transform 0.2s ease;
        }
        .game-message {
            transition: color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    addSmoothTransitions();
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    
    const keyMap = {
        '1': 0, '2': 1, '3': 2,
        '4': 3, '5': 4, '6': 5,
        '7': 6, '8': 7, '9': 8
    };
    
    if (keyMap.hasOwnProperty(e.key)) {
        handleCellClick(keyMap[e.key]);
    }
    
    if (e.key === 'r' || e.key === 'R') {
        resetGame();
    }
});

// Add visual feedback for keyboard users
cells.forEach((cell, index) => {
    cell.setAttribute('tabindex', '0');
    
    cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCellClick(index);
        }
    });
    
    cell.addEventListener('focus', () => {
        if (gameActive && gameBoard[index] === '') {
            cell.style.boxShadow = '0 0 0 2px #64b5f6';
        }
    });
    
    cell.addEventListener('blur', () => {
        cell.style.boxShadow = '';
    });
});

// Add touch support for mobile
let touchStarted = false;

cells.forEach((cell, index) => {
    cell.addEventListener('touchstart', (e) => {
        touchStarted = true;
        e.preventDefault();
    });
    
    cell.addEventListener('touchend', (e) => {
        if (touchStarted) {
            e.preventDefault();
            handleCellClick(index);
            touchStarted = false;
        }
    });
    
    cell.addEventListener('touchcancel', () => {
        touchStarted = false;
    });
});