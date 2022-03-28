import { pointsData } from './mock/point-data.js';
import TripPointsModel from './model/trip-points.js';
import TripFilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import TripFilterPresenter from './presenter/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
import TripStatisticPresenter from './presenter/statistic.js';
// import { render, RenderPosition } from './util/render.js';

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(pointsData);
const filterModel = new TripFilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripControlsElement = tripMainHeaderElement.querySelector('.trip-main__trip-controls');

const tripPresenter = new TripPresenter(tripEventsElement, tripPointsModel, filterModel);
const tripInfoPresenter = new TripInfoPresenter(tripMainHeaderElement, tripPointsModel);
const tripFilterPresenter = new TripFilterPresenter(tripControlsElement, tripPointsModel, filterModel);
const tripStatisticPresenter = new TripStatisticPresenter(siteMainElement, tripPointsModel);

//HEADER
tripInfoPresenter.init();
tripFilterPresenter.init();
//MAIN
tripPresenter.init();

const newEventBtn = tripMainHeaderElement.querySelector('.trip-main__event-add-btn');
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


