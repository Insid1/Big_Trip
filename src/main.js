import TripPointsModel from './model/trip-points.js';
import TripFilterModel from './model/filter.js';
import TripOffersModel from './model/offers.js';
import TripDestinationsModel from './model/destinations.js';
import TripPresenter from './presenter/trip.js';
import TripFilterPresenter from './presenter/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import TripStatisticPresenter from './presenter/statistic.js';
import Api from './api/api.js';
import Provider from './api/provider.js';
import { UpdateType } from './const.js';
import { createErrorMessage } from './util/common.js';
import Store from './api/store.js';

const AUTHORIZATION = 'Basic dkjfn34tbhjdfhjgb34522';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const STORE_PREFIX = 'taskmanager-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const STORE_NAME_STATIC = `${STORE_PREFIX}-STATIC-${STORE_VER}`;

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripControlsElement = tripMainHeaderElement.querySelector('.trip-main__trip-controls');
const newEventBtn = tripMainHeaderElement.querySelector('.trip-main__event-add-btn');

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const storeStatic = new Store(STORE_NAME_STATIC, window.localStorage);
const apiWithProvider = new Provider(api, store, storeStatic);
const filterModel = new TripFilterModel();
const tripOffersModel = new TripOffersModel();
const tripPointsModel = new TripPointsModel();
const tripDestinationsModel = new TripDestinationsModel();

const tripPresenter = new TripPresenter(tripEventsElement, tripPointsModel, filterModel, tripOffersModel, tripDestinationsModel, apiWithProvider);
tripPresenter.init();
const tripInfoPresenter = new TripInfoPresenter(tripMainHeaderElement, tripPointsModel);
tripInfoPresenter.init();
const tripFilterPresenter = new TripFilterPresenter(tripControlsElement, tripPointsModel, filterModel);
tripFilterPresenter.init();
const tripStatisticPresenter = new TripStatisticPresenter(siteMainElement, tripPointsModel);

newEventBtn.addEventListener('click', tripPresenter._handleNewEventButtonClick);

const addStatistic = () => {
  const tableBtn = tripControlsElement.querySelector('.trip-controls__trip-tabs').children[0];
  const statsBtn = tripControlsElement.querySelector('.trip-controls__trip-tabs').children[1];

  tableBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    tableBtn.classList.add('trip-tabs__btn--active');
    statsBtn.classList.remove('trip-tabs__btn--active');
    tripPresenter.show();
    tripStatisticPresenter.hide();
    tripFilterPresenter.enableFilters();
    newEventBtn.disabled = false;
  });
  statsBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    tableBtn.classList.remove('trip-tabs__btn--active');
    statsBtn.classList.add('trip-tabs__btn--active');
    tripPresenter.hide();
    tripStatisticPresenter.show();
    tripFilterPresenter.disableFilters();
    newEventBtn.disabled = true;

  });
};
addStatistic();


apiWithProvider.getDestinations()
  .then(TripDestinationsModel.adaptDestinationToClient)
  .then((destinations) => {
    tripDestinationsModel.setDestinations(destinations, UpdateType.INIT_DESTINATIONS);
  }).catch((err) => {
    createErrorMessage(err);
    throw Error(err);
  });

apiWithProvider.getOffers()
  .then((offers) => {
    tripOffersModel.setOffers(offers, UpdateType.INIT_OFFERS);
  })
  .catch((err) => {
    createErrorMessage(err);
    throw Error(err);
  });


apiWithProvider.getPoints()
  .then((points) => {
    tripPointsModel.setPoints(points, UpdateType.INIT);
  })
  .catch((err) => {
    tripPointsModel.setPoints([], UpdateType.INIT);
    throw Error(err);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});
window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
