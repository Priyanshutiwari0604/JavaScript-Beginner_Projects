// Get DOM elements
const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const ampm = document.getElementById("ampm");
const dateDisplay = document.getElementById("date");

// Days and months arrays for date formatting
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December"];

function updateClock() {
    const currentTime = new Date();
    
    // Get current time values
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    
    // Determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 becomes 12)
    
    // Add leading zeros and update display
    hrs.innerHTML = (hours < 10 ? "0" : "") + hours;
    min.innerHTML = (minutes < 10 ? "0" : "") + minutes;
    sec.innerHTML = (seconds < 10 ? "0" : "") + seconds;
    ampm.innerHTML = period;
    
    // Update date display
    const dayName = days[currentTime.getDay()];
    const monthName = months[currentTime.getMonth()];
    const date = currentTime.getDate();
    const year = currentTime.getFullYear();
    
    dateDisplay.innerHTML = `${dayName}, ${monthName} ${date}, ${year}`;
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// Add smooth loading animation
window.addEventListener('load', () => {
    document.querySelector('.container').style.animation = 'fadeInUp 0.8s ease-out';
});