document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const enemies = document.querySelectorAll('.enemy');
    const gameArea = document.getElementById('gameArea');
    const gameAreaRect = gameArea.getBoundingClientRect();

    let playerPosition = { top: 180, left: 180 };

    function movePlayer() {
        player.style.top = `${playerPosition.top}px`;
        player.style.left = `${playerPosition.left}px`;
    }

    function detectCollision() {
        const playerRect = player.getBoundingClientRect();

        enemies.forEach(enemy => {
            const enemyRect = enemy.getBoundingClientRect();

            if (
                playerRect.left < enemyRect.right &&
                playerRect.right > enemyRect.left &&
                playerRect.top < enemyRect.bottom &&
                playerRect.bottom > enemyRect.top
            ) {
                alert("You got caught! Game Over.");
                resetGame();
            }
        });
    }

    function resetGame() {
        playerPosition = { top: 180, left: 180 };
        movePlayer();
    }

    function moveEnemy(enemy, direction) {
        let speed = 2;
        let enemyRect = enemy.getBoundingClientRect();

        if (direction === 'horizontal') {
            if (enemyRect.left <= gameAreaRect.left || enemyRect.right >= gameAreaRect.right) {
                speed = -speed;
            }
            enemy.style.left = `${enemyRect.left + speed}px`;
        } else {
            if (enemyRect.top <= gameAreaRect.top || enemyRect.bottom >= gameAreaRect.bottom) {
                speed = -speed;
            }
            enemy.style.top = `${enemyRect.top + speed}px`;
        }

        requestAnimationFrame(() => moveEnemy(enemy, direction));
    }

    moveEnemy(document.getElementById('enemy1'), 'horizontal');
    moveEnemy(document.getElementById('enemy2'), 'vertical');

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (playerPosition.top > 0) playerPosition.top -= 10;
                break;
            case 'ArrowDown':
                if (playerPosition.top < gameAreaRect.height - 30) playerPosition.top += 10;
                break;
            case 'ArrowLeft':
                if (playerPosition.left > 0) playerPosition.left -= 10;
                break;
            case 'ArrowRight':
                if (playerPosition.left < gameAreaRect.width - 30) playerPosition.left += 10;
                break;
        }
        movePlayer();
        detectCollision();
    });
});
