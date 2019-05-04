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

    draw(panel) {
      if(openBottom){

      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') 
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

      if(typeof implicitParameter !== 'undefined'){
        rect.setAttribute('x', implicitParameter.getBounds().x + implicitParameter.getBounds().width / 2 - bounds.width / 2)
      } else {
        rect.setAttribute('x', bounds.x)
      }

      rect.setAttribute('y', bounds.y)
      rect.setAttribute('width', bounds.width)
      rect.setAttribute('height', bounds.height)
      rect.setAttribute('fill', 'white')
      rect.setAttribute('stroke', 'black')
      rect.setAttribute('stroke-width', '1')
      svg.appendChild(rect)
      panel.appendChild(svg)

    },

    getImplicitParameter() {
      return implicitParameter
    },

    /**
     * Sets the implicit parameter of this callNode
     * @param newValue the implicit parameter node
     */
    setImplicitParameter(newValue) {
      implicitParameter = newValue
    },

    setOpenBotton(newValue) {
      if(typeof newValue === "boolean")
        openBottom = newValue
    },

    setSignaled(newValue) {
      if(typeof newValue === "boolean")
        signaled = newValue
    },

    getConnectionPoint(d) {
      if (d > 0) 
        return {x: bounds.x + bounds.width/2, y: bounds.y}
      else 
        return {x: bounds.x - bounds.width/2, y: bounds.y }
    },

    //TO DO: figure out WHAT ON EARTH is going on in addEdge method.
    addEdge(e, p1, p2) {

    },

    translate(dx, dy) {
      //bounds.x += dx
      bounds.y += dy
    },

    translateFromParent(dx) {
      bounds.x += dx      
    },

    getBounds() {
      return {x: bounds.x - bounds.width/2, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },

    getSignaled() {
      return signaled
    },

    isOpenBottm() {
      return openBottom
    },

    getType() {
    return 'NODE'
    },

    getSpecificType() {
      return 'CALLNODE'
    },  

    getProperties() 
    {
      return []
    },

    contains(p) {
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
            && (bounds.y <= p.y && p.y <= bounds.y + bounds.height)
    },


    clone() {
      return createCallNode()
    }
  }
}
