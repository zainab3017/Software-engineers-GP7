// Display an instruction message as a pop-up when the game starts
alert("Use the keybord arrows keys to move the snake!");

// Select the play board, score elements, and control buttons
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

// Initialize game variables
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
// Retrieve high score from local storage or initialize it to 0
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// Function to randomly place food on the board
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Function to handle game over scenario
const handleGameOver = () => {
    clearInterval(setIntervalId); // Stop the game loop
    alert("Game Over! Press close to replay...");
    location.reload(); // Reload the game
}

// Function to change the snake's direction based on key press
const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

// Main game loop
const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    // Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
        score++; // increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Wrap snake position when it reaches the edge of the board
    if (snakeX < 1) {
        snakeX = 30;
    } else if (snakeX > 30) {
        snakeX = 1;
    }
    if (snakeY < 1) {
        snakeY = 30;
    } else if (snakeY > 30) {
        snakeY = 1;
    }
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Check if the snake hits itself
    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    // Render the snake and food on the board
    playBoard.innerHTML = html;
}

// Initialize food position and start the game loop
updateFoodPosition();
setIntervalId = setInterval(initGame, 100); // Run the game loop every 100ms
document.addEventListener("keyup", changeDirection); // Listen for key presses to change direction
