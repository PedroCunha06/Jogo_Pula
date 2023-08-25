const personagem = document.querySelector('.person');
const obstaculo = document.querySelector('.tubo_1');
const show_pontos = document.querySelector('#pontos');
let player_pontos = 0;
let inicio = null;
let loop = null;

let pontos = () => {
    player_pontos++;
    show_pontos.innerHTML = `Score: <b>${player_pontos}</b>`;
}

window.addEventListener("keydown", (start) => {
    if (start.code === "Space" && inicio === null) {
        obstaculo.style.display = 'block';
        obstaculo.style.animation = 'tubo-animation 1.3s infinite linear';

        inicio = setInterval(pontos, 400);
        loop = setInterval(verificarColisao, 10);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp" || e.code === "Space") {
        personagem.classList.add('jump');

        setTimeout(() => {
            personagem.classList.remove('jump');
        }, 600);
    }
});

function verificarColisao() {
    const tuboPosition = parseInt(getComputedStyle(obstaculo).getPropertyValue("left"));
    const personagemPosition = parseInt(getComputedStyle(personagem).getPropertyValue("bottom"));

    if ((tuboPosition <= 115 && tuboPosition > -40) && personagemPosition < 100) {
        obstaculo.style.animation = 'none';
        obstaculo.style.left = `${tuboPosition}px`;

        personagem.style.animation = 'none';
        personagem.style.bottom = `${personagemPosition}px`;

        clearInterval(inicio);
        clearInterval(loop);
        inicio = null;

        let botaoRestart;
        const reset = document.querySelector('#restart')
        botaoRestart = document.createElement('button');
        botaoRestart.textContent = 'Iniciar novo jogo';
        botaoRestart.style.fontSize = '20px';
        reset.appendChild(botaoRestart);

        botaoRestart.addEventListener('click', restartGame);
    }
}