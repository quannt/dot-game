class Guide {
  constructor(parentElement, type = "div", steps, callback) {
    this._parentEl = parentElement;
    this._type = type;
    this._callback = callback;
    this._steps = steps;
    this.render();
  }
  render() {
    this._el = document.createElement("div");
    this._el.className = "overlay";
    this._parentEl.appendChild(this._el);

    for (let i = 0; i < this._steps?.length; i++) {
      const step = this._steps[i];
      const el = document.createElement("div");
      const hostEl = step.hostEl;

      // Create the body of the step
      const body = document.createElement("p");
      body.textContent = step.content;
      el.appendChild(body);

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
      
      el.appendChild(menu);

      el.style.top = `${step.top}px`;
      el.style.left = `${step.left}px`;
      el.style.position = "absolute";
      el.className = `guide-tooltip ${step.position}`;

      hostEl.style.zIndex = "2";
      hostEl.append(el);
    }

    this.setUpEventListeners();
  }
  setUpEventListeners() {
    const nextButton = document.querySelector(".guide-next-button");
    const skipButton = document.querySelector(".guide-skip-button");

    nextButton.addEventListener("click", this.handleNextButtonClick.bind(this));
    skipButton?.addEventListener("click", this.handleSkipButtonClick.bind(this));
  }
  handleNextButtonClick(e) {
    console.log("handleNextButtonClick", Number(e.target.dataset.step));
  }
  handleSkipButtonClick(e) {
    console.log("handleSkipButtonClick");
  }
}

export default Guide;
