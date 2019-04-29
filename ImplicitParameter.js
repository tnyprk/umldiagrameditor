'use strict'



function createImplicitParameter() {
  let name
  let DEFAULT_TOP_HEIGHT = 60
  let DEFAULT_WIDTH = 80
  let DEFAULT_HEIGHT = 120
  let topHeight = DEFAULT_TOP_HEIGHT
  let bounds = { x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }


  /**
    Helper function, getTopRectangle called at multiple points
    in ImplicitParameter.java
  */
  function getTopRect() {
    return  {x: bounds.x, y: bounds.y, 
             width: bounds.width, height: topHeight}
  }

  return {


    /**
      Check that point p is between the min and max x values for this 
      IplicitPrameter
      @param p the point to check.
      @returns true if the point is between the min and max x values, else false.
    */
    contains: p => {
      return p.x >= bounds.x && p.x <= bounds.x + bounds.width
    },


    /**                                                                 
      Returns the rectangle at the top of the object node.
      @return the top rectangle
   */
    getTopRectangle: () => {
      return getTopRect()
    },

    // WHAT DOES THIS DO???
    getShape: () => {
      return getTopRect()
    },

    /**
      Gets the connection point for an edge to connect to this node.
      @param d 
    */
    getConnectionPoint: d => {
      if(d.x > 0)
        return {x: bounds.x + bounds.width, 
                y: bounds.y + topHeight / 2}
      else
        return {x: bounds.x + bounds.width, 
                y: bounds.y + topHeight / 2}
    },

    /**
      Set the name of the implicit Parameter
    */
    setName: newName => {
      name = newName
    },

    /**
      Get the name of the implicit Parameter
    */
    getName: () => 
    {

      return name
    },

    clone: () => {
      let ret = createImplicitParameter()
      ret.setName(name)

      return ret
    },


    getProperties: () => {
      
    },


    translate: (dx, dy) => {
      bounds.x += dx
      bounds.y += dy
    },
    getBounds: () => {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },



    draw: panel => {
      //Draw the Top box of the implicit parameter
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      let topRect = getTopRect()
      rect.setAttribute('x', topRect.x)
      rect.setAttribute('y', topRect.y)
      rect.setAttribute('width', topRect.width)
      rect.setAttribute('height', topRect.height)
      rect.setAttribute('fill', 'white')
      rect.setAttribute('stroke', 'black')
      rect.setAttribute('stroke-width', '1')
      panel.appendChild(rect)

      // Display the text of the implicit parameter
      // Needs better formating
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.textContent = name
      text.setAttribute('x', topRect.x)
      text.setAttribute('y', topRect.y + topRect.height / 2)
      text.setAttribute('fill', '#000')
      panel.appendChild(text)

      //Draw the vertical line below the top box.
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', topRect.x + topRect.width / 2)
      line.setAttribute('x2', topRect.x + topRect.width / 2)
      line.setAttribute('y1', topRect.y + topRect.height)
      line.setAttribute('y2', topRect.y + bounds.height)
      line.setAttribute('stroke', 'black')
      line.setAttribute('stroke-width', '1')
      line.setAttribute('stroke-dasharray', '8 4')
      panel.appendChild(line)
    }







  }
}