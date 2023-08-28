import { updateGround, setupGround } from './ground.js'

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.0001;

const worldElem = document.querySelector('[data-world');
const scoreElem = document.querySelector('.score');

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
    updateSpeedScale(delta);
    updateScore(delta);

    lastTime = time;
    window.requestAnimationFrame(update);
}

// Essa funcao aumenta a velocidade da tela
function updateSpeedScale(delta) {
    speedScale +=  delta * SPEED_SCALE_INCREASE
}

// Essa funcao atualiza o score
function updateScore(delta) {
    score += delta * 0.01;
    scoreElem.textContext = Math.floor(score);
}

// Essa funcao comeca o jogo
function handleStart() {
    lastTime = null;
    speedScale = 1;
    setupGround();
    // Fala para o navegador que deseja fazer uma animacao e que o navegador deve fazer chamar uma funcao especifica para atualizar, antes da repaint. Usa callback.
    window.requestAnimationFrame(update);
}

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