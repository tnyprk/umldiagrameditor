
/** Class for a Circle Node in a simple graph editor
   @constructor
   @param size,  The size(diamter) of the Circle Node
   @param color, The the Color of circle Node (White,Black)
*/
function createCircleNode (size, color) {
  let x = 0;
  let y = 0;
  


  // These 4 functions exist until a better method is found of 
  // passing needed functions to the property sheet.
  let p1Getter = function () {
    return size
  }
  let p1Setter = function (s) {
    size = s
  }
  let p2Getter = function () {
    return color
  }
  let p2Setter = function (c) {
    color = c
  }

  

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
    draw: (panel) => {
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
      return createCircleNode(size, color)
    },

    /**
      Find the best point on the circle node for an edge to connect,
      given the other end of the edge at point p.
      @param p, the point at the other end of the connecting edge.
      @returns the point on the circle node to connect the edge to.
    */
    getConnectionPoint: p => {
      let thisCenter = { x: x + size / 2, y: y + size / 2 }
      let dx = p.x - thisCenter.x
      let dy = p.y - thisCenter.y
      let dist = Math.sqrt(dx * dx + dy * dy)
      if (dist === 0) {
        return p
      } else {
        return {
          x: (thisCenter.x + dx * (size / 2) / dist),
          y: (thisCenter.y + dy * (size / 2) / dist)
        }
      }
    },

    /**
      Gets the size(diameter) of this circle node
      @returns the diameter of this circle node
    */
    getSize: () => {
      return size
    },

    /**
      Sets the size(diameter) of this circle node
      @param d, the new diameter of this circle node
    */
    setSize: d => {
      size = d
    },

    /**
      Gets the color of this circle node
      @returns the color of this circle node
    */
    getColor: () => {
      return color
    },

    /**
      Sets the color of this circle node
      @param d, the new color of this circle node
    */
    setColor: c => {
      color = c
    },

    getType:()=>{
      return "NODE";
    },
    

    getProperties: () => {
      let props = ['Size',  'text', p1Getter, p1Setter, 
                   'Color', 'text', p2Getter, p2Setter]
      return props
    },

    


  }
}
