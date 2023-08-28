export function getCustomProperty(elem, prop) {
    // getPropertyValue pega o valor especifico do objeto estilizado
    // getComputedStyle retorna todas as propriedade de um determinado elemento
    // parseFloat tentara converter a propriedade em float e caso nao consiga, retornara 0
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value) {
    // setProperty defini propriedades especificas no estilo inline do elemento
    elem.style.setProperty(prop, value)
}

export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}