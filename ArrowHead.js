'use strict'

function createArrowHead(initialStyle)
{
  let style = initialStyle
  let ARROW_SIZE = 8
  let point
  let topPoint
  let bottomPoint

  function drawArrow_V(panel) {

    let line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line1.setAttribute('x1', point.x)
    line1.setAttribute('x2', topPoint.x)
    line1.setAttribute('y1', point.y)
    line1.setAttribute('y2', topPoint.y)
    line1.setAttribute('stroke', 'black')
    line1.setAttribute('stroke-width', '2')
    
    let line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line2.setAttribute('x1', point.x)
    line2.setAttribute('x2', bottomPoint.x)
    line2.setAttribute('y1', point.y)
    line2.setAttribute('y2', bottomPoint.y)
    line2.setAttribute('stroke', 'black')
    line2.setAttribute('stroke-width', '2')

    panel.appendChild(line1)
    panel.appendChild(line2)
  }


  function drawArrow_HALF_V(panel) {

    let line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line1.setAttribute('x1', point.x)
    line1.setAttribute('x2', topPoint.x)
    line1.setAttribute('y1', point.y)
    line1.setAttribute('y2', topPoint.y)
    line1.setAttribute('stroke', 'black')
    line1.setAttribute('stroke-width', '2')
    
    panel.appendChild(line1)
  }


  return {
    getStyle() {
      return style
    },
    setStyle(s) {
      style = s
    },
    draw(panel) {
      if(style === 'NONE') 
        return
      else if(style === 'V')
        drawArrow_V(panel)
      else if(style === 'HALF_V')
        drawArrow_HALF_V(panel)

    },
    setPoints(newPoint, direction) {
      point = newPoint
      if(direction > 0) {
      topPoint = { x: point.x + ARROW_SIZE, y: point.y - ARROW_SIZE}
      bottomPoint = { x: point.x + ARROW_SIZE, y: point.y + ARROW_SIZE}
      } else {
      topPoint = { x: point.x - ARROW_SIZE, y: point.y - ARROW_SIZE}
      bottomPoint = { x: point.x - ARROW_SIZE, y: point.y + ARROW_SIZE}
      }
    },
    getProperties() {

    },

  }
}

function getArrowStyles() {
	return ['V', 'HALF_V', 'NONE']
}