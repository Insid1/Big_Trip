import {render, RenderPosition } from './util/render.js';
import { pointsData } from './mock/point-data.js';
import SiteMenuView from './view/menu.js';
import SiteFilterView from './view/filter.js';
import TripPresenter from './presenter/trip.js';

//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');

//HEADER
// trip info is not here yet
const menuHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__navigation');
render(menuHeaderElement, new SiteMenuView(), RenderPosition.END);
// adds filter to header menu
const filterHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__filters');
render(filterHeaderElement, new SiteFilterView(pointsData), RenderPosition.END);

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(pointsData);


