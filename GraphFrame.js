
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
    panel.addEventListener("click",event=>{
        if(selectedTool){
            if(selectedTool.getType()==="NODE"){
                const item = selectedTool.clone()
                var rect = panel.getBoundingClientRect();
                let size = item.getSize()
                item.translate( event.clientX - rect.left - size/2 ,event.clientY - rect.top - size/2)
                graph.add(item)
                graph.draw()
            }
            if(selectedTool.getType() === "EDGE"){
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
        }else{
            console.log("notthing")
        }
    })

    ///repaint functions 
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
    ////

    const propertySheet = PropertySheet(graph)

})