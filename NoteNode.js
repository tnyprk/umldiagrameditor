'use strict'

function createNoteNode() {

  let DEFAULT_WIDTH = 60
  let DEFAULT_HEIGHT = 40;
  let DEFAULT_COLOR = 'yellow'
  let color = DEFAULT_COLOR
  let noteText

  let bounds = {x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT}

  return {

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

    getConnectionPoint(p) {
      let center = { x: (x + size / 2), y: (y + size / 2) }
      let dx = p.x - center.x
      let dy = p.y - center.y
      let ret = p
      if (dx === 0 && dy === 0) {
        return p
      } else if (dx < -dy && dx >= dy) {
        ret = { x: center.x, y: y }
      } else if (dx >= dy && dx >= -dy) {
        ret = { x: x + size, y: center.y }
      } else if (dx >= -dy && dx < dy) {
        ret = { x: center.x, y: y + size }
      } else if (dx < dy && dx < -dy) {
        ret = { x: x, y: center.y }
      }
      return ret
    },

    //TO DO: figure out WHAT ON EARTH is going on in addEdge method.
    addEdge(e, p1, p2) {

    },

    translate(dx, dy) {
      bounds.x += dx
      bounds.y += dy
    },   

    getBounds() {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },

    getType() {
    return 'NODE'
    },

    getColor() {
      return color
    },

    setColor(c) {
      color = c
    },

    getProperties() 
    {
      return ['Color', 'text', this.getColor, this.setColor,
              'noteText', 'text_box', this.getText, this.setText]
    },

    containts(p) {
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
            && (bounds.y <= p.y && p.y <= bounds.y + bounds.height)
    },

    clone() {
      let tmp = createNoteNode()
      tmp.setColor(color)
      tmp.setText(noteText)
      return tmp
    },

    getText() {
      return noteText
    },

    setText(t) {
      noteText = t
    },


    contains(p) {
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
            && (bounds.y <= p.y && p.y <= bounds.y + bounds.height)
    },

    getType() {
        return "NODE"
    },

    getSpecificType() {
        return "NOTENODE"
    },

  }
}
