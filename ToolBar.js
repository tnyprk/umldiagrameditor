'use strict'


function ToolBar(graph){
    const BUTTON_SIZE = 25;
    const OFFSET = 4;
    let buttons = []
    let group = document.getElementById("toolBar");
    const button = document.createElement("button");

    // button.appendChild(svg)
    // group.appendChild(button);
    // let grabberButton = {
    //     lt:graph.drawGrabber(1 + OFFSET, 0 + OFFSET),
    //     rt:graph.drawGrabber(1 + OFFSET, 0 + BUTTON_SIZE - OFFSET),
    //     lb:graph.drawGrabber(1 + BUTTON_SIZE - OFFSET, 0 + OFFSET),
    //     rb:graph.drawGrabber(1 + BUTTON_SIZE - OFFSET, 0 + BUTTON_SIZE - OFFSET)
    // }
    let nodes = graph.getNodePrototypes()
    for (let i = 0; i < nodes.length;i++){
        const button = document.createElement("button");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("width",20)
        svg.setAttribute("height",20)
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', 10)
        circle.setAttribute('cy', 10)
        circle.setAttribute('r', 20 / 2)
        circle.setAttribute('fill', nodes[i].getColor())
        buttons[i] = button
        svg.append(circle)
        buttons[i].append(svg)
        group.appendChild(buttons[i])
        // group.appendChild(btn)
    }
}
