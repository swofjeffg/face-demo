const rangeX = [20, 70];
const rangeY = [10, 65];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

elements.forEach(element => {
    element.style.top = getRandomInt(rangeY[0], rangeY[1]) + "%";
    element.style.left = getRandomInt(rangeX[0], rangeX[1]) + "%";
})