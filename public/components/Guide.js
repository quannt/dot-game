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
        
      const body = document.createElement('p');
      body.textContent = step.content
      el.appendChild(body);
      
      const menu = document.createElement('div');
      menu.className = 'footer-menu';
      menu.innerHTML = `
        <span>${i + 1} of ${this._steps?.length}</span>
      `;
      el.appendChild(menu);
      
      el.style.top = `${step.top}px`;
      el.style.left = `${step.left}px`;
      el.style.position = 'absolute';
      el.className = `guide-tooltip ${step.position}`;
      
      // Create the footer menu
      
      hostEl.style.zIndex = '2';
      hostEl.append(el)
    }
  }
}

export default Guide;
