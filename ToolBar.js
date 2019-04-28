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

        if(image.getType()==="EDGE"){
            const n1 = createCircleNode(10,"white")
            const n2 = createCircleNode(10,"white")
            n1.translate(offSet * BUTTON_SIZE + 10/2, 10 / 2)
            n2.translate(offSet * 57 + 10/2, 60 / 2)
            image.connect(n1,n2)
        }else{
            let size = image.getSize()
            image.translate(offSet * BUTTON_SIZE + size/2, size / 2)
        }
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
        if(selectedTool !== undefined){
            if(selectedTool.getType() === "NODE"){
                const item = selectedTool.clone()
                var rect = panel.getBoundingClientRect();
                let size = item.getSize()
                item.translate( event.clientX - rect.left - size/2 ,event.clientY - rect.top - size/2)
                graph.add(item)
                graph.draw()
            }
            if(selectedTool.getType()==="EDGE"){
                let dragStartPoint = undefined
                let selected = undefined
                let edge = selectedTool.clone()
                panel.addEventListener('mousedown', event => {
                    let mousePoint = mouseLocation(event)
                    selected = graph.findNode(mousePoint)
                    if (selected !== undefined) {
                      dragStartPoint = mousePoint
                    }
                  })
                  panel.addEventListener('mousemove', event => {
                    if (dragStartPoint === undefined) return
                    let mousePoint = mouseLocation(event)
                    if (selected !== undefined) {
                      paintEdge(dragStartPoint,mousePoint)
                    }
                  })
                  panel.addEventListener('mouseup', event => {
                    let mousePoint = mouseLocation(event)
                    let connectedNode = graph.findNode(mousePoint)
                    if(connectedNode){
                        console.log("here")
                        if(graph.connect(dragStartPoint,mousePoint,edge)){
                            dragStartPoint = undefined
                            repaint()
                            edge = selectedTool.clone()
                        }
                    }else{
                        dragStartPoint = undefined
                        repaint()
                    }
                  })
            }
        }
    }
    panel.addEventListener('click',handleEvent,true)

    const icon = document.createElementNS('http://www.w3.org/2000/svg','svg')
    addButton(toolbar,selecter(icon))
    const nodes = graph.getNodePrototypes()
    for (let i = 0; i < nodes.length;i++){
        addButton(toolbar,nodes[i])
    }
    const edge = graph.getEdgePrototypes();
    for (let i = 0; i < edge.length;i++){
        addButton(toolbar,edge[i])
    }

    function mouseLocation(event) {
        var rect = panel.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
      }
      function repaint(){
        panel.innerHTML = ''
        graph.draw()
      }
      function paintEdge(dragStartPoint,mousePoint){
        panel.innerHTML = ''
        const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        edge.setAttribute('x1', dragStartPoint.x)
        edge.setAttribute('y1', dragStartPoint.y)
        edge.setAttribute('x2', mousePoint.x)
        edge.setAttribute('y2', mousePoint.y)
        edge.setAttribute('stroke', 'black')
        edge.setAttribute('stroke-width', 2)
        panel.appendChild(edge)
        graph.draw()
      }
}


