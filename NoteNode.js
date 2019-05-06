'use strict'


/**
 * Class to create an NoteNode for 
 * a UML sequence diagram
 * @constructor
 *
 * @returns A new NoteNode
 */
function createNoteNode() {

  let DEFAULT_WIDTH = 60
  let DEFAULT_HEIGHT = 40;
  let DEFAULT_COLOR = 'yellow'
  let color = DEFAULT_COLOR
  let noteText

  let bounds = {x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT}

  return {
    /**
     * Draws the NoteNode
     * @param The panel to draw the NoteNode on.
     */
    draw(panel) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')    
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', bounds.x)
      rect.setAttribute('y', bounds.y)
      rect.setAttribute('width', bounds.width)
      rect.setAttribute('height', bounds.height)
      rect.setAttribute('fill', color)
      rect.setAttribute('stroke', 'black')
      rect.setAttribute('stroke-width', '1')
      
      // Display the text of the NoteNode
      // Needs better formating
      let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      text.textContent = noteText
      text.setAttribute('x', bounds.x)
      text.setAttribute('y', bounds.y + bounds.height / 2)
      text.setAttribute('fill', '#000')

      svg.appendChild(rect)
      svg.appendChild(text)
      panel.appendChild(svg)
    },

    /**
     * Gets the connection point for an edge to connect to this node.
     * @param d Indicator of the direction of the other node
     *
     * @returns A point with x & y coordinate to connect the edge to
     */
    getConnectionPoint(p) {
      let center = { x: (bounds.x + bounds.width / 2), y: (bounds.y + bounds.height / 2) }
      let dx = p.x - center.x
      let dy = p.y - center.y
      let ret = p
      if (dx === 0 && dy === 0) {
        return p
      } else if (dx < -dy && dx >= dy) {
        ret = { x: center.x, y: bounds.y }
      } else if (dx >= dy && dx >= -dy) {
        ret = { x: bounds.x + bounds.width, y: center.y }
      } else if (dx >= -dy && dx < dy) {
        ret = { x: center.x, y: bounds.y + bounds.height }
      } else if (dx < dy && dx < -dy) {
        ret = { x: bounds.x, y: center.y }
      }
      return ret
    },

    /**
     * Move the NoteNode by a specific amount 
     * in the x and y direction
     * @param dx The x amount to move the implicit parameter
     * @param dy The y amount to move the implicit parameter
     */    
    translate(dx, dy) {
      bounds.x += dx
      bounds.y += dy
    }, 

    /**
     * Get the boundary box of the NoteNode
     * @returns A rectangle that bounds the NoteNode
     */
    getBounds() {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },

    /**
     * Returns the type of this object 
     * @returns the type of this object 'NODE'
     */
    getType() {
    return 'NODE'
    },

    /**
     * Returns the color of this NodeNode
     * @returns the color of the NoteNode
     */
    getColor() {
      return color
    },

    /**
     * Sets the color of this NodeNode
     * @param c The new color for the NoteNode
     */
    setColor(c) {
      color = c
    },

    /**
     * Returns an array with the properties of this object
     * in the form [name, type, getter, setter] for each property
     * @returns An array wih the properties of this object.
     */
    getProperties() 
    {
      return ['Color', 'text', this.getColor, this.setColor,
              'noteText', 'text_box', this.getText, this.setText]
    },

    containts(p) {
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
            && (bounds.y <= p.y && p.y <= bounds.y + bounds.height)
    },

    /**
     * Creates a copy of this NoteNode
     * @returns A new NoteNode object with the same properties
     */
    clone() {
      let tmp = createNoteNode()
      tmp.setColor(color)
      tmp.setText(noteText)
      return tmp
    },
 
    /**
     * Returns the text of this note node
     * @returns The text of this note note
     */
    getText() {
      return noteText
    },

    /**
     * Sets the text of this NodeNode
     * @param t The new text of the NoteNode
     */
    setText(t) {
      noteText = t
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
     * Returns the type of this object 
     * @returns the type of this object 'NODE'
     */
    getType() {
        return "NODE"
    },

    /**
     * Returns the specific type of this object 
     * @returns the specific type of this object 'NOTENODE'
     */  
    getSpecificType() {
        return "NOTENODE"
    },

  }
}
