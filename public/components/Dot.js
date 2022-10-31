import { getRandomInt } from "../utils/number.js";
import { store } from "../store/index.js";
import {
  GameStatus,
  dotMinSizeInPixel,
  dotMaxSizeInPixel,
  Sound,
} from "../constant/index.js";
import { playSound } from "../utils/sound.js";

class Dot {
  constructor(parentElement, type = "div", callback) {
    this._parentEl = parentElement;
    this._type = type;

    const size = getRandomInt(dotMinSizeInPixel, dotMaxSizeInPixel);
    this._weight = this.getDotWeight(size);

    const xCoordinate = getRandomInt(0, window.innerWidth - size);
    const yCoordinate = 0 - size;
    this._xCoordinate = xCoordinate;
    this._yCoordinate = yCoordinate;
    this.id = Math.random();

    this._callback = callback;
    this.render(size);
  }
  render(size) {
    this._el = document.createElement(this._type);
    this._el.className = "dot button";
    this._el.style.height = `${size}px`;
    this._el.style.width = `${size}px`;
    this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`;
    this._el.dataset.id = this.id;
    this._parentEl.appendChild(this._el);

    this._el.addEventListener("click", (e) => {
      if (store.getStatus() !== GameStatus.InProgress) {
        return;
      }
      store.increaseScore(this._weight);
      this._callback();
      this.renderPoint();
      playSound(Sound.Plop);
      this.destroy();
    });
    this.animate();
  }
  renderPoint() {
    this._pointEl = document.createElement("div");
    this._pointEl.className = "dot-point";
    this._pointEl.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`;
    this._pointEl.textContent = `+ ${this._weight}`;
    this._parentEl.appendChild(this._pointEl);

    setTimeout(() => {
      requestAnimationFrame(() => {
        this._pointEl.remove();
      });
    }, 1000);
  }
  animate() {
    const intervalInMs = 60;
    const speed =
      store.getStatus() === GameStatus.InProgress ? store.getSpeed() : 0;
    this._yCoordinate = this._yCoordinate + speed / intervalInMs;
    this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`;
    this._intervalId = requestAnimationFrame(this.animate.bind(this));
  }
  getDotWeight(size) {
    // size = 1 => weight = 10
    // size = 100 => weight = 1
    return Math.round((10 / (size / 1)) * 10);
  }
  destroy() {
    this._el.remove();
    cancelAnimationFrame(this._intervalId);
  }
}

export default Dot;
