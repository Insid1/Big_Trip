import AbstractComponent from './abstract-component';

const createTripList = () => '<ul class="trip-events__list"></ul>';

export default class PointContainer extends AbstractComponent {

  getTemplate() {
    return createTripList();
  }

}
