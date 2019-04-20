

/** Class for a Circle Node in a simple graph editor
   @constructor
   @param x,     The x coordinate of the top left corner
   @param y,     The y coordinate of the top left corner
   @param size,  The size(diamter) of the Circle Node
   @param color, The the Color of circle Node (White,Black)
*/
function createCircleNode (x, y, size, color) {
  return {
    /**
      Get the boundary box of the circle node
      @returns A rectangle that bounds the circle node.
    */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },
    
    /**
      Determine if a point is inside the circle node
      @param p, a point with x and y coordinates to check. 
      @returns true if p is contained in this circle node. 
    */
    contains: p => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    
    /**
      Moves the circle node by a specific amount in the x and y direction
      @param dx, the change in the x coordinate
      @param dy, the change in the y coordinate
    */    
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    
    /**
      Draws the circle node
    */
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x + size / 2)
      circle.setAttribute('cy', y + size / 2)
      circle.setAttribute('r', size / 2)
      circle.setAttribute('fill', color)
      panel.appendChild(circle)
    },

    /**
      Creates a copy of this circlenode
      @returns a new circle node with the same size, position, color
    */
    clone: () => {
      return createCircleNode(x, y, size, color)
    },

    /** 
      Find the best point on the circle node for an edge to connect, 
      given the other end of the edge at point p.
      @param p, the point at the other end of the connecting edge.
      @returns the point on the circle node to connect the edge to.
    */
    getConnectionPoint: p => {
      let center = { x: (x + size/2), y: (y + size/2) }
      let dx = p.x - center.x
      let dy = p.y - center.y
      let dist = Math.sqrt(dx * dx, dy * dy)
      if(dist == 0) {
        return p 
      }
      else return {
        x: (center.x + dx * (size / 2) / dist),
        y: (center.y + dy * (size / 2) / dist)
      } 
    }

  }
}


