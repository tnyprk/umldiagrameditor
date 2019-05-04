'use strict'


function createImplicitParameter() {
  let name = 'Hello, World!'
  let DEFAULT_TOP_HEIGHT = 60
  let DEFAULT_WIDTH = 80
  let DEFAULT_HEIGHT = 120
  let topHeight = DEFAULT_TOP_HEIGHT
  let bounds = { x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }
  let specificType = 'IMPLICITPARAMETERNODE'


  let children = []
  let parent = undefined


  return {
    /**
      Check that point p is between the min and max x values for this 
      IplicitPrameter
      @param p the point to check.
      @returns true if the point is between the min and max x values, else false.
    */
    contains(p) {
      return ((bounds.x <= p.x && p.x <= bounds.x + bounds.width)
      && (bounds.y <= p.y && p.y <= bounds.y + bounds.height))
    },


    /**                                                                 
      Returns the rectangle at the top of the object node.
      @return the top rectangle
   */
    getTopRectangle() {
      return {x: bounds.x, y: bounds.y,
             width: bounds.width, height: topHeight}
    },

    // WHAT DOES THIS DO???
    getShape() {
      return this.getTopRectangle()
    },

    /**
      Gets the connection point for an edge to connect to this node.
      @param d 
    */
    getConnectionPoint(d) {
      if(d > 0)
        return {x: bounds.x + bounds.width, 
                y: bounds.y + topHeight / 2}
      else
        return {x: bounds.x, 
                y: bounds.y + topHeight / 2}
    },

    /**
      Set the name of the implicit Parameter
    */
    setName(newName) {
      name = newName
    },

    /**
      Get the name of the implicit Parameter
    */
    getName() {
      return name
    },


    clone() {
      let ret = createImplicitParameter()
      ret.setName(name)

      return ret
    },


    getProperties() {
      return ['Name','text', p1Getter, p1Setter]
    },


    translate(dx, dy) {
      
      bounds.x += dx
      //bounds.y += dy
      for(const c of children) {
        c.translateFromParent(dx)//dy)

      }
    },

    getBounds() {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },



    draw(panel) {
      //Draw the Top box of the implicit parameter
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')       
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      let topRect = this.getTopRectangle()
      rect.setAttribute('x', topRect.x)
      rect.setAttribute('y', topRect.y)
      rect.setAttribute('width', topRect.width)
      rect.setAttribute('height', topRect.height)
      rect.setAttribute('fill', 'white')
      rect.setAttribute('stroke', 'black')
      rect.setAttribute('stroke-width', '1')

      // Display the text of the implicit parameter
      // Needs better formating
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.textContent = name
      text.setAttribute('x', topRect.x)
      text.setAttribute('y', topRect.y + topRect.height / 2)
      text.setAttribute('fill', '#000')
      

      //Draw the vertical line below the top box.
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', topRect.x + topRect.width / 2)
      line.setAttribute('x2', topRect.x + topRect.width / 2)
      line.setAttribute('y1', topRect.y + topRect.height)
      line.setAttribute('y2', topRect.y + bounds.height)
      line.setAttribute('stroke', 'black')
      line.setAttribute('stroke-width', '1')
      line.setAttribute('stroke-dasharray', '8 4')
      
      if(children.length > 0){
        for(let i = 0; i< children.length;i++){
          children[i].draw(panel)
        }
      }

      svg.appendChild(rect)
      svg.appendChild(text)
      svg.appendChild(line)
      panel.appendChild(svg)

    },

    getParent() {
      return parent
    },

    setParent(node) {
      parent = node
    },

    getChildren() {
      return children
    },

    addChild(c) {
      children.push(c)
      let mid = bounds.x + bounds.width / 2
      console.log(mid)
      c.translateFromParent(mid - (c.getBounds().width/2))
    },

    removeChild(node)
    {
      for(i = 0; i < children.length; i++){
        if(children[i] == node)
        {
          children.splice(i, 1)
        }
      }
      node.setParent
    },

    getType() {
      return 'NODE'
      },
  
    getSpecificType() {
      return 'IMPLICITPARAMETERNODE'
    },
  

    getProperties() {
      return ['Name', 'text', this.getName, this.setName]
    }



  }
}
