'use strict'

function createHVEdge () {
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
      return createHVEdge();
    },
    draw(panel) {
      const hE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const vE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      let middleJoint = { x: ep.x, y: sp.y }

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
    getType() {
      return "EDGE"
    },
    getBounds() {
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point

      let bndsX = sp.x <= ep.x ? sp.x : ep.x
      let bndsY = sp.y <= ep.y ? sp.y : ep.y


      return {x: bndsX, y: bndsY, width: Math.abs(ep.x-sp.x), height: Math.abs(ep.y-sp.y)}
    },
    contains(p) {
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      
      let halfX = Math.abs(ep.x - sp.x) / 2
      let midX = (ep.x + sp.x) / 2 

      let halfY = Math.abs(ep.y - sp.y) / 2
      let midY = (ep.y + sp.y) / 2

      return (Math.abs(midX - p.x) <= halfX && Math.abs(p.y - sp.y) < 4) ||
             (Math.abs(midY - p.y) <= halfY && Math.abs(p.x - ep.x) < 4)

      /*
      let middleJoint = {x: ep.x, y: sp.y}

      if(middleJoint.x > sp.x)

      let he = {x: sp.x, y: sp.y - 4, width: Math.abs(sp.x - ep.x), height: 8}
      let ve = {x: ep.x - 4, y: ep.y, width: 8, height: Math.abs(sp.y - ep.y)}


      return (he.x <= p.x && p.x <= he.x +he.width) && (he.y <= p.y && p.y <= he.y + he.height) ||
             (ve.x <= p.x && p.x <= ve.x +ve.width) && (ve.y <= p.y && p.y <= ve.y + ve.height)
      */
    },
    getProperties() {
      return []
    }
    
  }
}
