'use strict'



function createCallEdge() {
  let start
  let end


  let lineStyle = 'solid'  // or 'dashed'
  let startArrowHead = undefined
  let endArrowHead = 'V'
  let startLabel = undefined
  let middleLabel = undefined
  let endLabel = undefined

  let signal = false
  
  return {

    //////
    // ABSTRACT EDGE METHODS
    //////
    clone() {
      return createCallEdge()
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
      let points = this.getPoints()
      if(points.length === 2) {
          let p1 = points[0]
          let p2 = points[1]
          return { x: p1.x, y: p1.y, width: Math.abs(p2.x - p1.x), height: 8} 
        }
    },

    getConnectionPoints() {
      let points = this.getPoints()
      return { startPoint: points[0], endPoint: points[points.length - 1] }
    },

    getPoints() {
      let points = []
      let s = start.getBounds()
      let e = end.getBounds()


      if(end.getSpecificType() === 'CALLNODE' &&
          start.getImplicitParameter().equals(end.getImplicitParameter()) ) {

        let p1 = { x: s.x + s.width,  y: e.y - end.getCallYGap() / 2 }
        let p2 = { x: e.x + e.width,  y: e.y }
        let p3 = { x: p1.x + e.width, y: p1.y }
        let p4 = { x: p3.x,           y: p1.y }
        points.push(p1)
        points.push(p2)
        points.push(p3)
        points.push(p4)
      }
      else {
        let direction = s.x - e.x

        let endPoint = end.getConnectionPoint(direction)

        if(s.x + s.width / 2 < endPoint.x)
          points.push( { x: s.x + s.width, y: endPoint.y } )
        else
          points.push( { x: s.x, y: endPoint.y } )
        points.push(endPoint)
      }
      return points
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

    setSignal(newValue) {
      signal = newValue
    },

    isSignal() {
      return signal
    },
    
    draw(panel) {
      const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let points = this.getPoints()
      edge.setAttribute('x1', points[0].x)
      edge.setAttribute('y1', points[0].y)
      edge.setAttribute('x2', points[1].x)
      edge.setAttribute('y2', points[0].y)
      edge.setAttribute('stroke', 'black')
      edge.setAttribute('stroke-width', 2)
      panel.appendChild(edge)
      if(points.lenght === 4) {
        const edge2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        edge2.setAttribute('x1', points[0].x)
        edge2.setAttribute('y1', points[0].y)
        edge2.setAttribute('x2', points[1].x)
        edge2.setAttribute('y2', points[0].y)
        edge2.setAttribute('stroke', 'black')
        edge2.setAttribute('stroke-width', 2)
        panel.appendChild(edge2)
      
        const edge3 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        edge3.setAttribute('x1', points[0].x)
        edge3.setAttribute('y1', points[0].y)
        edge3.setAttribute('x2', points[1].x)
        edge3.setAttribute('y2', points[0].y)
        edge3.setAttribute('stroke', 'black')
        edge3.setAttribute('stroke-width', 2)
        panel.appendChild(edge)
      }
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
      return "CALLEDGE"
    },

  }

}