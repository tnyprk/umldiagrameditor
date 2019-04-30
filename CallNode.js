'use strict'

function createCallNode() {

  let DEFAULT_WIDTH = 16;
  let DEFAULT_HEIGHT = 30;
  let CALL_YGAP = 20;

  let bounds = {x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT}

  let implicitParameter = undefined

  var signaled = false;
  var openBottom = false;

  return {

    draw: (panel) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', bounds.x)
      rect.setAttribute('y', bounds.y)
      rect.setAttribute('width', bounds.width)
      rect.setAttribute('height', bounds.height)
      rect.setAttribute('fill', 'white')
      rect.setAttribute('stroke', 'black')
      rect.setAttribute('stroke-width', '1')
      panel.appendChild(rect)
    },

    getImplicitParameter: () => {
      return implicitParameter
    },
    setImplicitParameter: (newValue) => {
      implicitParameter = newValue
    },

    getConnectionPoint: d => {
      if (d.x > 0) 
        return {x: bounds.x + bounds.width, y: bounds.y}
      else 
        return {x: bounds.x, y: bounds.y }
    },

    //TO DO: figure out WHAT ON EARTH is going on in addEdge method.
    addEdge: (e, p1, p2) => {

    },

    translate: (dx, dy) => {
      bounds.x += dx
      bounds.y += dy
    },

    getBounds: () => {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },

    getSignaled: () => {
      return signaled
    },

    getOpenBottm: () => {
      return openBottom
    },

    getType: () => {
      return "NODE"
    }


  }
}
