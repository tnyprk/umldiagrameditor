function createLineEdge () {
  let start
  let end

  function center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.width / 2}
  }

  return {
    connect(s, e) {
      start = s
      end = e
    },
    clone() {
      return createLineEdge();
    },
    draw(panel) {
      const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      edge.setAttribute('x1', sp.x)
      edge.setAttribute('y1', sp.y)
      edge.setAttribute('x2', ep.x)
      edge.setAttribute('y2', ep.y)
      edge.setAttribute('stroke', 'black')
      edge.setAttribute('stroke-width', 2)
      panel.appendChild(edge)
    },
    getType() {
      return "EDGE"
    },
    getStart() {
      return start
    },
    getEnd() {
      return end
    }
  }
}
