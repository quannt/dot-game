class Dot {
  constructor(element) {
    this._el = element
    this._status = GameStatus.Idle
    this._speed = 0
    this._scoreBoardEl = document.querySelector('#score')
    this._startButtonEl = document.querySelector('#start-button')
    this._speedLabel = document.querySelector('#speed-label')
    this._speedInput = document.querySelector('#speed-input')
    this._startButton = document.querySelector('#start-button')
    this.handleStartButtonClick.bind(this)
  }
  render () {
    this.hydrateExistingElements()
    this.renderDots()
    this.start()
  }
}