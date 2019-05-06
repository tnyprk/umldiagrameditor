'use strict'

/**
 * Class to create an ImplicitParameter Node for 
 * a UML sequence diagram
 * @constructor
 *
 * @returns A new Implicit Parameter Node
 */
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
     * Determine if a point is contained in the ImplicitParameter
     * @param p the point to check.
     *
     * @returns true if the point is between the min and max x values, else false.
     */
    contains(p) {
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
    },

    /**                                                                 
     * Returns the rectangle at the top of the ImplicitParameter node.
     * @return the top rectangle
     */
    getTopRectangle() {
      return {x: bounds.x, y: bounds.y,
             width: bounds.width, height: topHeight}
    },

    /**
     * Gets the connection point for an edge to connect to this node.
     * @param d Indicator of the direction of the other node
     *
     * @returns A point with x & y coordinate to connect the edge to
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
     * Set the name of the implicit Parameter
     * @param newName the new name for the implicit parameter
     */
    setName(newName) {
      name = newName
    },

    /**
     * Get the name of the implicit Parameter
     * @returns the name of the implicit Parameter
     */
    getName() {
      return name
    },

    /**
     * Creates a copy of this implicit parameter
     * @returns A new ImplicitParameter object with the same properties
     */
    clone() {
      let ret = createImplicitParameter()
      ret.setName(name)

      return ret
    },

    /**
     * Returns an array with the properties of this object
     * in the form [name, type, getter, setter] for each property
     * @returns An array wih the properties of this object.
     */
    getProperties() {
      return ['Name','text', p1Getter, p1Setter]
    },

    /**
     * Move the implicit parameter by a specific amount 
     * in the x and y direction
     * @param dx The x amount to move the implicit parameter
     * @param dy The y amount to move the implicit parameter
     */
    translate(dx, dy) {
      bounds.x += dx
      for(const c of children) {
        c.translateFromParent(dx,0)
      }
    },

    /**
     * Get the boundary box of the ImplicitParameter
     * @returns A rectangle that bounds the ImplicitParameter.
     */
    getBounds() {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },

    /**
     * Update the boundary box of this ImplicitParameter
     * @param newBounds The new boundary box
     */
    updateBounds(newBounds) {
      bounds = newBounds
    },

    /**
     * Draws the ImplicitParameter
     * @param The panel to draw the ImplicitParameter on.
     */
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

      svg.appendChild(rect)
      svg.appendChild(text)
      svg.appendChild(line)
      panel.appendChild(svg)

    },

    /**
     * Return the parent of this node
     * @returns The parent of this node
     */
    getParent() {
      return parent
    },

    /**
     * Set the parent of this node
     * @param node the node that is the parent of this node
     */
    setParent(node) {
      parent = node
    },

    /**
     * Returns the children of this node
     * @returns An array with the children of this node
     */
    getChildren() {
      return children
    },

    /**
     * Add a child to this node
     * @param c the new child node
     */
    addChild(c) {
      if(c.getSpecificType() === "CALLNODE"){
        children.push(c)
        let mid = bounds.x + bounds.width / 2
        //console.log(mid)
        c.translateFromParent(mid - (c.getBounds().width/2),0)
      }
    },

    /**
     * Provides a method for this nodes parent to move
     * this node
     * @param dx The x amount to move the implicit parameter
     * @param dy The y amount to move the implicit parameter
     */
    translateFromParent(dx,dy) {
      bounds.x += dx    
      bounds.y += dy
      for(const c of children) {
        c.translateFromParent(0,dy)//dy)
      }
    },

    /**
     * Remove a node from the list of this nodes children
     * @param The node to be reomved
     */
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

    /**
     * Remove a edge from the list of this nodes children
     * @param The edge to be reomved
     */
    removeNode(e)
    {
       if (e === parent) parent = null; 
       if (e.getParent() === this){
          this.removeChild(e)
       } 
    },

    /**
     * Returns the type of this object 
     * @returns the type of this object 'NODE'
     */
    getType() {
      return 'NODE'
    },

    /**
     * Returns the specific type of this object 
     * @returns the specific type of this object 'IMPLICITPARAMETERNODE'
     */  
    getSpecificType() {
      return 'IMPLICITPARAMETERNODE'
    },
  
    /**
     * Returns an array with the properties of this object
     * in the form [name, type, getter, setter] for each property
     * @returns An array wih the properties of this object.
     */
    getProperties() {
      return ['Name', 'text', this.getName, this.setName]
    }
  }
}
