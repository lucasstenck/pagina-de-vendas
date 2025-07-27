const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const startButton = document.getElementById('startButton');
const gameOverMessage = document.getElementById('gameOverMessage');


const gridSize = 20;
let canvasSize = 500; 
let snake = [{ x: 240, y: 240 }];
let food = {};
let direction = { x: gridSize, y: 0 };
let score = 0;
let lastRenderTime = 0;
let speed = 8; 
let frameDuration = 1000 / speed; 
let gameInterval;
let gameRunning = false;


function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth - 40;
    const containerHeight = window.innerHeight * 0.7; 
    
    
    const maxSize = Math.min(containerWidth, containerHeight);
    canvasSize = Math.floor(maxSize / gridSize) * gridSize; 
    
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
   
    const centerX = Math.floor(canvasSize / 2 / gridSize) * gridSize;
    const centerY = Math.floor(canvasSize / 2 / gridSize) * gridSize;
    
    if (gameRunning) {
        
        snake = snake.map(segment => ({
            x: Math.min(segment.x, canvasSize - gridSize),
            y: Math.min(segment.y, canvasSize - gridSize)
        }));
        
        
        if (food.x >= canvasSize || food.y >= canvasSize) {
            generateFood();
        }
    } else {
       
        snake = [{ x: centerX, y: centerY }];
    }
}


function generateFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food = { x, y };
}

function drawSnake() {
    ctx.fillStyle = 'black';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'green';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        endGame();
    }

   
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    gameOverMessage.classList.remove('hidden');
    startButton.textContent = 'Restart'; 
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -gridSize };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: gridSize };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -gridSize, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: gridSize, y: 0 };
            }
            break;
    }
}

function startGame() {
    resizeCanvas(); 
    const centerX = Math.floor(canvasSize / 2 / gridSize) * gridSize;
    const centerY = Math.floor(canvasSize / 2 / gridSize) * gridSize;
    
    snake = [{ x: centerX, y: centerY }];
    direction = { x: gridSize, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    gameOverMessage.classList.add('hidden');
    startButton.textContent = 'Start';
    generateFood();
    gameRunning = true;
    if (gameInterval) {
        clearInterval(gameInterval);  
    }
    gameInterval = setInterval(updateGame, 1000 / speed);
}

startButton.addEventListener('click', function() {
    if (!gameRunning) {
        startGame();  
    } else {
        startGame(); 
    }
});


document.addEventListener('keydown', (event) => {
    if (gameRunning) {
        changeDirection(event);
    }
});


window.addEventListener("keydown", function (event) {
    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
    }
});


window.addEventListener('resize', () => {
    if (gameRunning) {
        resizeCanvas();
    }
});


window.addEventListener('load', () => {
    resizeCanvas();
    generateFood();
});
