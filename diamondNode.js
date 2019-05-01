
/** Class for a Diamond Node in a simple graph editor
   @constructor
   @param size,  The size(diamter) of the diamondNode
*/
function createDiamondNode (size) {

  let x = 0
  let y = 0
    
  /**
    Given start and end points for a line, find the equation for the
    line, and calculate f of x for the given value.
    @param x, the value to calculate f of x for.
    @param s, the start point of the line
    @param e, the end point of the line.
    @returns the corresponding y value on the line, for the given x value
  */
  function lineFOfX (x, s, e) {
    let slope = (e.y - s.y) / (e.x - s.x)
    let intercept = slope * -s.x + s.y
    return slope * x + intercept
  }

  return {
    /**
      Get the boundary box of the diamondNode
      @returns A rectangle that bounds the diamondNode.
    */
    getBounds() {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },

    /**
      Determine if a point is inside the diamondNode
      @param p, a point with x and y coordinates to check.
      @returns true if p is contained in this diamondNode.
    */
    contains(p) {
      let top = { x: x + size / 2, y: y }
      let bottom = { x: x + size / 2, y: y + size }
      let left = { x: x, y: y + size / 2 }
      let right = { x: x + size, y: y + size / 2 }

      return (p.y > lineFOfX(p.x, left, top) &&
              p.y > lineFOfX(p.x, top, right) &&
              p.y < lineFOfX(p.x, right, bottom) &&
              p.y < lineFOfX(p.x, bottom, left))
    },

    /**
      Moves the diamondNode by a specific amount in the x and y direction
      @param dx, the change in the x coordinate
      @param dy, the change in the y coordinate
    */
    translate(dx, dy) {
      x += dx
      y += dy
    },

    /**
      Draws the diamondNode
    */
    draw(panel) {
      const dia = document.createElementNS('http://www.w3.org/2000/svg', 'polygon') 
      let center = { x: x + size / 2, y: y + size / 2 }
      let br = { x: x + size, y: y + size } // Bottom right corner
      let tmp = panel.createSVGPoint()
      tmp.x = center.x
      tmp.y = y
      dia.points.appendItem(tmp)
      tmp.x = br.x
      tmp.y = center.y
      dia.points.appendItem(tmp)
      tmp.x = center.x
      tmp.y = br.y
      dia.points.appendItem(tmp)
      tmp.x = x
      tmp.y = center.y
      dia.points.appendItem(tmp)
      tmp.x = center.x
      tmp.y = y
      dia.points.appendItem(tmp)

      dia.setAttribute('stroke', 'black')
      dia.setAttribute('fill', 'none')
      panel.appendChild(dia)
    },

    /**
      Gets the size of this diamond node
      @returns the of this diamond node
    */
    getSize() {
      return size
    },

    /**
      Sets the size of this diamond node
      @param the of this diamond node
    */
    setSize(s) {
      size = s
    },
    /**
      Creates a copy of this diamondNode
      @returns a new diamondNode with the same size and position
    */
    clone() {
      return createDiamondNode(size)
    },

    /**
      Find the best point on the diamondNode for an edge to connect,
      given the other end of the edge at point p.
      @param p, the point at the other end of the connecting edge.
      @returns the point on the diamondNode to connect the edge to.
    */
    getConnectionPoint(p) {
      let center = { x: (x + size / 2), y: (y + size / 2) }
      let dx = p.x - center.x
      let dy = p.y - center.y
      let ret = p
      if (dx === 0 && dy === 0) {
        return p
      } else if (dx < -dy && dx >= dy) {
        ret = { x: center.x, y: y }
      } else if (dx >= dy && dx >= -dy) {
        ret = { x: x + size, y: center.y }
      } else if (dx >= -dy && dx < dy) {
        ret = { x: center.x, y: y + size }
      } else if (dx < dy && dx < -dy) {
        ret = { x: x, y: center.y }
      }
      return ret
    },
    getType() {
      return "NODE";
    },

    getProperties() {
      return ['Size', 'text', this.getSize, this.setSize]
    }

  }
}
