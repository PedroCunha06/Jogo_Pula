const tom = document.querySelector('.person');
const bomba = document.querySelector('.tubo_1');

const jump = () => {
    tom.classList.add('jump');

    setTimeout(() => {
        tom.classList.remove('jump');
    }, 600);
}

const loop = setInterval(() => {

    const tuboPosition = bomba.offsetLeft;
    const tomPosition = window.getComputedStyle(tom).bottom.replace('px', '');

    console.log(tuboPosition);

    if ((tuboPosition <= 115  && tuboPosition > -40) && tomPosition < 100) {

        bomba.style.animation = 'none';
        bomba.style.left = `${tuboPosition}px`;

        tom.style.animation = 'none';
        tom.style.bottom = `${tomPosition}px`;


        clearInterval(loop);
    }

}, 10)

document.addEventListener('keydown', jump);

