'use strict'

function ToolBar(graph,toolbar){
    const BUTTON_SIZE = 40;
    const panel = document.getElementById("graphpanel");
    // const toolbar = document.getElementById('toolbar');
    let selectedTool = undefined
    let selectedIcon
    let offSet = 4;
    // add grabber button
    const button = document.createElement("button");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width",BUTTON_SIZE)
    svg.setAttribute("height",BUTTON_SIZE)
     selecter().draw(svg)
     button.appendChild(svg)
     button.addEventListener("click",function(){
        setSelected(undefined)
 })
     toolbar.appendChild(button)

    return{
        addNode(toolbar,node){
            const button = document.createElement("button");
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg.setAttribute("width",40)
            svg.setAttribute("height",40)
            let width = node.getBounds().width
            let height = node.getBounds().height
            let scaleX = (BUTTON_SIZE - offSet ) / width
            let scaleY = (BUTTON_SIZE -offSet ) / height
            let scale = Math.min(scaleX,scaleY) 
            let cor = button.getBoundingClientRect()
            node.draw(svg)
            svg.childNodes[0].setAttribute("transform",`scale(${scale},${scale}) translate(${Math.max((height - width) / 2, 0), Math.max((width - height) / 2, 0)})`);
            button.append(svg)
            button.addEventListener("click",function(){
                setSelected(node)
         })
            toolbar.appendChild(button)
        },
        addEdge(toolbar,edge){
            const button = document.createElement("button");
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg.setAttribute("width",BUTTON_SIZE)
            svg.setAttribute("height",BUTTON_SIZE)
            const n1 = createCircleNode(10,"white")
            const n2 = createCircleNode(10,"white")
            n1.translate(offSet, offSet)
            n2.translate(BUTTON_SIZE - offSet, BUTTON_SIZE - offSet)
            edge.connect(n1,n2)
            edge.draw(svg)
            button.append(svg)
            button.addEventListener("click",function(){
                setSelected(edge)
            })
            toolbar.appendChild(button)
        },
        getSelected(){
            return selectedTool
        }
    }
    function setSelected(tool){
        selectedTool = tool
    }
}


