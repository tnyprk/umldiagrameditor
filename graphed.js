"use strict";

function drawGrabber(x, y)  {
  const size = 5;
  const panel = document.getElementById("graphpanel");
  const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  square.setAttribute("x", x - size / 2);
  square.setAttribute("y", y - size / 2);
  square.setAttribute("width", size);
  square.setAttribute("height", size);
  square.setAttribute("fill", "black");
  return square
  panel.appendChild(square);
}

function Graph() {
  let nodes = [];
  let edges = [];
  return {
    /**
      Adds an edge to the graph that joins the nodes containing
      the given points. If the points aren't both inside nodes,
      then no edge is added.
      @param {Edge} edge the edge to add
      @param {Point} point1 a point in the starting node
      @param {Point} point2 a point in the ending node
   */
    connect (point1, point2,edge) {
      let n1 = this.findNode(point1);
      let n2 = this.findNode(point2);
      if (n1 !== null && n2 !== null) {
        edge.connect(n1, n2);
        edges.push(edge);
        return true;
      }
      return false;
    },
    /**
      Adds a node to the graph so that the top left corner of
      the bounding rectangle is at the given point.
      @param {Node} node the node to add
      @param {Point} point the desired location
    */
    add(node){
        nodes.push(node);
    },
    /**
      Finds a node containing the given point.
      @param {Point} point a point
      @return a node containing p or null if no nodes contain p
   */
    findNode (point){
      for (let i = nodes.length - 1; i >= 0; i--) {
         const n = nodes[i];
        if (n.contains(point)) return n;
      }
      return undefined;
    },
    /**
      Finds an edge containing the given point.
      @param {Point} point a point
      @return an edge containing p or null if no edges contain p
   */
    findEdge(point) {
      for (let i = edges.size() - 1; i >= 0; i--) {
        const e = edges.get(i);
        if (e.contains(point)) return e;
      }
      return undefined;
    },
    /**
      Draws the graph
   */
    draw() {
      const panel = document.getElementById("graphpanel");
      for (const n of nodes) {
        n.draw(panel);
      }
      for (const e of edges) {
        e.draw(panel);
      }
    },
    /**
      Removes a node and all edges that start or end with that node
      @param {Node} node the node to remove
   */
    removeNode(node) {
      for (let i = edges.length - 1; i >= 0; i--) {
        let e = edges[i];
        if (e.getStart() == node || e.getEnd() == node)
          for (let i = 0; i < edges.length; i++) {
            if (edges[i] === e) {
              edges.splice(i, 1);
            }
          }
      }
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === node) {
          nodes.splice(i, 1);
        }
      }
    },
    /**
      Removes an edge from the graph.
      @param {Edge} e the edge to remove
   */
    removeEdge(e) {
      for (let i = 0; i < edges.length; i++) {
        if (edges[i] === e) {
          edges.splice(i, 1);
        }
      }
    },
    /**
      Gets the smallest rectangle enclosing the graph
      @return the bounding rectangle
   */
    getBounds(){
      let r = null;
      for (let i = 0; i < nodes.length; i++) {
        let n = nodes[i];
        b = n.getBounds();
        if (r === null) r = b;
        else r.push(b);
      }
      for (let i = 0; i < edges.length; i++) r.push(e.getBounds());
      return r === null
        ? document.createElementNS("http://www.w3.org/2000/svg", "rect")
        : r;
    },
    /**
      Gets the nodes of this graph.
      @return an unmodifiable list of the nodes
   */
    getNodes() {
      return nodes;
    },
    /**
      Gets the edges of this graph.
      @return an unmodifiable list of the edges
   */
    getEdges(){
      return edges;
    },
    /// not working to get right x and y
    getNodePrototypes(){
      let nodeTypes = [
            createCircleNode( 25, 'black'),
            createCircleNode( 25, 'yellow'),
            createDiamondNode(25)
        ]
        return nodeTypes;
    },
    getEdgePrototypes(){
        let edgeTypes = [
          createLineEdge()
        ];
        return edgeTypes;
    }
  };
}



document.addEventListener('DOMContentLoaded', function () {
    const graph = Graph()
    // const n1 = createCircleNode(30, 30, 20, 'goldenrod')
    // const n2 = createCircleNode(50, 50, 20, 'blue')
    // graph.add(n1)
    // graph.add(n2)
    const toolBar = ToolBar(graph)
    const propertySheet = PropertySheet(graph)


    const panel = document.getElementById('graphpanel')
})
