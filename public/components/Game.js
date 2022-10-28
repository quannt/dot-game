import Dot from './Dot.js'
import { getRandomInt } from '../utils/number.js'
import { store, GameStatus } from '../store/index.js'


class Game {
  constructor(element) {
    this._el = element
    this._scoreBoardEl = document.querySelector('#score')
    this._startButtonEl = document.querySelector('#start-button')
    this._speedLabel = document.querySelector('#speed-label')
    this._speedInput = document.querySelector('#speed-input')
    
  }
  render () {
    this.hydrateExistingElements()
    this.renderHeader()
  }
  renderHeader () {
    this._scoreBoardEl.textContent = `Score: ${store.getScore()}`
    this._startButtonEl.textContent = 'Start'
    this._speedLabel.textContent = `Current Speed: ${store.getSpeed()} - Difficulty: ${store.getDifficulty()}`
    
    let buttonText = 'Start'
    if (store.getStatus() === GameStatus.Paused) {
        buttonText = 'Resume'
    } else if (store.getStatus() === GameStatus.InProgress) {
        buttonText = 'Pause'
    }
    this._startButtonEl.textContent = buttonText
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
    this._renderDotsIntervalId = window.setInterval(() => {
      const xCoordinate = getRandomInt(0, 1000)
      const yCoordinate = getRandomInt(-200, -10)
      const dot = new Dot(this._el, xCoordinate, yCoordinate, 'button', this.renderHeader.bind(this))
    }, 1000)
    
  }
  stopRenderingDots () {
    window.clearInterval(this._renderDotsIntervalId)
  }
  handleStartButtonClick () {
    if (store.getStatus() === GameStatus.Idle) {
      store.setStatus(GameStatus.InProgress)
      this.renderDots()
    }
    else if (store.getStatus() === GameStatus.InProgress) {
      store.setStatus(GameStatus.Paused)
      this.stopRenderingDots();
    } else if (store.getStatus() === GameStatus.Paused) {
      store.setStatus(GameStatus.InProgress)
      this.renderDots()
    }
    this.renderHeader()
  }
}

export default Game