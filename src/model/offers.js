import Observer from '../util/observer';

export default class TripOffers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(points, updateType) {
    this._offers = Object.assign({}, points);
    this.notify(updateType);
  }

  getOffers() {
    return this._offers;
  }

  static adaptOfferToClient(serverOffer) {
    const adaptedOffers = {};
    const adaptOffer = (offers) => offers.map((offer) => ({
      name: offer.title,
      price: offer.price,
    }));
    serverOffer.forEach((offer) => {
      const tempValues = Object.values(offer);
      adaptedOffers[tempValues[0]] = adaptOffer(tempValues[1]);
    });
    return adaptedOffers;
  }
}
