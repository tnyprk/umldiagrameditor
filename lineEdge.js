
/**
 * Class to create an edge that connects two nodes
 * @constructor
 *
 * @returns A new lineEdge object
 */
function createLineEdge () {
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

  /**
   * Given start and end points for a line, find the equation for the
   * line, and calculate f of x for the given value.
   * @param x, the value to calculate f of x for.
   * @param s, the start point of the line
   * @param e, the end point of the line.
   *
   * @returns the corresponding y value on the line, for the given x value
   */
  function lineFOfX (x, s, e) {
    let slope = (e.y - s.y) / (e.x - s.x)
    let intercept = slope * -s.x + s.y
    return slope * x + intercept
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
     * Returns a new LineEdge
     * @returns a new LineEdge object
     */
    clone() {
      return createLineEdge();
    },

    /**
     * Draws the edge
     * @param The panel to draw the edge on.
     */
    draw(panel) {
      const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point
      edge.setAttribute('x1', sp.x)
      edge.setAttribute('y1', sp.y)
      edge.setAttribute('x2', ep.x)
      edge.setAttribute('y2', ep.y)
      edge.setAttribute('stroke', 'black')
      edge.setAttribute('stroke-width', 2)
      panel.appendChild(edge)
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
      return {x: sp.x, y: sp.y, width: Math.abs(ep.x-sp.x), height: Math.abs(ep.y-sp.y)}
    },

    /**
     * Determine if a point is inside the lineEdge
     * @param p a point with x and y coordinates to check.
     *
     * @returns true if p is contained in this edge.
     */
    contains(p) {
      let sp = start.getConnectionPoint(center(end.getBounds())) // StartPoint
      let ep = end.getConnectionPoint(center(start.getBounds())) // End Point

      console.log(Math.abs(p.y - lineFOfX(p.x, sp, ep)))

      return Math.abs(p.y - lineFOfX(p.x, sp, ep)) < 5

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
      return "LINEEDGE"
    },
  }
}
