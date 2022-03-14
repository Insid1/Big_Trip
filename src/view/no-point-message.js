import AbstractElement from './abstract-element';
const createNoPointMessage = (data) => {
  if (!data) {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }
};

export default class NoPointMessage extends AbstractElement {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoPointMessage(this.data);
  }

}
