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
    
    for (let step of this._steps) {
      const el = document.createElement('div');
      const hostEl = step.hostEl;
      el.textContent = step.content;
      el.style.top = `${step.top}px`;
      el.style.left = `${step.left}px`;
      el.style.position = 'absolute';
      el.className = 'guide-tooltip arrow-top';
      hostEl.style.zIndex = '2';
      hostEl.append(el)
    }
  }
}

export default Guide;
