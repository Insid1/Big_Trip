import Observer from '../util/observer';

export default class tripEvents extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setEvents(points) {
    this._offers = points.slice();

  }

  getEvents() {
    return this._offers;
  }

  // shall rework
  static adaptEventToClient(serverEvent) {
    return {
      name: serverEvent.title,
      price: serverEvent.price,
    };
  }
}
