const source = '../test-face-1/';
const rangeX = [20, 70];
const rangeY = [10, 65];

function createFace() {
    fetch(source + 'image_data.json')
        .then((response) => response.json())
        .then((json) => {
            Object.entries(json['relativePos']).forEach((entry) => {
                const [key, value] = entry;
                const parent = document.getElementById('container');
                const div = document.createElement('div');
                const image = document.createElement('img');

                div.appendChild(image);
                div.className = 'draggable';
                div.style.background = 'background: url(' + source + entry[0]
                ') no-repeat center;'
                image.src = (source + entry[0]);
                parent.appendChild(div);

                // w3schools
                function dragElement(elmnt) {
                    var pos1 = 0,
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
        })
}