'use strict'

function createHVEdge () {
  let start
  let end
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const hE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const vE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let s = { x: start.getConnectionPoint(end).x,
        y: start.getConnectionPoint(end).y }
      let e = { x: end.getConnectionPoint(start).x,
        y: end.getConnectionPoint(start).y }
      let center = { x: e.x, y: s.y }

      hE.setAttribute('x1', s.x)
      hE.setAttribute('y1', s.y)
      hE.setAttribute('x2', center.x)
      hE.setAttribute('y2', center.y)
      hE.setAttribute('stroke', 'black')
      hE.setAttribute('stroke-width', 2)

      vE.setAttribute('x1', center.x)
      vE.setAttribute('y1', center.y)
      vE.setAttribute('x2', e.x)
      vE.setAttribute('y2', e.y)
      vE.setAttribute('stroke', 'black')
      vE.setAttribute('stroke-width', 2)

      panel.appendChild(hE)
      panel.appendChild(vE)
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
