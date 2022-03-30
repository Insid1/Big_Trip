import Observer from '../util/observer';
import dayjs from 'dayjs';


export default class TripPoints extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points, updateType) {
    this._points = points.slice();

    this.notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this.notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this.notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this.notify(updateType, update);

  }

  static adaptPointToClient(serverPoint) {
    const adaptOffers = (offers) => offers.map((offer) => ({
      name: offer.title,
      price: offer.price,
    }));
    const adaptPhotos = (photos) => photos.map(({title, src}) => ({
      src: src,
      alt: title,
    }));
    return {
      id: serverPoint.id,
      event: serverPoint.type,
      city: serverPoint.destination.name,
      fromTime: dayjs(serverPoint['date_from']),
      toTime: dayjs(serverPoint['date_to']),
      price: serverPoint.base_price,
      favorite: serverPoint['is_favorite'],
      description: serverPoint.destination.description,
      photos: adaptPhotos(serverPoint.destination.pictures),
      offers: adaptOffers(serverPoint.offers),
    };
  }

  static adaptPointToServer(clientPoint) {
    const adaptPhotos = () => {
      clientPoint.photos.map(({src, alt}) => ({
        'src': src,
        'description': alt,
      })
      );
    };
    const adaptOffers = () => clientPoint.map(({name, price}) => ({
      'title': name,
      'price': price,
    }));
    return {
      'id': clientPoint.id,
      'type': clientPoint.event,
      'date_from': clientPoint.fromTime, // shall convert back from dayjs
      'date_to': clientPoint.toTime,
      'destination': {
        'name': clientPoint.city,
        'description': clientPoint.description,
        'pictures': adaptPhotos(),
      },
      'base_price': clientPoint.price,
      'is_favorite': clientPoint.favorite,
      'offers': adaptOffers(),
    };
  }
}
