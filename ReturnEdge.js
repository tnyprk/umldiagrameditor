'use strict'



function createReturnEdge() {
  let start
  let end


  let lineStyle = 'dashed'  // or 'dashed'
  let startArrowHead = undefined
  let endArrowHead = createArrowHead('V')
  let startLabel = undefined
  let middleLabel = undefined
  let endLabel = undefined

  let signal = false
  
  return {

    //////
    // ABSTRACT EDGE METHODS
    //////
    clone() {
      return createReturnEdge()
    },
    connect(s, e) {
      start = s
      end = e
    },
    getStart() {
      return start
    }, 
    getEnd() {
      return end
    }, 

    getBounds() {
      let points = this.getConnectionPoints()
      let offset = 8
      
      let p1 = points.startPoint
      let p2 = points.endPoint
      return { x: p1.x, y: p1.y - offset / 2, width: Math.abs(p2.x - p1.x), height: offset} 
      
    },

    contains(p) {
      let tmp = this.getBounds()
      return ( tmp.x <= p.x && p.x <= tmp.x + tmp.width) &&
              ( tmp.y <= p.y && p.y <= tmp.y + tmp.height ) 
    },


    getConnectionPoints() {
      let s = start.getBounds()
      let e = end.getBounds()

      let direction = s.x - e.x


      let endPoint = end.getConnectionPoint(direction)
      endPoint.y += s.height                             //Shift return edge to bottom of node
      let startPoint = undefined

      if(s.x + (s.width / 2) < endPoint.x)
        startPoint = { x: s.x + s.width, y: endPoint.y} 
      else
        startPoint = { x: s.x, y: endPoint.y} 


      if(start.getSpecificType() === 'POINTNODE') {
        endArrowHead.setPoints(startPoint, direction * -1)
        return {startPoint: endPoint, endPoint: startPoint }    // Right facing arrow for toolbar 
      }
      else {
        endArrowHead.setPoints(endPoint, direction)
        return { startPoint: startPoint, endPoint: endPoint }
      }
    },

    //////
    // SHAPE EDGE METHODS
    //////
    contains(p) {
      let bounds = this.getBounds()
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
            && (bounds.y <= p.y && p.y <= bounds.y + bounds.height)
    },

    //////
    // SEGMENTED LINE EDGE METHODS
    //////

    setLineStyle(newStyle) {
      lineStyle = newStyle      // solid or dashed
    },
    getLineStyle() {
      return lineStyle
    },
    
    setStartArrowHead(newArrowHead) {
      startArrowHead = newArrowHead
    },
    getStartArrowHead() {
      return startArrowHead
    },
    setEndArrowHead(newArrowHead) {
      endArrowHead = newArrowHead
    },
    getEndArrowHead() {
      return endArrowHead
    },
    setStartLabel(text) {
      startLabel = text
    },
    getStartLabel() {
      return startLabel
    },
    setMiddleLabel(text) {
      startLabel = text
    },
    getMiddleLabel() {
      return middleLabel
    },
    setEndLabel(text) {
      startLabel = text
    },
    getEndLabel() {
      return endLabel
    },

    
    draw(panel) {
      const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let points = this.getConnectionPoints()
      edge.setAttribute('x1', points.startPoint.x)
      edge.setAttribute('y1', points.startPoint.y)
      edge.setAttribute('x2', points.endPoint.x)
      edge.setAttribute('y2', points.endPoint.y)
      edge.setAttribute('stroke', 'black')
      edge.setAttribute('stroke-width', 2)
      if(lineStyle === 'dashed')
        edge.setAttribute('stroke-dasharray', '8 4')
      panel.appendChild(edge)
      
      endArrowHead.draw(panel)
    },



    getStart() {
      return start
    },
    
    getEnd() {
      return end
    },


    getType() {
      return "EDGE"
    },
    
    getSpecificType() {
      return "RETURNEDGE"
    },

    getProperties() {
      return []
    }
    


  }

}