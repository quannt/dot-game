import Dot from "./Dot.js";
import Guide from "./Guide.js";
import { getRandomInt } from "../utils/number.js";
import { playSound } from "../utils/sound.js";
import { store } from "../store/index.js";
import { GameStatus, newDotIntervalInMs, Sound, guideSteps } from "../constant/index.js";

const observerOptions = {
  root: null,
  rootMargin: "0px",
};
class Game {
  constructor(element) {
    this._el = element;
    this._scoreBoardEl = document.querySelector("#score");
    this._startButtonEl = document.querySelector("#start-button");
    this._speedLabelEl = document.querySelector("#speed-label");
    this._speedInput = document.querySelector("#speed-input");
    this._dots = new Map();
  }
  init() {
    this.hydrateExistingElements();
    this.render();
    this.renderGuide();
    this.setUpAutoPause();
    this.setUpDotsObserver();
    this._bgSound = playSound(Sound.Background);
  }
  render() {
    this.renderHeader();
  }
  renderGuide() {
    this._guide = new Guide(
      document.body,
      "div",
      guideSteps,
      this.destroySampleDots.bind(this)
    );
  }
  renderHeader() {
    this._scoreBoardEl.textContent = `Score: ${store.getScore()}`;
    this._startButtonEl.textContent = "Start";
    this._speedLabelEl.textContent = `Current Speed: ${store.getSpeed()} - Difficulty: ${store.getDifficulty()}`;

    let buttonText = "Start";
    if (store.getStatus() === GameStatus.Paused) {
      buttonText = "Resume";
    } else if (store.getStatus() === GameStatus.InProgress) {
      buttonText = "Pause";
    }
    this._startButtonEl.textContent = buttonText;
  }
  hydrateExistingElements() {
    this._speedInput.addEventListener("input", (e) => {
      const speed = e.target.value;
      store.setSpeed(speed);
      this.renderHeader();
    });
    this._startButtonEl.addEventListener(
      "click",
      this.handleStartButtonClick.bind(this)
    );
  }
  renderDots() {
    this._renderDotsIntervalId = window.setInterval(() => {
      const dot = new Dot(this._el, "button", this.renderHeader.bind(this));
      this._observer?.observe(dot._el);
      this._dots.set(dot.id.toString(), dot);
    }, newDotIntervalInMs);
  }
  stopRenderingDots() {
    window.clearInterval(this._renderDotsIntervalId);
  }
  destroySampleDots() {
    document.querySelectorAll(".sample-dot").forEach((el) => el.remove());
  }

  // Event listeners
  handleStartButtonClick() {
    if (
      store.getStatus() === GameStatus.Idle ||
      store.getStatus() === GameStatus.Paused
    ) {
      this._bgSound.play();
      this._guide?.destroy();
      store.setStatus(GameStatus.InProgress);
      this.renderDots();
    } else if (store.getStatus() === GameStatus.InProgress) {
      this._bgSound.pause();
      store.setStatus(GameStatus.Paused);
      this.stopRenderingDots();
    }
    playSound(Sound.Click);
    this.render();
  }
  setUpAutoPause() {
    // Pause the game when the tab is hidden.
    // UX wise I think this is better.
    // Also, we use requestAnimationFrame to move the dots,
    // which pauses when the tab is hidden. This leads to a situation that
    // a huge cluster of dots are shown once you come back to the tab.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") {
        this._bgSound.pause();
        store.setStatus(GameStatus.Paused);
        this.stopRenderingDots();
        this.render();
      }
    });
  }
  setUpDotsObserver() {
    this._observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      for (let entry of entries) {
        if (!entry.isIntersecting) {
          const dot = this._dots.get(entry.target.dataset.id);
          dot?.destroy();
          this._dots.delete(entry.target.dataset.id);
        }
      }
    }, observerOptions);
  }
}

export default Game;
