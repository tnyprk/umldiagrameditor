'use strict'

function drawGrab(x, y, panel)  {
    const size = 10;
    // const panel = document.getElementById("graphpanel");
    const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("x", x - size / 2);
    square.setAttribute("y", y - size / 2);
    square.setAttribute("width", size);
    square.setAttribute("height", size);
    square.setAttribute("fill", "black");
    panel.appendChild(square);
  }

function ToolBar(graph){
    const BUTTON_SIZE = 50;
    const toolbar = document.getElementById('toolbar');

    let offSet = 1;
    function addButton(toolbar,image){
        const icon = document.createElementNS('http://www.w3.org/2000/svg','svg')
        const rect = document.createElementNS('http://www.w3.org/2000/svg','rect')
        rect.setAttribute('x',offSet * BUTTON_SIZE );
        rect.setAttribute('width',BUTTON_SIZE);
        rect.setAttribute('height',BUTTON_SIZE);
        rect.setAttribute('stroke','black');
        rect.setAttribute('fill','white');
        icon.appendChild(rect);
        icon.addEventListener('click',turnOn);
        let size = image.getSize()
        image.translate(offSet * BUTTON_SIZE + size/2, size / 2)
        image.draw(icon)
        toolbar.appendChild(icon)

        function turnOn(){
            if(rect.getAttribute('fill') === 'white'){
                rect.setAttribute('fill','red')
            }else{
                rect.setAttribute('fill','white')
            }
        }
        offSet++;
    }

    const icon = document.createElementNS('http://www.w3.org/2000/svg','svg')
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect')
    rect.setAttribute('x',0);
    rect.setAttribute('width',BUTTON_SIZE);
    rect.setAttribute('height',BUTTON_SIZE);
    rect.setAttribute('stroke','black');
    rect.setAttribute('fill','white');
    icon.appendChild(rect);
    icon.addEventListener('click',turnOn);
    toolbar.appendChild(icon)
    drawGrab(10,10,icon);
    drawGrab(BUTTON_SIZE - 10, 10,icon);
    drawGrab(10, BUTTON_SIZE - 10,icon)
    drawGrab(BUTTON_SIZE - 10,BUTTON_SIZE - 10,icon)
    function turnOn(){
        if(rect.getAttribute('fill') === 'white'){
            rect.setAttribute('fill','red')
        }else{
            rect.setAttribute('fill','white')
        }
    }

    const nodes = graph.getNodePrototypes()
    for (let i = 0; i < nodes.length;i++){
        addButton(toolbar,nodes[i])
    }



}

