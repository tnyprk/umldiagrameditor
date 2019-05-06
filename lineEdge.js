function createLineEdge () {
  let start
  let end

  function center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.width / 2}
  }


  function lineFOfX (x, s, e) {
    let slope = (e.y - s.y) / (e.x - s.x)
    let intercept = slope * -s.x + s.y
    return slope * x + intercept
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
    },
    getBounds() {
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      return {x: sp.x, y: sp.y, width: Math.abs(ep.x-sp.x), height: Math.abs(ep.y-sp.y)}
    },
    contains(p) {
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point

      console.log(Math.abs(p.y - lineFOfX(p.x, sp, ep)))

      return Math.abs(p.y - lineFOfX(p.x, sp, ep)) < 5


/*
     const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const panel = document.getElementById('graphpanel')
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      edge.setAttribute('x1', sp.x)
      edge.setAttribute('y1', sp.y)
      edge.setAttribute('x2', ep.x)
      edge.setAttribute('y2', ep.y)
      edge.setAttribute('stroke-width', 8)
      panel.appendChild(edge)

      let pt = panel.createSVGPoint()
      pt.x = p.x
      pt.y = p.y

      //const pt = DOMPointReadOnly.fromPoint({x: p.x, y: p.y});
      return edge.isPointInStroke(pt)
      */
    },
    getProperties() {
      return []
    }
  }
}
