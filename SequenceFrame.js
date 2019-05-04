"use strict";
function drawSequenceGrabber(x, y) {
  const size = 5;
  const panel = document.getElementById("sequencepanel");
  const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  square.setAttribute("x", x - size / 2);
  square.setAttribute("y", y - size / 2);
  square.setAttribute("width", size);
  square.setAttribute("height", size);
  square.setAttribute("fill", "black");
  panel.appendChild(square);
}

document.addEventListener("DOMContentLoaded", function() {
  ////////////Start sequence diagram//////////////////////////
  const sequencegraph = sequenceGraph();
  const sequencePanel = document.getElementById("sequencepanel");
  const sequenceToolbar = document.getElementById("sequencetoolbar");
  const sequenceTool = ToolBar(sequencegraph, sequenceToolbar);

  const seqnodes = sequencegraph.getNodePrototypes();
  for (let i = 0; i < seqnodes.length; i++) {
    sequenceTool.addNode(sequenceToolbar, seqnodes[i]);
  }
  const seqedge = sequencegraph.getEdgePrototypes();
  for (let i = 0; i < seqedge.length; i++) {
    sequenceTool.addEdge(sequenceToolbar, seqedge[i]);
  }

  let selectedTool = undefined;
  sequenceToolbar.addEventListener("click", event => {
    selectedTool = sequenceTool.getSelected();
  });
  let selected = undefined;
  let dragStartPoint = undefined;
  let dragStartBounds = undefined;

  sequencePanel.addEventListener("mousedown", event => {
    if (selectedTool) {
      if (selectedTool.getType() === "NODE") {
        console.log("NODE " + selectedTool.getType());
        const item = selectedTool.clone();
        let mousePoint = mouseLocation(event);
        var rect = sequencePanel.getBoundingClientRect();
        //let size = item.getSize()
        item.translate(event.clientX - rect.left, event.clientY - rect.top);
        sequencegraph.add(item, mousePoint);
        repaint();
      }
      if (selectedTool.getType() === "EDGE") {
        let mousePoint = mouseLocation(event);
        selected = sequencegraph.findNode(mousePoint);
        console.log(selected.getType());
        if (selected !== undefined) {
          dragStartPoint = mousePoint;
        }
      }
    } else {
      let mousePoint = mouseLocation(event);
      selected = sequencegraph.findNode(mousePoint);
      if( selected === undefined)
        selected = sequencegraph.findEdge(mousePoint)
      PropertySheet(selected);
      if (selected !== undefined) {
        dragStartPoint = mousePoint;
        dragStartBounds = selected.getBounds();
      }
      repaint();
    }
  });

  sequencePanel.addEventListener("mousemove", event => {
    if (selectedTool) {
      if (selectedTool.getType() === "NODE") {
        repaint();
      }
      if (selectedTool.getType() === "EDGE") {
        if (dragStartPoint === undefined) return;
        let mousePoint = mouseLocation(event);
        if (selected !== undefined) {
          paintEdge(dragStartPoint, mousePoint);
        }
      }
    } else {
      if (dragStartPoint === undefined) return;
      let mousePoint = mouseLocation(event);
      if(selected.getType() === 'NODE')
      {
        if (selected !== undefined) {
          const bounds = selected.getBounds();

          selected.translate(
            dragStartBounds.x - bounds.x + mousePoint.x - dragStartPoint.x,
            dragStartBounds.y - bounds.y + mousePoint.y - dragStartPoint.y
          );
          repaint();
        }
      }
    }
  });

  sequencePanel.addEventListener("mouseup", event => {
    if (selectedTool) {
      if (selectedTool.getType() === "NODE") {
        repaint();
      }
      if (selectedTool.getType() === "EDGE") {
        let edge = selectedTool.clone();
        let mousePoint = mouseLocation(event);
        let connectedNode = sequencegraph.findNode(mousePoint);
        if (connectedNode) {
          if (sequencegraph.connect(dragStartPoint, mousePoint, edge)) {
            dragStartPoint = undefined;
            repaint();
            edge = undefined;
          } else {
            dragStartPoint = undefined;
            edge = undefined;
            repaint();
          }
        }
      }
    } else {
      dragStartPoint = undefined;
      dragStartBounds = undefined;
    }
  });

  /////DELETE
  document.addEventListener('keydown', (event) => {
    if(selected !== undefined){
      if(event.key === 'Delete'){
        if(selected.getType() === 'NODE'){
          sequencegraph.removeNode(selected)
        }
        if(selected.getType() === 'EDGE'){
          sequencegraph.removeEdge(selected)
        }
      }
      repaint()
    }
  },false)
/////////END DELETE

sequencePanel.addEventListener("repaint",event=>{
  repaint()
})


  ///repaint functions
  function mouseLocation(event) {
    var rect = sequencePanel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  // function repaint() {
  //   sequencePanel.innerHTML = "";
  //   sequencegraph.draw();
  // }

  function paintEdge(dragStartPoint, mousePoint) {
    sequencePanel.innerHTML = "";
    const edge = document.createElementNS("http://www.w3.org/2000/svg", "line");
    edge.setAttribute("x1", dragStartPoint.x);
    edge.setAttribute("y1", dragStartPoint.y);
    edge.setAttribute("x2", mousePoint.x);
    edge.setAttribute("y2", mousePoint.y);
    edge.setAttribute("stroke", "black");
    edge.setAttribute("stroke-width", 2);
    sequencePanel.appendChild(edge);
    sequencegraph.draw();
  }
  function repaint() {
    sequencePanel.innerHTML = "";
    sequencegraph.draw();
    if (selected !== undefined) {
      const bounds = selected.getBounds();
      drawSequenceGrabber(bounds.x, bounds.y);
      drawSequenceGrabber(bounds.x + bounds.width, bounds.y);
      drawSequenceGrabber(bounds.x, bounds.y + bounds.height);
      drawSequenceGrabber(bounds.x + bounds.width, bounds.y + bounds.height);
    }
  }
  ////END repaint //////////////////////

  ///////////////End sequence diagram////////////////////////
});
