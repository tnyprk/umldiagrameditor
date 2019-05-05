'use strict'


function createPointNode() {

    let x = 0
    let y = 0

  return {

    draw() {},

    translate(dx, dy) {
      x += dx
      y += dy
    },
    contains(p) {
      return ( Math.abs(p.x - x) < 5 &&
               Math.abs(p.y - y) < 5    )
    },
    getBounds() {
      return { x: x, y: y, width: 0, height: 0}
    },
    getConnectionPoint(d) {
      return { x: x, y: y}
    },
    getSpecificType() {
      return 'POINTNODE'
    },

        ///dummy function
        addChild(n){
          //console.log(n)
        },

        setParent(n){
          //console.log(n)
        }


  }
}