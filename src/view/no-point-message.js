import { createElement } from '../util.js';

const createNoPointMessage = (data) => {
  if (!data) {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }
};

export default class NoPointMessage {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createNoPointMessage(this.data);
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
