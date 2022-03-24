import AbstractElement from './abstract-element';

const createNewEventButton = () => `<button
  class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>`;


export default class NewEventButton extends AbstractElement {
  getTemplate() {
    return createNewEventButton();
  }
}
