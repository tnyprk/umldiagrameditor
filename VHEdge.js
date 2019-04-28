'use strict'

function createVHEdge () {
  let start
  let end

  function center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.width / 2}
  }

  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: (panel) => {
      const hE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const vE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      let middleJoint = { x: sp.x, y: ep.y }

      hE.setAttribute('x1', sp.x)
      hE.setAttribute('y1', sp.y)
      hE.setAttribute('x2', middleJoint.x)
      hE.setAttribute('y2', middleJoint.y)
      hE.setAttribute('stroke', 'black')
      hE.setAttribute('stroke-width', 2)

      vE.setAttribute('x1', middleJoint.x)
      vE.setAttribute('y1', middleJoint.y)
      vE.setAttribute('x2', ep.x)
      vE.setAttribute('y2', ep.y)
      vE.setAttribute('stroke', 'black')
      vE.setAttribute('stroke-width', 2)

      panel.appendChild(hE)
      panel.appendChild(vE)
    },
    getType: () => {
      return "EDGE"
    }

    // This likely does not work. Not yet tested.
    //    contains: p => {
    // let start = {x: start.getConnectionPoint(end).x,
    //                         y: start.getConnectionPoint(end).y}
    //            let end = {x: start.getConnectionPoint(start).x,
    //                       y: start.getConnectionPoint(start).y}
    //            let center = {x: end.x, y: start.y}
    //        return {Math.abs(p.y - start.y) < 4 && (p.x > start.x && p.x < end.x)
    //              || Math.abs(p.x - end.x) < 4 && (p.y > start.y && p.x < end.y) }
    //    }
  }
}
