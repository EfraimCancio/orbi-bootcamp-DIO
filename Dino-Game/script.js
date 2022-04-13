const background = document.querySelector('.background');
const dino = document.querySelector('.dino');
let isJumping = false;
let position = 0;
let isGameOver = false;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let dowInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(dowInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function creatCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {       
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';    
        }
    }, 20)

    setTimeout(creatCactus, randomTime);
}

creatCactus();

document.addEventListener('keyup', handleKeyUp);