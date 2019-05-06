'use strict'

function createCallNode() {

  let DEFAULT_WIDTH = 16;
  let DEFAULT_HEIGHT = 30;
  let CALL_YGAP = 20;
  let bounds = {x: 0, y: 0, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT}

  let implicitParameter = undefined

  var signaled = false;
  var openBottom = false;

  let children = [];
  let edges = []
  let parent = undefined;



  return {

    draw(panel) {

      this.updateSize()

      if(openBottom){

      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') 
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

      if(typeof implicitParameter !== 'undefined'){
        rect.setAttribute('x', implicitParameter.getBounds().x + implicitParameter.getBounds().width / 2 - bounds.width / 2)
      } else {
        rect.setAttribute('x', bounds.x)
      }

      rect.setAttribute('y', bounds.y)
      rect.setAttribute('width', bounds.width)
      rect.setAttribute('height', bounds.height)
      rect.setAttribute('fill', 'white')
      rect.setAttribute('stroke', 'black')
      rect.setAttribute('stroke-width', '1')
      svg.appendChild(rect)
      panel.appendChild(svg)

    },

    getImplicitParameter() {
      return implicitParameter
    },

    /**
     * Sets the implicit parameter of this callNode
     * @param newValue the implicit parameter node
     */
    setImplicitParameter(newValue) {
      implicitParameter = newValue
    },

    setOpenBottom(newValue) {
      if(typeof newValue === "boolean")
        openBottom = newValue
    },

    setSignaled(newValue) {
      if(typeof newValue === "boolean")
        signaled = newValue
    },

    getConnectionPoint(d) {
      //let offset = (DEFAULT_HEIGHT + CALL_YGAP) * (children.length- 1)
      //console.log("Get Connection point")
      //console.log(children.length)
      if (d > 0) 
        return {x: bounds.x + bounds.width, y: bounds.y }// + offset}
      else {
        return {x: bounds.x, y: bounds.y }// + offset}
      }

    },

    //TO DO: figure out WHAT ON EARTH is going on in addEdge method.
    addEdge(e) {
      /*
      if(e.getSpecificType() === 'CALLEDGE') {
        let tmp = 0
        for(let anEdge of edges) {
          if(anEdge.getSpecificType() === 'CALLEDGE')
            tmp += 1
        }
        e.setOffset((DEFAULT_HEIGHT + CALL_YGAP) * (tmp))
      } 
      */
      if(edges.length > 0 && e.getSpecificType() === 'CALLEDGE')
        e.setOffset( bounds.height - DEFAULT_HEIGHT)                 ///// TEMP TEMP TEMP
      edges.push(e)
    },

    addChild(n){
      children.push(n)
      //console.log("Add Child")
      //console.log(children.length)
      let offset = (bounds.height - DEFAULT_HEIGHT) //(DEFAULT_HEIGHT + CALL_YGAP) * (children.length- 1)
      
      let dy = bounds.y - n.getBounds().y + offset
      n.setParent(this)
      n.translateFromParent(0,dy)
      //updateSize()

      //bounds.height += (DEFAULT_HEIGHT + CALL_YGAP)
    },


    translate(dx, dy) {
      //bounds.x += dx
      if(!parent){
        bounds.y += dy
        for(const c of children) {
          c.translateFromParent(0,dy)//dy)
        }
      }
      if(implicitParameter !== undefined) {                   ////Update Height of Iplicit Parameter
        let tmp = implicitParameter.getBounds()
        tmp.height = bounds.y + bounds.height + CALL_YGAP
        implicitParameter.updateBounds(tmp)
      }
    },

    translateFromParent(dx,dy) {
      bounds.x += dx    
      bounds.y += dy
      for(const c of children) {
        c.translateFromParent(0,dy)//dy)
      }

      if(implicitParameter !== undefined) {                  ////Update Height of Iplicit Parameter
        let tmp = implicitParameter.getBounds()
        tmp.height = bounds.y + bounds.height + CALL_YGAP
        implicitParameter.updateBounds(tmp)
      }
    },

    getParent() {
      return parent
    },

    setParent(node) {
      parent = node
    },

    getChildren() {
      return children
    },

    getBounds() {
      return {x: bounds.x, y: bounds.y, 
              width: bounds.width, height: bounds.height}
    },

    getSignaled() {
      return signaled
    },

    isOpenBottom() {
      return openBottom
    },

    getType() {
    return 'NODE'
    },

    getSpecificType() {
      return 'CALLNODE'
    },  

    getProperties() 
    {
      return ['Open Bottom', 'text', this.isOpenBottom, this.setOpenBottom]
    },

    contains(p) {
      return (bounds.x <= p.x && p.x <= bounds.x + bounds.width)
            && (bounds.y <= p.y && p.y <= bounds.y + bounds.height)
    },


    clone() {
      return createCallNode()
    },

    updateSize() {
      let temp = 0
      for(let child of children){
        if(child.getSpecificType() === 'CALLNODE') {
          child.updateSize()
          console.log(child.getBounds().height)
          temp += ( child.getBounds().height + CALL_YGAP )
        }
      }
      bounds.height = DEFAULT_HEIGHT + temp
    },


  }
}
