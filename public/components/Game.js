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
    this._scoreBoardEl = document.querySelector('#score')
    this._startButtonEl = document.querySelector('#start-button')
    this._speedLabel = document.querySelector('#speed-label')
    this._speedInput = document.querySelector('#speed-input')
  }
  render () {
    this.hydrateHeader()
    this.renderDots()
    this.start()
  }
  hydrateHeader () {
    this._scoreBoardEl.textContent = `Score: 0`
    this._startButtonEl.textContent = 'Start'
    this._speedLabel.textContent = `Current Speed: 0 - Difficulty: Easy`
    this._speedInput.addEventListener('input', (e) => {
      const speed = e.target.value
      let speedLabel = ''
      if (speed >= 0 && speed < 20) {
        speedLabel = 'Easy'
      } else if (speed >= 20 && speed < 50) {
        speedLabel = "Medium"
      } else if (speed >= 50 && speed < 99) {
        speedLabel = 'Hard'
      } else {
        speedLabel = 'Impossible!'
      }
      this._speedLabel.textContent = `Current Speed: ${speed} - Difficulty: ${speedLabel}`
    });
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