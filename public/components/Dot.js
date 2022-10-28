import { getRandomInt } from "../utils/number.js";
import { store, GameStatus } from "../store/index.js";

class Dot {
  constructor(
    parentElement,
    xCoordinate = 0,
    yCoordinate = 0,
    type = "div",
    callback
  ) {
    this._parentEl = parentElement;
    this._type = type;
    this._xCoordinate = xCoordinate;
    this._yCoordinate = yCoordinate;

    const size = getRandomInt(10, 100);
    this._weight = this.getDotWeight(size);
    this._callback = callback;
    this.render(size);
  }
  render(size) {
    this._el = document.createElement(this._type);
    this._el.className = "dot button";
    this._el.style.height = `${size}px`;
    this._el.style.width = `${size}px`;
    this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`;
    this._parentEl.appendChild(this._el);

    this._el.addEventListener("click", (e) => {
      store.increaseScore(this._weight);
      this._callback();
      this.destroy();
    });
    this.animate();
  }
  animate() {
    const intervalInMs = 60;
    const speed = store.getStatus() === GameStatus.InProgress ? store.getSpeed() : 0;
    this._yCoordinate = this._yCoordinate + speed / intervalInMs;
    this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`;
    this._intervalId = requestAnimationFrame(this.animate.bind(this));
    
    // TODO: destroy if the dot goes out of the viewport?
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
