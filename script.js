<<<<<<< HEAD
// Script para melhorar a experiência do usuário
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos elementos
    const animatedElements = document.querySelectorAll('.content_section_1, .content_section_2, .content_sobre_o_robo, .content_results, .content_last_months');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Efeito hover melhorado para botões
    const buttons = document.querySelectorAll('.content_button_bobot_1, .content_button_months_1');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading para imagens
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });

    // Contador animado para números importantes
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString('pt-BR');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('pt-BR');
            }
        }
        
        updateCounter();
    }

    // Animar contadores quando visíveis
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const numbers = text.match(/\d+/g);
                if (numbers) {
                    const target = parseInt(numbers[0]);
                    animateCounter(element, target);
                }
                counterObserver.unobserve(element);
            }
        });
    });

    // Observar elementos com números
    const numberElements = document.querySelectorAll('.content_last_months_h1_900, .content_last_months_h1_97');
    numberElements.forEach(el => {
        counterObserver.observe(el);
    });

    // Melhorar acessibilidade
    document.addEventListener('keydown', function(e) {
        // Navegação por teclado
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Adicionar classe para navegação por teclado
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #ffda33 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);

    // Preloader simples
    window.addEventListener('load', function() {
        const preloader = document.createElement('div');
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ae63f5 0%, #8a2be2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        preloader.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="width: 50px; height: 50px; border: 3px solid #ffda33; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p>Carregando...</p>
            </div>
        `;
        
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        document.body.appendChild(preloader);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1000);
    });

    // Melhorar performance de scroll
    let ticking = false;
    function updateOnScroll() {
        // Aqui você pode adicionar efeitos de parallax ou outras animações baseadas no scroll
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Adicionar suporte para PWA (Progressive Web App)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Melhorar SEO e acessibilidade
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }

    // Adicionar suporte para modo escuro (se preferido pelo usuário)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Detectar mudanças no modo de cor
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    console.log('Script carregado com sucesso! 🚀');
});
});
=======
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
>>>>>>> 108991239d8e6a023f87067bb3ad228dadc1ae65
