'use strict'

function drawGrabber(x, y) {
    const size = 5;
    const panel = document.getElementById("graphpanel");
    const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("x", x - size / 2);
    square.setAttribute("y", y - size / 2);
    square.setAttribute("width", size);
    square.setAttribute("height", size);
    square.setAttribute("fill", "black");
    panel.appendChild(square);
  }

function ToolBar(graph){
    let group = [];
    let tools = [];
    const BUTTON_SIZE = 25;
    const OFFSET = 4;
    let grabberButton = {
        lt:drawGrabber(1 + OFFSET, 0 + OFFSET),
        rt:drawGrabber(1 + OFFSET, 0 + BUTTON_SIZE - OFFSET),
        lb:drawGrabber(1 + BUTTON_SIZE - OFFSET, 0 + OFFSET),
        rb:drawGrabber(1 + BUTTON_SIZE - OFFSET, 0 + BUTTON_SIZE - OFFSET)
    }
    let grabber = document.getElementById('grabberButton')
    grabber.innerHTML = `<img src='${grabberButton}'/>`

}
