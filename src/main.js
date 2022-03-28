import { pointsData } from './mock/point-data.js';
import TripPointsModel from './model/trip-points.js';
import TripFilterModel from './model/filter.js';
import TripPresenter from './presenter/trip.js';
import TripFilterPresenter from './presenter/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';
// import StatisticView from './view/statistic.js';
// import { render, RenderPosition } from './util/render.js';
// const statisticElement = new StatisticView(pointsData);

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

//HEADER
tripInfoPresenter.init();
tripFilterPresenter.init();
//MAIN
tripPresenter.init();

const newEventBtn = tripMainHeaderElement.querySelector('.trip-main__event-add-btn');
newEventBtn.addEventListener('click', tripPresenter._handleNewEventButtonClick);


// const menuTable = infoHeaderPresenter._filters.getElement().querySelector('.trip-controls__trip-tabs').children[0];
// const menuStats = infoHeaderPresenter._filters.getElement().querySelector('.trip-controls__trip-tabs').children[1];

// menuTable.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   menuTable.classList.add('trip-tabs__btn--active');
//   menuStats.classList.remove('trip-tabs__btn--active');
//   tripPresenter.showTrip();
//   statisticElement.hide();

// });
// menuStats.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   menuTable.classList.remove('trip-tabs__btn--active');
//   menuStats.classList.add('trip-tabs__btn--active');
//   tripPresenter.hideTrip();
//   statisticElement.show();
// });

// render(tripEventsElement, statisticElement, RenderPosition.END);

