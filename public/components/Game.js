import Dot from './Dot.js'
import { getRandomInt } from '../utils/number.js'
import { store } from '../store/index.js'

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
    this._startButton = document.querySelector('#start-button')
  }
  render () {
    this.hydrateExistingElements()
    this.renderHeader()
    this.renderDots()
    this.start()
  }
  renderHeader () {
    this._scoreBoardEl.textContent = `Score: ${store.getScore()}`
    this._startButtonEl.textContent = 'Start'
    this._speedLabel.textContent = `Current Speed: ${store.getSpeed()} - Difficulty: ${store.getDifficulty()}`
  }
  hydrateExistingElements () {
    this._speedInput.addEventListener('input', (e) => {
      const speed = e.target.value
      store.setSpeed(speed)
      this.renderHeader()
    });
    this._startButtonEl.addEventListener('click', this.handleStartButtonClick.bind(this))
  }
  renderDots() {
    window.setInterval(() => {
      const xCoordinate = getRandomInt(0, 1000)
      const yCoordinate = getRandomInt(-200, -10)
      const dot = new Dot(this._el, xCoordinate, yCoordinate, 'button')
    }, 1000)
    
  }
  start () {
    this._status = GameStatus.InProgress
    console.log('start')
  }
  handleStartButtonClick () {
    if (this._status === GameStatus.InProgress) {
      this._status = GameStatus.Paused
      this._startButtonEl.textContent = 'Resume'
    } else if (this._status === GameStatus.Paused) {
      this._status = GameStatus.InProgress
      this._startButtonEl.textContent = 'Pause'
    }
  }
}

export default Game