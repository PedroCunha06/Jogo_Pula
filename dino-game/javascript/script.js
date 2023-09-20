import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, setDinoLose, getDinoRect } from './dino.js'
import { updateCacto, setupCacto, getCactusRects } from './cactos.js'

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.0001;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreenElem = document.querySelector('[data-start-screen]');

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
let score = 0;
// Essa funcao faz a atualizacao da movimentacao do jogo
function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    // Delta vira o tempo de repaginamento
    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateSpeedScale(delta);
    updateCacto(delta, speedScale);
    updateScore(delta);
    if (checkLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

// Essa funcao checa se houve ou nao derrota
function checkLose() {
    const dinoRect = getDinoRect();
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

// Funcao compara valores para checar se houve colisoes
function isCollision(rect1, rect2) {
    return rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
}

// Essa funcao aumenta a velocidade da tela
function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

// Essa funcao atualiza o score
function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

// Essa funcao comeca o jogo
function handleStart() {
    score = 0;
    lastTime = null;
    speedScale = 1;
    setupGround();
    setupDino();
    setupCacto();
    // Apaga texto de inicio do game
    startScreenElem.classList.add("hide");
    // Fala para o navegador que deseja fazer uma animacao e que o navegador deve fazer chamar uma funcao especifica para atualizar, antes da repaint. Usa callback.
    window.requestAnimationFrame(update);
}

// Essa funcao coloca no estado de derrota, esperando para ser reiniciado
function handleLose() {
    setDinoLose();
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElem.classList.remove("hide");
    }, 100);
}

// Essa funcao arruma a posicao da janela
function setPixelToWorldScale() {
    let worldToPixelScale;
    // innerWidht => Retorna a largura da area da janela
    // innerWHeight => Retorna a altura da area da janela
    // (window.innerWidth / window.innerHeight) Calcula a proporcao entre a largura e altura da janela
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}