import AbstractElement from './abstract-element';

const createTripList = () => '<ul class="trip-events__list"></ul>';

export default class PointContainer extends AbstractElement {

  getTemplate() {
    return createTripList();
  }

}
