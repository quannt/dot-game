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
      el.style.top = step.top;
      el.style.left = step.left;
      el.style.position = 'absolute';
      el.className = 'guide-tooltip';
      hostEl.append(el)
    }
  }
}

export default Guide;
