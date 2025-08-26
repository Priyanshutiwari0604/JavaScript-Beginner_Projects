// Stopwatch class for better organization
class Stopwatch {
    constructor() {
        this.display = document.getElementById("display");
        this.startBtn = document.getElementById("start");
        this.resetBtn = document.getElementById("reset");
        this.lapBtn = document.getElementById("lap");
        this.lapTimesContainer = document.getElementById("lap-times");
        
        this.timer = null;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.lapCount = 0;
        this.lapTimes = [];
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.updateButtonStates();
    }
    
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timer = setInterval(() => this.update(), 10);
            this.isRunning = true;
            this.updateButtonStates();
            this.display.classList.add('running');
        }
    }
    
    stop() {
        if (this.isRunning) {
            clearInterval(this.timer);
            this.elapsedTime = Date.now() - this.startTime;
            this.isRunning = false;
            this.updateButtonStates();
            this.display.classList.remove('running');
        }
    }
    
    reset() {
        this.stop();
        this.startTime = 0;
        this.elapsedTime = 0;
        this.lapCount = 0;
        this.lapTimes = [];
        this.updateDisplay();
        this.updateButtonStates();
        this.clearLapTimes();
    }
    
    addLap() {
        if (this.isRunning) {
            this.lapCount++;
            const currentTime = this.formatTime(this.elapsedTime);
            const lapTime = this.lapCount === 1 ? 
                this.elapsedTime : 
                this.elapsedTime - (this.lapTimes[this.lapTimes.length - 1]?.totalTime || 0);
            
            this.lapTimes.push({
                number: this.lapCount,
                time: currentTime,
                lapDuration: this.formatTime(lapTime),
                totalTime: this.elapsedTime
            });
            
            this.displayLapTime(this.lapTimes[this.lapTimes.length - 1]);
        }
    }
    
    update() {
        const currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.display.textContent = this.formatTime(this.elapsedTime);
    }
    
    formatTime(milliseconds) {
        const totalMs = Math.abs(milliseconds);
        const hours = Math.floor(totalMs / (1000 * 60 * 60));
        const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
        const centiseconds = Math.floor((totalMs % 1000) / 10);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    }
    
    updateButtonStates() {
        if (this.isRunning) {
            this.startBtn.textContent = "Stop";
            this.startBtn.classList.add('stop');
            this.lapBtn.disabled = false;
        } else {
            this.startBtn.textContent = "Start";
            this.startBtn.classList.remove('stop');
            this.lapBtn.disabled = this.elapsedTime === 0;
        }
        
        this.resetBtn.disabled = this.elapsedTime === 0 && !this.isRunning;
    }
    
    displayLapTime(lapData) {
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-time';
        lapElement.innerHTML = `
            <span class="lap-number">Lap ${lapData.number}</span>
            <span class="lap-duration">${lapData.lapDuration}</span>
        `;
        
        // Insert at the top of the lap times container
        this.lapTimesContainer.insertBefore(lapElement, this.lapTimesContainer.firstChild);
    }
    
    clearLapTimes() {
        this.lapTimesContainer.innerHTML = '';
    }
    
    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }
}

// Initialize stopwatch when DOM is loaded
let stopwatch;

document.addEventListener('DOMContentLoaded', function() {
    stopwatch = new Stopwatch();
});

// Global functions for onclick handlers
function toggleTimer() {
    if (stopwatch) {
        stopwatch.toggle();
    }
}

function resetTimer() {
    if (stopwatch) {
        stopwatch.reset();
    }
}

function addLap() {
    if (stopwatch) {
        stopwatch.addLap();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (!stopwatch) return;
    
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            stopwatch.toggle();
            break;
        case 'KeyR':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                stopwatch.reset();
            }
            break;
        case 'KeyL':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                stopwatch.addLap();
            }
            break;
    }
});