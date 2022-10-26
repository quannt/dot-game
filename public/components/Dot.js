import { getRandomInt } from '../utils/number.js'
import { animationInterval } from '../utils/animationInterval.js'

class Dot {
  constructor(parentElement, xCoordinate = 0, yCoordinate = 0, type = 'div') {
    this._parentEl = parentElement
    this._type = type
    this._xCoordinate = xCoordinate
    this._yCoordinate = yCoordinate
    this.render()
  }
  render () {
    const size = getRandomInt(10, 100)
    this._el = document.createElement(this._type)
    this._el.className = 'dot'
    this._el.style.height = `${size}px`
    this._el.style.width = `${size}px`
    this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`
    this._parentEl.appendChild(this._el)
    
    this.animate()
  }
  animate () {
    const controller = new AbortController();
    const speed = 10;
    animationInterval(60, controller.signal, time => {
      this._yCoordinate = this._yCoordinate + (speed / 60)
      this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`
    });
  }
}

export default Dot