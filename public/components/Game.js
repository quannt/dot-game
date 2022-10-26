const GameStatus = {
  Idle: 'idle',
  InProgress: 'inProgress',
  Paused: 'paused'
}

class Game {
  constructor() {
    this.status = GameStatus.Idle
  }
  render () {
    this.hydrateHeader()
    this.renderDots()
    this.start()
  }
  start () {
    this.status = GameStatus.InProgress
  }
}

export default Game