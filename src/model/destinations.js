import Observer from '../util/observer';

export default class TripDestinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = Object.assign({}, destinations);

  }

  getEvents() {
    return this._destinations;
  }

  // shall rework
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
