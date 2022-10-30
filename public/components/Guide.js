class Guide {
  constructor(parentElement, type = "div", callback) {
    this._parentEl = parentElement;
    this._type = type;
    this._callback = callback;
    this.render();
  }
  render() {
    this._el = document.createElement("div");
    this._el.className = "overlay";
    this._parentEl.appendChild(this._el);
  }
}

export default Guide;
