// Generate a random number between 1 and 100
var randomNumber = Math.floor(Math.random() * 100) + 1;

// Function to handle the guess
function makeGuess() {
    // Get the user input
    var userGuess = parseInt(document.getElementById('guess').value);
    var result = document.getElementById('result');

    // Check if the input is a number
    if (isNaN(userGuess)) {
        result.textContent = 'Please enter a valid number.';
        return;
    }

    // Compare the guess with the random number
    if (userGuess < 1 || userGuess > 100) {
        result.textContent = 'Please guess a number between 1 and 100.';
    } else if (userGuess < randomNumber) {
        result.textContent = 'Too low! Try again.';
    } else if (userGuess > randomNumber) {
        result.textContent = 'Too high! Try again.';
    } else {
        result.textContent = 'Congratulations! You guessed the number!';
    }
}
