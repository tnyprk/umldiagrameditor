'use strict'

function createCallEdge() {
  let start
  let end


  let lineStyle
  let startArrowHead
  let endArrowHead
  let startLabel
  let middleLabel
  let endLabel
  
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

    },
    getConnectionPoint() {

    },

    //////
    // SHAPE EDGE METHODS
    //////
    getBounds() {

    },
    contains() {

    },

    //////
    // SEGMENTED LINE EDGE METHODS
    //////
    setLineStyle() {},
    getLineStyle() {},
    
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
    draw() {},
    drawString() {},
    getAttachmentPoint() {},
    getStringBounds() {},
    getBounds() {},
    getShape() {},
    getSegmentPath() {},
    getConnectionPoints() {},
    getPoints() {},
    
    getType() {
      return "EDGE"
    },
    
    getSpecificType() {
      return "CALLEDGE"
    },


  }

}