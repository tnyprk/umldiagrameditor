'use strict'


/**
 * Class to create an edge that connects two nodes
 * The edge has a horizontal bar then a vertical bar
 * @constructor
 *
 * @returns A new HVEdge object
 */
function createHVEdge () {
  let start
  let end

  /**
   * Computes the center point of a rectangle 
   * @param rect The rectangle to find the center point of
   *
   * @return The center point of the rectangle {x, y}
   */
  function center(rect) {
    return { x: rect.x + rect.width / 2, y: rect.y + rect.width / 2}
  }

  return {
    /**
     * Sets the start and end nodes for this edge
     * @param s The new start node for this edge
     * @param s The new end node for this edge
     */
    connect(s, e) {
      start = s
      end = e
    },

    /**
     * Returns a new HVEdge
     * @returns a new HVEdge object
     */
    clone() {
      return createHVEdge();
    },

    /**
     * Draws the edge
     * @param The panel to draw the edge on.
     */
    draw(panel) {
      const hE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const vE = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      let middleJoint = { x: ep.x, y: sp.y }

      hE.setAttribute('x1', sp.x)
      hE.setAttribute('y1', sp.y)
      hE.setAttribute('x2', middleJoint.x)
      hE.setAttribute('y2', middleJoint.y)
      hE.setAttribute('stroke', 'black')
      hE.setAttribute('stroke-width', 2)

      vE.setAttribute('x1', middleJoint.x)
      vE.setAttribute('y1', middleJoint.y)
      vE.setAttribute('x2', ep.x)
      vE.setAttribute('y2', ep.y)
      vE.setAttribute('stroke', 'black')
      vE.setAttribute('stroke-width', 2)

      panel.appendChild(hE)
      panel.appendChild(vE)
    },

    /**
     * Returns the type of this object 
     * @returns the type of this object 'EDGE'
     */
    getType() {
      return "EDGE"
    },

    /**
     * Returns the start node of this edge
     * @returns The start node for this edge
     */
    getStart() {
      return start
    },

    /**
     * Returns the end node of this edge
     * @returns The end node for this edge
     */
    getEnd() {
      return end
    },

    /**
     * Get the boundary box of the Edge
     * @returns A rectangle that bounds the Edge
     */
    getBounds() {
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point

      let bndsX = sp.x <= ep.x ? sp.x : ep.x
      let bndsY = sp.y <= ep.y ? sp.y : ep.y


      return {x: bndsX, y: bndsY, width: Math.abs(ep.x-sp.x), height: Math.abs(ep.y-sp.y)}
    },

    /**
     * Determine if a point is inside the HVEdge
     * @param p a point with x and y coordinates to check.
     *
     * @returns true if p is contained in this edge.
     */
    contains(p) {
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      
      let halfX = Math.abs(ep.x - sp.x) / 2
      let midX = (ep.x + sp.x) / 2 

      let halfY = Math.abs(ep.y - sp.y) / 2
      let midY = (ep.y + sp.y) / 2

      return (Math.abs(midX - p.x) <= halfX && Math.abs(p.y - sp.y) < 4) ||
             (Math.abs(midY - p.y) <= halfY && Math.abs(p.x - ep.x) < 4)
    },

    /**
     * Returns an array with the properties of this object
     * in the form [name, type, getter, setter] for each property
     * @returns An array wih the properties of this object.
     */
    getProperties() {
      return []
    },

    /**
     * Returns the specific type of this object 
     * @returns the specific type of this object 'LINEEDGE'
     */
    getSpecificType(){
      return "HVEDGE"
    },
    
  }
}
