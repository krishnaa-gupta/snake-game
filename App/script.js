const board = document.getElementById("gameBoard");
const ctx = board.getContext("2d");
const scoreText = document.getElementById("score");

const box = 20;
let score = 0;

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 }
];

const foodColors = [
    "#ff4d4d",
    "#ffd700",
    "#00ff88",
    "#ff66cc",
    "#ffffff",
    "#ff9900"
];

let foodColor =
    foodColors[
        Math.floor(Math.random() * foodColors.length)
    ];

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";
let gameOver = false;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    if (event.key === "ArrowLeft" && direction !== "RIGHT")
        direction = "LEFT";

    if (event.key === "ArrowUp" && direction !== "DOWN")
        direction = "UP";

    if (event.key === "ArrowRight" && direction !== "LEFT")
        direction = "RIGHT";

    if (event.key === "ArrowDown" && direction !== "UP")
        direction = "DOWN";
}

function restartGame() {

    score = 0;
    scoreText.textContent = score;

    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 }
    ];

    direction = "RIGHT";

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    foodColor =
        foodColors[
            Math.floor(
                Math.random() * foodColors.length
            )
        ];

    gameOver = false;
}

function drawGame() {

    if (gameOver) return;

    ctx.fillStyle = "#0f0f0f";
    ctx.fillRect(0, 0, 400, 400);

    snake.forEach((segment, index) => {

        if (index === 0) {
            ctx.fillStyle = "#66d9ff";
        } else {
            ctx.fillStyle = "#0088ff";
        }

        ctx.beginPath();

        ctx.roundRect(
            segment.x + 1,
            segment.y + 1,
            box - 2,
            box - 2,
            6
        );

        ctx.fill();
    });

    ctx.fillStyle = foodColor;

    ctx.beginPath();

    ctx.arc(
        food.x + box / 2,
        food.y + box / 2,
        box / 2.5,
        0,
        Math.PI * 2
    );

    ctx.fill();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (
        snakeX === food.x &&
        snakeY === food.y
    ) {

        score++;
        scoreText.textContent = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

        foodColor =
            foodColors[
                Math.floor(
                    Math.random() * foodColors.length
                )
            ];

    } else {
        snake.pop();
    }

    const newHead = {
        x: snakeX,
        y: snakeY
    };

    if (
        snakeX < 0 ||
        snakeX >= 400 ||
        snakeY < 0 ||
        snakeY >= 400
    ) {

        gameOver = true;

        setTimeout(() => {

            const playAgain = confirm(
                `🐍 GAME OVER\n\nScore: ${score}\n\nPlay Again?`
            );

            if (playAgain) {
                restartGame();
            }

        }, 100);

        return;
    }

    for (let i = 0; i < snake.length; i++) {

        if (
            snake[i].x === snakeX &&
            snake[i].y === snakeY
        ) {

            gameOver = true;

            setTimeout(() => {

                const playAgain = confirm(
                    `🐍 GAME OVER\n\nScore: ${score}\n\nPlay Again?`
                );

                if (playAgain) {
                    restartGame();
                }

            }, 100);

            return;
        }
    }

    snake.unshift(newHead);
}

setInterval(drawGame, 140);