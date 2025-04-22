class PomodoroTimer {
    constructor() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start-timer');
        this.resetButton = document.getElementById('reset-timer');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.modeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.setTime(parseInt(button.dataset.time));
            });
        });
    }
    
    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
            this.startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            this.startTimer();
            this.startButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    }
    
    startTimer() {
        this.isRunning = true;
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.playAlarm();
                this.pauseTimer();
                this.startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        }, 1000);
    }
    
    pauseTimer() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }
    
    resetTimer() {
        this.pauseTimer();
        this.startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        const activeMode = document.querySelector('.mode-btn.active');
        this.setTime(parseInt(activeMode.dataset.time));
    }
    
    setTime(minutes) {
        this.timeLeft = minutes * 60;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }
    
    playAlarm() {
        // You can add a sound effect here
        alert('Time is up!');
    }
}

// Initialize the timer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 