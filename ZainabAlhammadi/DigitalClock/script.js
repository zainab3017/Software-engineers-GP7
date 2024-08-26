let is24HourFormat = true;

function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let amPm = '';

    if (!is24HourFormat) {
        amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
    }

    hours = String(hours).padStart(2, '0');
    timeElement.textContent = is24HourFormat ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds} ${amPm}`;
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    const toggleButton = document.getElementById('toggleFormat');
    toggleButton.textContent = is24HourFormat ? 'Switch to 12-Hour Format' : 'Switch to 24-Hour Format';
}

// Function to change the theme
function setTheme(theme) {
    document.body.className = `${theme}-theme`;
}

// Update the clock every second
setInterval(updateTime, 1000);

// Set default theme and time format
setTheme('light');
