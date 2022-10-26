const GameStatus = {
  Idle: 'idle',
  InProgress: 'inProgress',
  Paused: 'paused'
}

class Game {
  constructor(element) {
    this._el = element
    this._status = GameStatus.Idle
  }
  render () {
    this.hydrateHeader()
    this.renderDots()
    this.start()
  }
  hydrateHeader () {
    console.log('hydrateHeader')
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