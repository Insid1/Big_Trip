import Observer from '../util/observer';
import dayjs from 'dayjs';


export default class TripPoints extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
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

  refreshPoints(updateType) {
    this.notify(updateType);
  }

  static adaptPointToClient(serverPoint) {
    const adaptOffers = (offers) => {
      offers.map((offer) => ({
        name: offer.title,
        price: offer.price,
        checked: false, // must rework view function false is temporary
      }));
    };
    return {
      id: serverPoint.id,
      event: serverPoint.type,
      city: serverPoint.destination.name,
      fromTime: dayjs(serverPoint['date_from']),
      toTime: dayjs(serverPoint['date_to']),
      price: serverPoint.base_price,
      favorite: serverPoint['is_favorite'],
      description: serverPoint.destination.description,
      photos: serverPoint.destination.pictures.map(({src}) => src), // server data aslo consist alt value  img tag must refactor View component to support it
      offers: adaptOffers(serverPoint.offers),
    };
  }

  static adaptPointToServer(clientPoint) {
    const one = 1;
    return {
      'id': clientPoint.id,
      'type': clientPoint.event,
      'date_from': clientPoint.fromTime, // shall convert back from dayjs
      'date_to': clientPoint.toTime,
      'destination': {
        'name': clientPoint.city,
        'description': clientPoint.description,
        'pictures': [ // make function for pictures
          {
            'src': 'http://picsum.photos/300/200?r=0.17074295443576526',
            'description': 'not yet'
          },
          {
            'src': 'http://picsum.photos/300/200?r=0.12509370998832603',
            'description': 'not yet'
          },
        ]
      },
      'base_price': clientPoint.price,
      'is_favorite': clientPoint.favorite,
      'offers': [ // make function for offers
        {
          'title': 'Choose comfort class',
          'price': 110
        },
        {
          'title': 'Choose business class',
          'price': 180
        }
      ]
    };
  }
}
