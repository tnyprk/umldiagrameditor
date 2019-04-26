'use strict'

function PropertySheet(graph) {
  const sheet = document.getElementById('propertysheet')
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  const textsize = 15;
  text.setAttribute('x', 5)
  text.setAttribute('y', textsize)
  text.setAttribute('font-size', textsize)
  text.innerHTML = 'Testing test test'
  sheet.appendChild(text)
  
}
