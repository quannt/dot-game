const GameStatus = {
  Idle: 'idle',
  InProgress: 'inProgress',
  Paused: 'paused'
}

class Game {
  constructor(element) {
    this._el = element
    this._status = GameStatus.Idle
    this._speed = 0
  }
  render () {
    this.hydrateHeader()
    this.renderDots()
    this.start()
  }
  hydrateHeader () {
    document.querySelector('#score').textContent = `Score: 0`
    document.querySelector('#start-button').textContent = 'Start'
    document.querySelector('#speed-label').textContent = `Current Speed: Slow`
  }
  renderDots() {
    console.log('renderDots')
  }
  start () {
    this._status = GameStatus.InProgress
    console.log('start')
  }
}

export default Game