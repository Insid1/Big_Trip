export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObservers(observer) {
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer);
  }

  notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}
