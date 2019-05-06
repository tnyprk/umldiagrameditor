'use strict'

/**
 * Class to create an NoteEdge for 
 * a UML sequence diagram
 * @constructor
 *
 * @returns A new NoteEdge object
 */
function createNoteEdge () {
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
       * Returns a new LineEdge
       * @returns a new LineEdge object
       */
      clone() {
        return createNoteEdge();
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
        edge.setAttribute('stroke-dasharray', '8 4')
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
       * Returns the specific type of this object 
       * @returns the specific type of this object 'LINEEDGE'
       */
      getSpecificType() {
        return "NOTEEDGE"
      }
    }
  }
  