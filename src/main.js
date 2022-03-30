import TripPointsModel from './model/trip-points.js';
import TripFilterModel from './model/filter.js';
import TripOffersModel from './model/offers.js';
import TripDestinationsModel from './model/destinations.js';
import TripPresenter from './presenter/trip.js';
import TripFilterPresenter from './presenter/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import TripStatisticPresenter from './presenter/statistic.js';
import Api from './api.js';
import { UpdateType } from './const.js';

const AUTHORIZATION = 'Basic random_string';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripControlsElement = tripMainHeaderElement.querySelector('.trip-main__trip-controls');
const newEventBtn = tripMainHeaderElement.querySelector('.trip-main__event-add-btn');

const api = new Api(END_POINT, AUTHORIZATION);
const filterModel = new TripFilterModel();
const tripOffersModel = new TripOffersModel();
const tripPointsModel = new TripPointsModel();
const tripDestinationsModel = new TripDestinationsModel();

const tripPresenter = new TripPresenter(tripEventsElement, tripPointsModel, filterModel, tripOffersModel, tripDestinationsModel);
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
    tripPresenter.showTrip();
    tripStatisticPresenter.hide();
    tripFilterPresenter.enableFilters();
    newEventBtn.disabled = false;
  });
  statsBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    tableBtn.classList.remove('trip-tabs__btn--active');
    statsBtn.classList.add('trip-tabs__btn--active');
    tripPresenter.hideTrip();
    tripStatisticPresenter.show();
    tripFilterPresenter.disableFilters();
    newEventBtn.disabled = true;

  });
};
addStatistic();


api.getDestinations()
  .then(TripDestinationsModel.adaptDestinationToClient)
  .then((destinations) => {
    tripDestinationsModel.setDestinations(destinations, UpdateType.INIT_DESTINATIONS);
  });

api.getOffers()
  .then((offers) => {
    tripOffersModel.setOffers(offers, UpdateType.INIT_OFFERS);
  })
  .catch((err) => {
    throw Error(err);
  });


api.getPoints()
  .then((points) => {
    tripPointsModel.setPoints(points, UpdateType.INIT);
  })
  .catch((err) => {
    tripPointsModel.setPoints([], UpdateType.INIT);
    throw Error(err);
  });
