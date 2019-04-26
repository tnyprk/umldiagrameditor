'use strict'



function createImplicitParameter() {
  let name
  let DEFAULT_TOP_HEIGHT = 60
  let DEFAULT_WIDTH = 80
  let DEFAULT_HEIGHT = 120
  let topHeight = DEFAULT_TOP_HEIGHT
  let bounds = { x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }

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

    ///WHAT DOES THIS DO??
    /**                                                                 
      Returns the rectangle at the top of the object node.
      @return the top rectangle
   */
    getTopRectangle: () => {
      let rect = bounds
      rect.height = topHeight
      return  rect
    },

    // WHAT DOES THIS DO???
    getShape: () => {
      let rect = bounds
      rect.height = topHeight
      return  rect
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
      Set the name of the implicit Parameter
    */
    getName: () => {
      return name
    },

    clone: () => {
      let ret = createImplicitParameter()
      ret.setName(name)

      return ret
    },


    getProperties: () => {
      
    }













  }
}