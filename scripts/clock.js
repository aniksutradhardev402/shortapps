class AnalogClock {
    constructor() {
        this.hourHand = document.querySelector('.hour-hand');
        this.minuteHand = document.querySelector('.minute-hand');
        this.secondHand = document.querySelector('.second-hand');
        this.dateDisplay = document.getElementById('current-date');
        this.digitalTimeDisplay = document.getElementById('digital-time');
        
        // Initialize immediately
        this.updateClock();
        this.updateDate();
        
        // Update clock every second
        setInterval(() => this.updateClock(), 1000);
        
        // Update date every minute
        setInterval(() => this.updateDate(), 60000);
    }
    
    updateClock() {
        const now = new Date();
        
        // Get current time components
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Calculate rotation for each hand
        // For analog clock, we need to convert time to degrees
        // 360 degrees / 12 hours = 30 degrees per hour
        // 360 degrees / 60 minutes = 6 degrees per minute
        // 360 degrees / 60 seconds = 6 degrees per second
        
        // Hour hand: moves 30 degrees per hour plus a small increment for minutes
        const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
        
        // Minute hand: moves 6 degrees per minute plus a small increment for seconds
        const minuteDegrees = minutes * 6 + seconds * 0.1;
        
        // Second hand: moves 6 degrees per second
        const secondDegrees = seconds * 6;
        
        // Apply rotations
        this.hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        this.secondHand.style.transform = `rotate(${secondDegrees}deg)`;
        
        // Update digital time display
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        this.digitalTimeDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    
    updateDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        this.dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Initialize the clock when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const clock = new AnalogClock();
}); 