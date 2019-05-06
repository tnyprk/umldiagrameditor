'use strict'

/**
   A tool bar that contains node and edge prototype icons.
   Exactly one icon is selected at any time.
*/
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
    let s = selecter()
    s.translate(5, 5)   // To fix offset issue with grabbers in toolbar.
    s.draw(svg)
     button.appendChild(svg)
     button.addEventListener("click",function(){
    setSelected(undefined)
 })
     toolbar.appendChild(button)

    return{
    /**
      Adds a node to the tool bar.
      @param toolbar toolbar panel to attach
      @param node the node to add
   */
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
    /**
      Adds a node to the tool bar.
      @param toolbar toolbar panel to attach
      @param edge the edge to add
   */
        addEdge(toolbar,edge){
            const button = document.createElement("button");
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svg.setAttribute("width",BUTTON_SIZE)
            svg.setAttribute("height",BUTTON_SIZE)
            const n1 = createPointNode()
            const n2 = createPointNode()
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
    /**
      Gets the node or edge prototype that is associated with
      the currently selected button
      @return a Node or Edge prototype
   */
        getSelected(){
            return selectedTool
        }
    }
    function setSelected(tool){
        selectedTool = tool
    }
}


