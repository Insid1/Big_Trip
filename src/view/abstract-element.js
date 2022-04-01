import { createElement } from '../util/render';
const SHAKE_ANIMATION_TIMEOUT = 600;

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

  show() {
    this.getElement().classList.remove('visually-hidden');
  }

  hide() {
    this.getElement().classList.add('visually-hidden');
  }

  shake(cb) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      cb();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
