import { createElement } from '../util/point.js';

export default class AbstractElement {
  constructor() {
    if (new.target === AbstractElement) {
      throw Error('Can\'t instantiate Abstract, only concrete one.');
    }
    this._element = null;
    this._callback = {}; // folder for callback functions
  }

  getTemplate() {
    throw Error('Abstract class doesnt have template and therefore Element');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
