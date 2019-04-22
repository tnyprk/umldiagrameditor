function createLineEdge () {
  let start
  let end
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      edge.setAttribute('x1', start.getConnectionPoint(end).x)
      edge.setAttribute('y1', start.getConnectionPoint(end).y)
      edge.setAttribute('x2', end.getConnectionPoint(start).x)
      edge.setAttribute('y2', end.getConnectionPoint(start).y)
      edge.setAttribute('stroke', 'black')
      edge.setAttribute('stroke-width', 2)
      panel.appendChild(edge)
    }
  }
}
