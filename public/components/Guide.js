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
      const el = document.createElement('div');
      const hostEl = step.hostEl;
      
      // Create the body of the guid
      const body = document.createElement('p');
      body.textContent = step.content
      el.appendChild(body);
      
      // Create the footer menu
      const menu = document.createElement('div');
      menu.className = 'footer-menu';
      menu.innerHTML = `
        <div class="top-menu">
         <span>${i + 1} of ${this._steps?.length}</span>
         <button id="guide-next-button" class="button-link">Next »</button>
        </div>
        <div class="bottom-menu">
          <button id="guide-skip-button" class="button-link">Let me play</button>
        </div>
      `;
      el.appendChild(menu);
      
      el.style.top = `${step.top}px`;
      el.style.left = `${step.left}px`;
      el.style.position = 'absolute';
      el.className = `guide-tooltip ${step.position}`;
      
      
      
      hostEl.style.zIndex = '2';
      hostEl.append(el)
    }
  }
}

export default Guide;
