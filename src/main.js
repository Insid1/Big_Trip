import { pointsData } from './mock/point-data.js';
import TripPresenter from './presenter/trip.js';
import TripPointsModel from './model/trip-points.js';
import InfoHeaderPresenter from './presenter/info-header.js';
import TripFilters from './model/filters.js';

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(pointsData);
const filteredPointsModel = new TripFilters(tripPointsModel);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');

//HEADER
const infoHeaderPresenter = new InfoHeaderPresenter(tripMainHeaderElement, pointsData);
infoHeaderPresenter.init();


//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsElement, tripPointsModel, filteredPointsModel);
tripPresenter.init();

