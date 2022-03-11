import {createElement} from '../util.js';

const createTripList = () => '<ul class="trip-events__list"></ul>';

export default class PointContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripList(this._pointData);
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
