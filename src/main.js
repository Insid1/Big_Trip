import { pointsData } from './mock/point-data.js';
import TripPresenter from './presenter/trip.js';
import TripPointsModel from './model/trip-points.js';
import InfoHeaderPresenter from './presenter/info-header.js';
import TripFilterModel from './model/filter.js';

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(pointsData);
const filterModel = new TripFilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsElement, tripPointsModel, filterModel);
const infoHeaderPresenter = new InfoHeaderPresenter(tripMainHeaderElement, tripPointsModel, filterModel, tripPresenter);

//HEADER
infoHeaderPresenter.init();
//MAIN
tripPresenter.init();

const newEventBtn = tripMainHeaderElement.querySelector('.trip-main__event-add-btn');
newEventBtn.addEventListener('click', tripPresenter._handleNewEventButtonClick);


