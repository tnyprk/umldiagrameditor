'use strict'


/**
 * Class to create an CallNode for 
 * a UML sequence diagram
 * @constructor
 *
 * @returns A new CallNode
 */
function createCallNode() {

  let DEFAULT_WIDTH = 16;
  let DEFAULT_HEIGHT = 30;
  let CALL_YGAP = 20;
  let bounds = {x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT}

  let implicitParameter = undefined

  var signaled = false;
  var openBottom = false;

  let children = [];
  let edges = []
  let parent = undefined;

  return {

    /**
     * Draws the CallNode
     * @param The panel to draw the CallNode on.
     */
    draw(panel) {
      this.updateSize()

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

    /**
     * Get the ImplicitParameter of this CallNode
     * @returns The ImplicitParameter of this CallNode
     */
    getImplicitParameter() {
      return implicitParameter
    },

    /**
     * Sets the ImplicitParameter of this callNode
     * @param newValue the implicit parameter node
     */
    setImplicitParameter(newValue) {
      implicitParameter = newValue
    },

    /**
     * Change the drawing style for this CallNode 
     * to be either OpenBottom or closed bottom
     * @param newValue True if the CallNode had an open bottom
     */
    setOpenBottom(newValue) {
      if(typeof newValue === "boolean")
        openBottom = newValue
    },

    /**
     * Set whether this CallNode has been signaled
     * @param newValue true or false
     */
    setSignaled(newValue) {
      if(typeof newValue === "boolean")
        signaled = newValue
    },

    /**
     * Gets the connection point for an edge to connect to this node.
     * @param d Indicator of the direction of the other node
     *
     * @returns A point with x & y coordinate to connect the edge to
     */
    getConnectionPoint(d) {
      if (d > 0) 
        return {x: bounds.x + bounds.width, y: bounds.y }
      else {
        return {x: bounds.x, y: bounds.y }
      }

    },

    /**
     * Add an edge to this CallNode
     * @param e the edge to add.
     */
    addEdge(e) {
      if(edges.length > 0 && e.getSpecificType() === 'CALLEDGE')
        e.setOffset( bounds.height - DEFAULT_HEIGHT)  
      edges.push(e)
    },

    /**
     * Add a child to this node
     * @param n the new child node
     */
    addChild(n){
      children.push(n)
      let offset = (bounds.height - DEFAULT_HEIGHT) 
      
      let dy = bounds.y - n.getBounds().y + offset
      n.setParent(this)
      n.translateFromParent(0,dy)
    },

    /**
     * Move the CallNode by a specific amount 
     * in the x and y direction
     * @param dx The x amount to move the implicit parameter
     * @param dy The y amount to move the implicit parameter
     */
    translate(dx, dy) {
      if(!parent){
        bounds.y += dy
        for(const c of children) {
          c.translateFromParent(0,dy)
        }
      }
      if(implicitParameter !== undefined) {      ////Update Height of Iplicit Parameter
        let tmp = implicitParameter.getBounds()
        tmp.height = bounds.y + bounds.height + CALL_YGAP
        implicitParameter.updateBounds(tmp)
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

      if(implicitParameter !== undefined) {                  ////Update Height of Iplicit Parameter
        let tmp = implicitParameter.getBounds()
        tmp.height = bounds.y + bounds.height + CALL_YGAP
        implicitParameter.updateBounds(tmp)
      }
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
     * Get the boundary box of the CallNode
     * @returns A rectangle that bounds the CallNode
     */
    getBounds() {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },

    /**
     * Return whether or not this CallNode has been signaled
     * @Returns True of False if this node has been signaled.
     */
    getSignaled() {
      return signaled
    },

    /**
     * Return whether or not this CallNode has an open bottom
     * @Returns True of False if this node has an open bottom
     */
    isOpenBottom() {
      return openBottom
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
     * @returns the specific type of this object 'CALLNODE'
     */  
    getSpecificType() {
      return 'CALLNODE'
    },  

    /**
     * Returns an array with the properties of this object
     * in the form [name, type, getter, setter] for each property
     * @returns An array wih the properties of this object.
     */
    getProperties() {
      return ['Open Bottom', 'text', this.isOpenBottom, this.setOpenBottom]
    },

    /**
     * Determine if a point is contained in the CallNode
     * @param p the point to check.
     *
     * @returns true if the point is between the min and max x values, else false.
     */
    contains(p) {
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
            && (bounds.y <= p.y && p.y <= bounds.y + bounds.height)
    },

    /**
     * Creates a copy of this CallNode
     * @returns A new CallNode object
     */
    clone() {
      return createCallNode()
    },

    /**
     * Updates the size of this CallNode
     * Based on positions of any child nodes
     */
    updateSize() {
      let temp = 0
      for(let child of children){
        if(child.getSpecificType() === 'CALLNODE') {
          child.updateSize()
          //console.log(child.getBounds().height)
          temp += ( child.getBounds().height + CALL_YGAP )
        }
      }
      bounds.height = DEFAULT_HEIGHT + temp
    },


  }
}
