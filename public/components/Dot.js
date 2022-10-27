import { getRandomInt } from "../utils/number.js";
import { animationInterval } from "../utils/animationInterval.js";
import { store } from "../store/index.js";

class Dot {
  constructor(parentElement, xCoordinate = 0, yCoordinate = 0, type = "div") {
    this._parentEl = parentElement;
    this._type = type;
    this._xCoordinate = xCoordinate;
    this._yCoordinate = yCoordinate;

    const size = getRandomInt(10, 100);
    this._weight = this.getDotWeight(size);
    this.render(size);
  }
  render(size) {
    this._el = document.createElement(this._type);
    this._el.className = "dot button";
    this._el.style.height = `${size}px`;
    this._el.style.width = `${size}px`;
    this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`;
    this._parentEl.appendChild(this._el);
    
    this._el.
    this.animate();
  }
  animate() {
    const controller = new AbortController();
    const intervalInMs = 60;
    animationInterval(intervalInMs, controller.signal, () => {
      const speed = store.getSpeed() * (1000 / intervalInMs);
      this._yCoordinate = this._yCoordinate + speed / intervalInMs;
      this._el.style.transform = `translate(${this._xCoordinate}px, ${this._yCoordinate}px)`;
    });
  }
  getDotWeight(size) {
    // size = 1 => weight = 10
    // size = 100 => weight = 1
    return Math.round(10 / (size / 1) * 10)
  }
}

export default Dot;
