const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const worldElem = document.querySelector('[data-world');

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale);

function update(time) {
    
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