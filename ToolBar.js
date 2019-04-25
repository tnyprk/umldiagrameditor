'use strict'


function ToolBar(graph){
    const BUTTON_SIZE = 25;
    const OFFSET = 4;
    let selected;
    let group = document.getElementById("toolBar");
    const button = document.createElement("button");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width",25)
    svg.setAttribute("height",25)
        svg.append(graph.drawGrabber(0 + OFFSET, 0 + OFFSET))
        svg.append(graph.drawGrabber(0 + OFFSET, 0 + BUTTON_SIZE - OFFSET))
        svg.append(graph.drawGrabber(0 + BUTTON_SIZE - OFFSET, 0 + OFFSET))
        svg.append(graph.drawGrabber(0 + BUTTON_SIZE - OFFSET, 0 + BUTTON_SIZE - OFFSET))
    button.appendChild(svg)
    group.appendChild(button);
    let nodes = graph.getNodePrototypes()
    for (let i = 0; i < nodes.length;i++){
        const button = document.createElement("button");
        button.setAttribute('id',i)
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("width",25)
        svg.setAttribute("height",25)
        const circle = nodes[i].draw()
        //button.setAttribute("onclick",getSelectedTool);
        button.onclick =() => getSelectedTools(nodes[i]) 
        svg.append(circle)
        button.append(svg)
        group.appendChild(button)
    }
    function getSelectedTools(node){
        ToolBar.prototype.selected = node
      }
  
    
    return {
        isSelected: () =>{
            return selected;
        },
    };
}



