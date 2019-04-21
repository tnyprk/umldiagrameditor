"use strict";

function drawGrabber(x, y) {
  const size = 5;
  const panel = document.getElementById("graphpanel");
  const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  square.setAttribute("x", x - size / 2);
  square.setAttribute("y", y - size / 2);
  square.setAttribute("width", size);
  square.setAttribute("height", size);
  square.setAttribute("fill", "black");
  panel.appendChild(square);
}

function graph() {
  nodes = [];
  edges = [];
  return {
    /**
      Adds an edge to the graph that joins the nodes containing
      the given points. If the points aren't both inside nodes,
      then no edge is added.
      @param {edge} e the edge to add
      @param {point} p1 a point in the starting node
      @param {point} p2 a point in the ending node
   */
    connect: (point1, edge, point2) => {
      let n1 = findNode(point1);
      let n2 = findNode(point2);
      if (n1 != null && n2 != null) {
        e.connect(n1, n2);
        edges.add(edge);
        return true;
      }
      return false;
    },
    /**
      Adds a node to the graph so that the top left corner of
      the bounding rectangle is at the given point.
      @param {node} n the node to add
      @param {point} p the desired location
    */
    add: (node, point) => {
      let bounds = node.getBounds();
      node.translate(
        point.getX() - bounds.getX(),
        point.getY() - bounds.getY()
      );
      this.nodes.push(node);
    },
    /**
      Finds a node containing the given point.
      @param {point} p a point
      @return a node containing p or null if no nodes contain p
   */
    findNode: point => {
      for (let i = this.nodes.length - 1; i >= 0; i--) {
        const n = this.nodes[i];
        if (n.contains(point)) return n;
      }
      return undefined;
    },
    /**
      Finds an edge containing the given point.
      @param {point} p a point
      @return an edge containing p or null if no edges contain p
   */
    findEdge: point => {
      for (let i = edges.size() - 1; i >= 0; i--) {
        const e = edges.get(i);
        if (e.contains(point)) return e;
      }
      return undefined;
    },
    /**
      Draws the graph
   */
    draw: () => {
      for (const n of this.nodes) {
        n.draw();
      }
      for (const e of this.edges) {
        e.draw();
      }
    }
  };
}
