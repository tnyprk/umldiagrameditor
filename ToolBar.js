'use strict'



function ToolBar(graph){
    const BUTTON_SIZE = 50;
    const panel = document.getElementById("graphpanel");
    const toolbar = document.getElementById('toolbar');
    let selectedTool
    let selectedIcon
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
                if(selectedIcon !== undefined){
                    selectedIcon.childNodes[0].setAttribute('fill','white')
                }
                rect.setAttribute('fill','red')
                selectedIcon = icon
                selectedTool = image
            }else{
                rect.setAttribute('fill','white')
                selectedIcon = undefined;
                selectedTool = undefined
            }
        }
        offSet++;
    }

    function handleEvent(event){
        if(selectedIcon !== undefined){
            const item = selectedTool.clone()
            console.log(event.clientX)
            console.log(event.clientY)
            item.translate(event.clientX - 20,event.clientY - 115)
            item.draw(panel)
        }
    }
    panel.addEventListener('mousedown',handleEvent,true)

    const icon = document.createElementNS('http://www.w3.org/2000/svg','svg')
    addButton(toolbar,selecter(icon))
    const nodes = graph.getNodePrototypes()
    for (let i = 0; i < nodes.length;i++){
        addButton(toolbar,nodes[i])
    }



}

