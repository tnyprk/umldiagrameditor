'use strict'



function createReturnEdge() {
  let start
  let end


  let lineStyle = 'dashed'  // or 'dashed'
  let startArrowHead = createArrowHead('NONE')
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
      
      let p1 = points.endPoint
      let p2 = points.startPoint
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


      //let endPoint = end.getConnectionPoint(direction)
      //endPoint.y += s.height                             //Shift return edge to bottom of node
      //let startPoint = undefined
      let startPoint = undefined
      let endPoint = undefined


      if(direction > 0) {//s.x + (s.width / 2) < endPoint.x) {
        startPoint = { x: s.x, y: s.y + s.height} 
        endPoint = { x: e.x + e.width, y: startPoint.y}
      }
      else {
        startPoint = { x: s.x, y:s.y + s.height} 
        endPoint = { x: e.x, y: startPoint.y}
      }

      if(start.getSpecificType() === 'POINTNODE') {
        endArrowHead.setPoints(startPoint, direction * -1)
        return {startPoint: endPoint, endPoint: startPoint }    // Right facing arrow for toolbar 
      }
      else {
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
      startArrowHead.setStyle(newArrowHead)
    },
    getStartArrowHead() {
      return startArrowHead.getStyle()
    },
    setEndArrowHead(newArrowHead) {
      endArrowHead.setStyle(newArrowHead)
    },
    getEndArrowHead() {
      return endArrowHead.getStyle()
    },
    setStartLabel(text) {
      startLabel = text
    },
    getStartLabel() {
      return startLabel
    },
    setMiddleLabel(text) {
      middleLabel = text
    },
    getMiddleLabel() {
      return middleLabel
    },
    setEndLabel(text) {
      endLabel = text
    },
    getEndLabel() {
      return endLabel
    },

    
    draw(panel) {
      const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      let points = this.getConnectionPoints()
      let sp = points.startPoint
      let ep = points.endPoint

      edge.setAttribute('x1', sp.x)
      edge.setAttribute('y1', sp.y)
      edge.setAttribute('x2', ep.x)
      edge.setAttribute('y2', ep.y)
      edge.setAttribute('stroke', 'black')
      edge.setAttribute('stroke-width', 2)
      if(lineStyle === 'dashed')
        edge.setAttribute('stroke-dasharray', '8 4')
      panel.appendChild(edge)
      
      startArrowHead.setPoints(sp, sp.x - ep.x)
      endArrowHead.setPoints(ep, sp.x - ep.x)
      startArrowHead.draw(panel)
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
      return ['Line Stype',       'text', this.getLineStyle,      this.setLineStyle,
              'Start Arrow Head', 'text', this.getStartArrowHead, this.setStartArrowHead,
              'End Arrow Head',   'text', this.getEndArrowHead,   this.setEndArrowHead,
              'Start Label',      'text', this.getStartLabel,     this.setStartLabel,
              'Middle Label',     'text', this.getMiddleLabel,    this.setMiddleLabel,
              'End Label',        'text', this.getEndLabel,       this.setEndLabel ]
    }
    


  }

}