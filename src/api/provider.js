import TripPointsModel from '../model/trip-points';
import {isOnline} from '../util/common.js';

const getSyncedPoints = (items) => items
  .filter(({success}) => success)
  .map(({payload}) => payload.point);

const createStoreStructure = (items) => items
  .reduce((acc, current) => Object
    .assign({}, acc, {
      [current.id]: current,
    }), {});

export default class Provider {
  constructor(api, store, storeStatic) {
    this._api = api;
    this._store = store;
    this._storeStatic = storeStatic;
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._storeStatic.setItem('offers', offers);
          return offers;
        });
    }
    const offersFromStore = this._storeStatic.getItems().offers;
    return Promise.resolve(offersFromStore);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._storeStatic.setItem('destinations', destinations);
          return destinations;
        });
    }
    const destinationsFromStore = this._storeStatic.getItems().destinations;
    return Promise.resolve(destinationsFromStore);
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(TripPointsModel.adaptPointToServer));
          this._store.setItems(items);
          return points;
        });
    }
    const storePoints = Object.values(this._store.getItems());
    return Promise.resolve(storePoints.map(TripPointsModel.adaptPointToClient));
  }

  updatePoint(point) {
    if (isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, TripPointsModel.adaptPointToServer(updatedPoint));
          return updatedPoint;
        });
    }
    this._store.setItem(point.id, TripPointsModel.adaptPointToServer(Object.assign({}, point)));
    return Promise.resolve(point);
  }

  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, TripPointsModel.adaptPointToServer(newPoint));
          return newPoint;
        });
    }
    return Promise.reject(new Error('add point Failed'));
  }

  removePoint(point) {
    if (isOnline()) {
      return this._api.removePoint(point)
        .then(() => {
          this._store.removeItem(point.id);
        });
    }
    return Promise.reject(new Error('remove point Failed'));
  }

  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          // забираем из ответа синхронизированные поинты
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные поинты в хранилище
          // Хранилище должно быть актуальным в любой момент
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);
          this._store.setItems(items);
        });
    }
    return Promise.reject(new Error('Sync data Failed'));
  }
}
