import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");

export function setupGround() {
    setCustomProperty(groundElems[0], "--left", 0);
    // Separa ambas as imagens a uma distancia igual da largura da tela, assim vai ficar continuo a mudanca
    setCustomProperty(groundElems[1], "--left", 300);
}

export function updateGround(delta, speedScale) {
    groundElems.forEach(ground => {
        // Vai aumentar a propriedade left a cada tempo que passa
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600)
        }
    })
}