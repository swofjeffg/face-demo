const source = '../test-face-1/';
const rangeX = [20, 70];
const rangeY = [10, 65];

function createFace() {
    fetch(source + 'image_data.json')
        .then((response) => response.json())
        .then((json) => {
            elementsDict = Object.entries(json['relativePos'])
            elementsDict.forEach((entry) => {
                let [key, value] = entry;
                let parent = document.getElementById('container');
                let div = document.createElement('div');
                let image = document.createElement('img');
                let chestCoords = document.querySelector('.chest').getBoundingClientRect();
                let infoBox = document.querySelector('.info-box')

                div.appendChild(image);
                div.className = 'draggable';
                div.id = entry[0];
                div.style.background = 'background: url(' + source + entry[0]
                ') no-repeat center;'
                image.src = (source + entry[0]);
                parent.appendChild(div);

                // w3schools
                function dragElement(elmnt) {
                    let pos1 = 0,
                        pos2 = 0,
                        pos3 = 0,
                        pos4 = 0;
                    if (document.getElementById(elmnt.id + "header")) {
                        // if present, the header is where you move the DIV from:
                        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                    } else {
                        // otherwise, move the DIV from anywhere inside the DIV:
                        elmnt.onmousedown = dragMouseDown;
                    }

                    function dragMouseDown(e) {
                        e = e || window.event;
                        e.preventDefault();
                        // get the mouse cursor position at startup:
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.onmouseup = closeDragElement;
                        // call a function whenever the cursor moves:
                        document.onmousemove = elementDrag;
                    }

                    function elementDrag(e) {
                        e = e || window.event;
                        e.preventDefault();
                        // calculate the new cursor position:
                        pos1 = pos3 - e.clientX;
                        pos2 = pos4 - e.clientY;
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        // set the element's new position:
                        elmnt.style.transitionDuration = "0ms";
                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                        elmnt.style.filter = "drop-shadow(0 0 0.1em)";
                    }

                    function closeDragElement() {
                        // stop moving when mouse button is released:
                        elmnt.style.transitionDuration = "125ms";
                        elmnt.style.filter = "none";
                        document.onmouseup = null;
                        document.onmousemove = null;
                        boundsCheck();
                    }
                }

                function randomPlacement(element) {
                    function getRandomInt(min, max) {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min) + min);
                    }

                    element.style.top = getRandomInt(rangeY[0], rangeY[1]) + "%";
                    element.style.left = getRandomInt(rangeX[0], rangeX[1]) + "%";
                }
                randomPlacement(div);
                dragElement(div);
            })

            function boundsCheck() {
                let chestCoords = document.querySelector('.chest').getBoundingClientRect();
                let infoBox = document.querySelector('.info-box')
                let elements = document.querySelectorAll('.draggable')
                let inRightPlace = [];

                function isInChest(element) {
                    // check whether the center of the image is within the chest
                    elmntCoords = element.getBoundingClientRect();
                    elmntCentreX = (elmntCoords.left + (elmntCoords.right / 2));
                    elmntCentreY = (elmntCoords.top + (elmntCoords.bottom / 2));
                    if (
                        elmntCentreX > chestCoords.left && elmntCentreX < chestCoords.right &&
                        elmntCentreY > chestCoords.top && elmntCentreY < chestCoords.bottom) {
                        return true;
                    }
                    return false;
                }

                function isInPlace(element, info) {
                    // check if elements are in correct spots relative to nose
                    const variability = [30, 30];
                    let relCoords = [info[1][0], info[1][1]];
                    let noseCoords = document.getElementById('nose.png').getBoundingClientRect();
                    let elementCoords = element.getBoundingClientRect();
                    let calculatedX = relCoords[0] + noseCoords.x;
                    let calculatedY = relCoords[1] + noseCoords.y;
                    if (elementCoords.x > (calculatedX - variability[0]) && elementCoords.x < (calculatedX + variability[0]) &&
                        elementCoords.y > (calculatedY - variability[1]) && elementCoords.y < (calculatedY + variability[1])) {
                        return true;
                    }
                    return false;
                }

                for (let i = 0; i < elementsDict.length; i++) {
                    let element = elements[i];
                    let elementInfo = elementsDict[i];
                    if (isInPlace(element, elementInfo)) {
                        inRightPlace[i] = true;
                    } else {
                        inRightPlace[i] = false;
                    }
                }

                if (inRightPlace.every(bool => bool)) {
                    infoBox.style.display = 'block';
                    infoBox.innerText = "omg you made the face!";
                } else {
                    infoBox.style.display = 'none';
                }

                for (let i = 0; i < elementsDict.length; i++) {
                    let element = elements[i];
                    let elementInfo = elementsDict[i];
                    if (isInChest(element)) {
                        infoBox.style.display = 'block';
                        infoBox.innerText = elementInfo[1][2];
                        break;
                    }
                }
            }
        })

}