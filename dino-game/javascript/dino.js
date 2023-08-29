import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js";

import {
    getCactusRects
} from "./cactos.js";

const dinoElem = document.querySelector('[data-dino]')
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 250


let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;
export function setupDino() {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect();
}

export function setDinoLose() {
    dinoElem.src = "../images/dino-death.png"
}

// Corrida do dino
function handleRun(delta, speedScale) {
    // Mudanca de imagem quando pula o dino
    if (isJumping) {
        dinoElem.src = `../images/dino-sthatic.png`
        return
    }

    // Mudancao de imagem, quando o dino corre
    if (currentFrameTime >= FRAME_TIME) {
        // Resto da equacao por dois, sempre sera 1 ou 0
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
        dinoElem.src = `../images/dino-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * speedScale;
}

// Pulo do dino
function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta;
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return;

    yVelocity = JUMP_SPEED
    isJumping = true;
}