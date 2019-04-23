'use strict'


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
