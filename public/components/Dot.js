class Dot {
  constructor(parentElement, type = 'div') {
    this._parentEl = parentElement
    this._type = type
    this.render()
  }
  render () {
    console.log('rendering dot')
    const size = Math.random()
    this._el = document.createElement(this._type)
    this._el.className = 'dot one'
    this._parentEl.appendChild(this._el)
  }
}

export default Dot