import { getRandomInt } from '../utils/number.js'

class Dot {
  constructor(parentElement, type = 'div') {
    this._parentEl = parentElement
    this._type = type
    this.render()
  }
  render () {
    const size = getRandomInt(10, 100)
    this._el = document.createElement(this._type)
    this._el.className = 'dot'
    this._el.style.height = `${size}px`
    this._el.style.width = `${size}px`
    
    this._parentEl.appendChild(this._el)
  }
}

export default Dot