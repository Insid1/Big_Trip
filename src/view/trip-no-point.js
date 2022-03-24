import AbstractElement from './abstract-element';
const createNoPointMessage = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPoint extends AbstractElement {

  getTemplate() {
    return createNoPointMessage(this.data);
  }

}
