document.addEventListener("DOMContentLoaded", () => {
    const guessInput = document.getElementById("guessInput");
    const submitGuess = document.getElementById("submitGuess");
    const feedback = document.getElementById("feedback");
    const attemptsDisplay = document.getElementById("attempts");

    let targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    submitGuess.addEventListener("click", () => {
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            feedback.textContent = "Please enter a number between 1 and 100.";
            feedback.style.color = "red";
        } else if (userGuess < targetNumber) {
            feedback.textContent = "Too low! Try again.";
            feedback.style.color = "orange";
        } else if (userGuess > targetNumber) {
            feedback.textContent = "Too high! Try again.";
            feedback.style.color = "orange";
        } else {
            feedback.textContent = `Congratulations! You've guessed the number in ${attempts} attempts.`;
            feedback.style.color = "green";
        }

        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        guessInput.value = '';
        guessInput.focus();
    });
});
