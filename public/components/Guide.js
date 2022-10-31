import { introLocalStorageKey } from "../constant/index.js";

class Guide {
  constructor(parentElement, type = "div", steps, callback) {
    this._parentEl = parentElement;
    this._type = type;
    this._callback = callback;
    this._steps = steps;
    this._currentStep = 1;
    this.render();
  }
  render() {
    this._el = document.createElement("div");
    this._el.className = "overlay";
    this._parentEl.appendChild(this._el);
    this.renderSteps();
  }
  renderSteps() {
    this.destroySteps();

    for (let i = 0; i < this._steps?.length; i++) {
      const step = this._steps[i];
      this._stepEl = document.createElement("div");
      const hostEl = step.hostEl;

      const isStepActive = i + 1 === this._currentStep;

      if (!isStepActive) {
        hostEl.style.zIndex = "auto";
        continue;
      }

      // Create the body of the step
      const body = document.createElement("p");
      body.textContent = step.content;
      this._stepEl.appendChild(body);

      // Create the footer menu of the step
      const menu = document.createElement("div");
      menu.className = "footer-menu";
      const isLastStep = i + 1 === this._steps.length;
      const nextButtonLabel = isLastStep ? "Got it!" : "Next »";

      menu.innerHTML = `
        <div class="top-menu">
         <span>${i + 1} of ${this._steps?.length}</span>
         <button data-step=${i} class="guide-next-button button-link">${nextButtonLabel}</button>
        </div>
        
      `;
      const bottomMenu = `
      <div class="bottom-menu">
          <button class="guide-skip-button button-link">Let me play</button>
      </div>
      `;
      if (!isLastStep) {
        menu.innerHTML += bottomMenu;
      }

      this._stepEl.appendChild(menu);

      this._stepEl.style.top = `${step.top}px`;
      this._stepEl.style.left = `${step.left}px`;
      this._stepEl.style.position = "absolute";
      this._stepEl.className = `guide-tooltip ${step.position} ${step.class}`;

      hostEl.style.zIndex = "2";

      hostEl.appendChild(this._stepEl);
    }
    this.setUpEventListeners();
  }
  destroySteps() {
    document.querySelectorAll(".guide-tooltip").forEach((el) => el.remove());
  }
  setUpEventListeners() {
    const nextButton = document.querySelector(".guide-next-button");
    const skipButton = document.querySelector(".guide-skip-button");

    nextButton.addEventListener("click", this.handleNextButtonClick.bind(this));
    skipButton?.addEventListener(
      "click",
      this.handleSkipButtonClick.bind(this)
    );
  }
  handleNextButtonClick(e) {
    this._currentStep = this._currentStep + 1;
    if (this._currentStep > this._steps.length) {
      this.destroy();
      return;
    }
    this.renderSteps();
  }
  handleSkipButtonClick(e) {
    this.destroy();
  }
  destroy() {
    this.destroySteps();
    this._el.remove();
    this._callback();
  }
}

export default Guide;
