import { pointsData } from './mock/point-data.js';
import TripPresenter from './presenter/trip.js';
import TripPointsModel from './model/trip-points.js';
import InfoHeaderPresenter from './presenter/info-header.js';

const tripPointsModel = new TripPointsModel();
tripPointsModel.setPoints(pointsData);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
// в мейн запихиваем:
// 1. трип инфо в котором общий прайс и точка от и до
// 2. три контролс в котором таблица статистики и фильтры

//HEADER
const infoHeaderPresenter = new InfoHeaderPresenter(tripMainHeaderElement, pointsData);
infoHeaderPresenter.init();


//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsElement, tripPointsModel);
tripPresenter.init(pointsData);

