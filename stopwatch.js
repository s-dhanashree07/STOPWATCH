// Variables for timer and state management
let startTime, updatedTime, elapsedTime, intervalId;
let isRunning = false;
let isPaused = false;
let lapCount = 1;

// Get DOM elements
const display = document.getElementById('display');
const lapsList = document.getElementById('laps');
const playPauseButton = document.getElementById('playPause');

// Format time as HH:MM:SS
function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Pad single digits with leading zero
function pad(value) {
    return value.toString().padStart(2, '0');
}

// Start the timer
function startTimer() {
    if (!isRunning && !isPaused) {
        startTime = new Date().getTime();
        intervalId = setInterval(updateDisplay, 100); // Update every 100 ms
        isRunning = true;
        playPauseButton.textContent = 'Pause';
    }
}

// Pause the timer
function pauseTimer() {
    if (isRunning) {
        clearInterval(intervalId);
        isPaused = true;
        isRunning = false;
        playPauseButton.textContent = 'Play';
    }
}

// Resume the timer
function resumeTimer() {
    if (isPaused) {
        startTime = new Date().getTime() - elapsedTime; // Adjust start time
        intervalId = setInterval(updateDisplay, 100); // Update every 100 ms
        isRunning = true;
        isPaused = false;
        playPauseButton.textContent = 'Pause';
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    isPaused = false;
    display.textContent = "00:00:00";
    lapsList.innerHTML = '';
    lapCount = 1;
    playPauseButton.textContent = 'Play';
}

// Record lap time
function lapTimer() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount++}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    }
}

// Clear all laps
function clearLaps() {
    lapsList.innerHTML = '';
    lapCount = 1;
}

// Update the display with the elapsed time
function updateDisplay() {
    updatedTime = new Date().getTime();
    elapsedTime = updatedTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Event listeners for buttons
playPauseButton.addEventListener('click', () => {
    if (!isRunning && !isPaused) {
        startTimer();
    } else if (isRunning) {
        pauseTimer();
    } else if (isPaused) {
        resumeTimer();
    }
});

document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
document.getElementById('clearLaps').addEventListener('click', clearLaps);
