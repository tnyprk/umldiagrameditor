'use strict'
function drawGrabber(x, y) {
    const size = 5;
    const panel = document.getElementById('graphpanel')
    const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    square.setAttribute('x', x - size / 2)
    square.setAttribute('y', y - size / 2)
    square.setAttribute('width', size)
    square.setAttribute('height', size)
    square.setAttribute('fill', 'black')
    panel.appendChild(square)  
  }

document.addEventListener('DOMContentLoaded', function () {
    const graph = Graph()
    const panel = document.getElementById('graphpanel')
    const toolbar = document.getElementById('toolbar');
    // const n1 = createCircleNode(30, 30, 20, 'goldenrod')
    // const n2 = createCircleNode(50, 50, 20, 'blue')
    // graph.add(n1)
    // graph.add(n2)
    const toolBar = ToolBar(graph)
    const nodes = graph.getNodePrototypes()
    for (let i = 0; i < nodes.length;i++){
        toolBar.addNode(toolbar,nodes[i])
    }
    const edge = graph.getEdgePrototypes();
    for (let i = 0; i < edge.length;i++){
        toolBar.addEdge(toolbar,edge[i])
    }

    let selectedTool = undefined;
    toolbar.addEventListener('click',event=>{
        selectedTool = toolBar.getSelected()
    })
    let selected = undefined
    let dragStartPoint = undefined
    let dragStartBounds = undefined

    panel.addEventListener('mousedown',event=>{
        if(selectedTool){
            if(selectedTool.getType() === "NODE"){
                console.log("NODE " + selectedTool.getType())
                const item = selectedTool.clone()
                var rect = panel.getBoundingClientRect();
                //let size = item.getSize()
                item.translate(event.clientX - rect.left ,event.clientY - rect.top)
                graph.add(item)
                repaint()
        }
        if(selectedTool.getType() === "EDGE"){
                console.log("EDGE click")
                let mousePoint = mouseLocation(event)
                selected = graph.findNode(mousePoint)
                console.log(selected.getType())
                if (selected !== undefined) {
                  dragStartPoint = mousePoint
                }
            }
        }else{
            let mousePoint = mouseLocation(event)
            selected = graph.findNode(mousePoint)
            console.log(selected)
			PropertySheet(selected)
            if (selected !== undefined) {
              dragStartPoint = mousePoint
              dragStartBounds = selected.getBounds()
            }
            repaint()
        }
    })

    panel.addEventListener('mousemove',event=>{
        if(selectedTool){
            if(selectedTool.getType() === "NODE"){
                repaint()
            }
            if(selectedTool.getType() === "EDGE"){
                if (dragStartPoint === undefined) return
                let mousePoint = mouseLocation(event)
                if (selected !== undefined) {
                  paintEdge(dragStartPoint,mousePoint)
                }
            }
        }else{
            if (dragStartPoint === undefined) return
            let mousePoint = mouseLocation(event)
        
            if (selected !== undefined) {
              const bounds = selected.getBounds();
              
              selected.translate(
                dragStartBounds.x - bounds.x 
                  + mousePoint.x - dragStartPoint.x,
                dragStartBounds.y - bounds.y 
                  + mousePoint.y - dragStartPoint.y);
              repaint()
            }
        }
    })

    panel.addEventListener("mouseup",event=>{
        if(selectedTool){
            if(selectedTool.getType() === "NODE"){
                repaint()
            }
            if(selectedTool.getType() === "EDGE"){
                let edge = selectedTool.clone()
                let mousePoint = mouseLocation(event)
                console.log("EDGE up")
                let connectedNode = graph.findNode(mousePoint)
                if(connectedNode){
                    console.log("here")
                    if(graph.connect(dragStartPoint,mousePoint,edge)){
                        dragStartPoint = undefined
                        repaintEdge()
                        edge = undefined
                    }else{
                        dragStartPoint = undefined
                        edge = undefined
                        repaintEdge()
                    }
            }
        }
        }else{
            dragStartPoint = undefined
            dragStartBounds = undefined
        }
    })


///repaintEdge functions 
function mouseLocation(event) {
    var rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
  
  function repaintEdge(){
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
  function repaint() {
    panel.innerHTML = ''
    graph.draw()
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)      
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }    
  }
////



    //const propertySheet = PropertySheet(graph)

})