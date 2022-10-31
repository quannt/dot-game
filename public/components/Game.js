import Dot from "./Dot.js";
import Guide from "./Guide.js";
import { getRandomInt } from "../utils/number.js";
import { playSound } from "../utils/sound.js";
import { store } from "../store/index.js";
import { GameStatus, newDotIntervalInMs, Sound } from "../constant/index.js";

class Game {
  constructor(element) {
    this._el = element;
    this._scoreBoardEl = document.querySelector("#score");
    this._startButtonEl = document.querySelector("#start-button");
    this._speedLabelEl = document.querySelector("#speed-label");
    this._speedInput = document.querySelector("#speed-input");
  }
  init() {
    this.hydrateExistingElements();
    this.render();
    this.renderGuide();
    this.setUpAutoPause();
    this._bgSound = playSound(Sound.Background);
  }
  render() {
    this.renderHeader();
  }
  renderGuide() {
    const steps = [
      {
        hostEl: document.querySelector(".sample-dot"),
        content:
          "Click on a dot to burst it, you get points for doing so! The smaller the dot, the more points you get.",
        top: 91,
        left: -90,
        position: "bottom",
        class: "sample-button-tooltip",
      },

      {
        hostEl: document.querySelector(".header-menu-input .input-wrapper"),
        content: "You can set the speed of the dots using this menu.",
        top: 32,
        left: 7,
        position: "bottom",
      },
      {
        hostEl: document.querySelector(".header-menu .start-button-wrapper"),
        content: "Click on the button to start playing.",
        top: 74,
        left: 7,
        position: "bottom",
      },
    ];
    this._guide = new Guide(
      document.body,
      "div",
      steps,
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
    var options = {
      root: null,
      rootMargin: "0px",
    };

    var observer = new IntersectionObserver(() => {
    }, options);
    this._renderDotsIntervalId = window.setInterval(() => {
      const dot = new Dot(this._el, "button", this.renderHeader.bind(this));
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
}

export default Game;
