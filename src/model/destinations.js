import Observer from '../util/observer';

export default class TripDestinations extends Observer {
  constructor() {
    super();
    this._destinations = {};
  }

  setDestinations(destinations, updateType) {
    this._destinations = Object.assign({}, destinations);
    this.notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }

  static adaptDestinationToClient(serverDestination) {
    const result = {};
    const adaptPhotos = (photos) => photos.map(({description, src}) => ({
      src: src,
      alt: description,
    }));
    serverDestination.forEach(({name, description, pictures}) => {
      result[name] = {
        description: description,
        photos: adaptPhotos(pictures),
      };
    });
    return result;
  }
}
