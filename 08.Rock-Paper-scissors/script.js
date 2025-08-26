// External JavaScript - Enhanced Game Logic with Elegant Dark Theme
class RockPaperScissors {
    constructor() {
        this.choices = ["rock", "paper", "scissors"];
        this.choiceEmojis = {
            rock: "🪨",
            paper: "📄", 
            scissors: "✂️"
        };
        this.playerScore = 0;
        this.computerScore = 0;
        this.totalRounds = 0;
        this.isPlaying = false;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.playerDisplay = document.getElementById('playerChoice');
        this.computerDisplay = document.getElementById('computerChoice');
        this.resultDisplay = document.getElementById('resultDisplay');
        this.playerScoreDisplay = document.getElementById('playerScore');
        this.computerScoreDisplay = document.getElementById('computerScore');
        this.totalRoundsDisplay = document.getElementById('totalRounds');
    }

    setupEventListeners() {
        // Keyboard support
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });

        // Prevent right-click on buttons for better UX
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('contextmenu', (e) => e.preventDefault());
        });
    }

    getRandomChoice() {
        return this.choices[Math.floor(Math.random() * this.choices.length)];
    }

    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        }

        const winConditions = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
    }

    updateDisplay(playerChoice, computerChoice, result) {
        // Add loading animation
        this.playerDisplay.style.transform = 'scale(0.8)';
        this.computerDisplay.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // Update choice display with emojis
            this.playerDisplay.textContent = this.choiceEmojis[playerChoice];
            this.computerDisplay.textContent = this.choiceEmojis[computerChoice];
            
            // Animate back to normal size
            this.playerDisplay.style.transform = 'scale(1)';
            this.computerDisplay.style.transform = 'scale(1)';
            
            // Add bounce animation
            this.playerDisplay.style.animation = 'bounce 0.5s ease-in-out';
            this.computerDisplay.style.animation = 'bounce 0.5s ease-in-out';
        }, 200);

        // Update result with appropriate styling
        setTimeout(() => {
            this.resultDisplay.className = 'result-display';
            
            switch(result) {
                case 'win':
                    this.resultDisplay.textContent = '🎉 VICTORY! 🎉';
                    this.resultDisplay.classList.add('result-win');
                    this.playerScore++;
                    this.addParticleEffect('win');
                    break;
                case 'lose':
                    this.resultDisplay.textContent = '💀 DEFEAT! 💀';
                    this.resultDisplay.classList.add('result-lose');
                    this.computerScore++;
                    this.addParticleEffect('lose');
                    break;
                case 'tie':
                    this.resultDisplay.textContent = '🤝 DRAW! 🤝';
                    this.resultDisplay.classList.add('result-tie');
                    this.addParticleEffect('tie');
                    break;
            }

            // Update scores
            this.totalRounds++;
            this.updateScoreBoard();
            
            // Check for milestones
            this.checkMilestones();
        }, 400);
    }

    updateScoreBoard() {
        // Animate score changes
        this.animateScoreChange(this.playerScoreDisplay, this.playerScore);
        this.animateScoreChange(this.computerScoreDisplay, this.computerScore);
        this.animateScoreChange(this.totalRoundsDisplay, this.totalRounds);
    }

    animateScoreChange(element, newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
        }, 100);
    }

    addParticleEffect(result) {
        const colors = {
            win: ['#10b981', '#059669', '#34d399'],
            lose: ['#ef4444', '#dc2626', '#f87171'],
            tie: ['#f59e0b', '#d97706', '#fbbf24']
        };

        const particleColors = colors[result];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${particleColors[Math.floor(Math.random() * particleColors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 1;
                animation: particle-${result} 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }

    checkMilestones() {
        const total = this.playerScore + this.computerScore;
        if (total === 5) {
            this.showMilestone('5 rounds completed! 🎯');
        } else if (total === 10) {
            this.showMilestone('10 rounds completed! 🔥');
        } else if (this.playerScore === 5) {
            this.showMilestone('5 wins in a row! 🏆');
        } else if (this.computerScore === 5) {
            this.showMilestone('Computer dominated! 🤖');
        }
    }

    showMilestone(message) {
        const milestone = document.createElement('div');
        milestone.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1f1f23 0%, #2d2d32 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        `;
        milestone.textContent = message;
        document.body.appendChild(milestone);
        
        setTimeout(() => {
            milestone.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            milestone.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (milestone.parentNode) {
                    milestone.parentNode.removeChild(milestone);
                }
            }, 300);
        }, 3000);
    }

    playGame(playerChoice) {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        
        // Add button press effect
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes(playerChoice)) {
                btn.style.transform = 'translateY(-2px) scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            }
        });
        
        // Add loading state
        this.resultDisplay.textContent = 'Processing...';
        this.resultDisplay.className = 'result-display';
        
        // Simulate realistic thinking time
        const thinkingTime = Math.random() * 800 + 500; // 500-1300ms
        
        setTimeout(() => {
            const computerChoice = this.getRandomChoice();
            const result = this.determineWinner(playerChoice, computerChoice);
            
            this.updateDisplay(playerChoice, computerChoice, result);
            
            this.isPlaying = false;
        }, thinkingTime);
    }

    resetGame() {
        // Add confirmation for reset if there are scores
        if (this.totalRounds > 0) {
            const confirm = window.confirm('Are you sure you want to reset the game?');
            if (!confirm) return;
        }

        this.playerScore = 0;
        this.computerScore = 0;
        this.totalRounds = 0;
        this.isPlaying = false;
        
        // Reset display with animation
        this.playerDisplay.textContent = '-';
        this.computerDisplay.textContent = '-';
        this.resultDisplay.textContent = 'Choose your weapon!';
        this.resultDisplay.className = 'result-display';
        
        // Animate reset
        const elements = [this.playerDisplay, this.computerDisplay, this.resultDisplay];
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            el.style.transition = 'all 0.3s ease';
        });
        
        setTimeout(() => {
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            this.updateScoreBoard();
        }, 150);
    }

    handleKeyPress(event) {
        if (this.isPlaying) return;
        
        switch(event.key.toLowerCase()) {
            case 'r':
                this.playGame('rock');
                break;
            case 'p':
                this.playGame('paper');
                break;
            case 's':
                this.playGame('scissors');
                break;
            case 'escape':
                this.resetGame();
                break;
            case ' ':
                event.preventDefault();
                this.resetGame();
                break;
        }
    }
}

// Initialize the game when DOM is loaded
let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new RockPaperScissors();
    
    // Add dynamic particle styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-win {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes particle-lose {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes particle-tie {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show keyboard shortcuts tooltip
    setTimeout(() => {
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(17, 17, 17, 0.95);
            color: #e5e7eb;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 0.85rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 1000;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        `;
        tooltip.innerHTML = '⌨️ Keyboard: <strong>R</strong> = Rock, <strong>P</strong> = Paper, <strong>S</strong> = Scissors, <strong>ESC</strong> = Reset';
        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.style.opacity = '1';
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }, 4000);
        }, 1000);
    }, 2000);
});

// Global functions for HTML onclick events
function playGame(choice) {
    if (game) {
        game.playGame(choice);
    }
}

function resetGame() {
    if (game) {
        game.resetGame();
    }
}