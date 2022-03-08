import { createSiteMenuTemplate } from './view/menu.js';
import { createSiteFilterTemplate } from './view/filter.js';
import { createSitePrice } from './view/price.js';
import { createSiteTripInfo } from './view/trip-info.js';
import { createSiteSortingTemplate } from './view/sorting.js';
import { createTripList, createTripPoint } from './view/trip-point.js';
import { createFormEditPointElement } from './view/form-edit.js';
import { createFormAddPointElement } from './view/form-create.js';

const TRIP_POINTS = 3;
const DEFAULT_PLACE = 'beforeend';

const render = (container, markup = '', place = DEFAULT_PLACE) => {
  container.insertAdjacentHTML(place, markup);
};
const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
//HEADER
// adds menu to header
const menuHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__navigation');
render(menuHeaderElement, createSiteMenuTemplate());
// adds filter to header menu
const filterHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__filters');
render(filterHeaderElement, createSiteFilterTemplate());
// adds trip info to header
render(tripMainHeaderElement, createSiteTripInfo(), 'afterbegin');
// adds trip price to header
const tripInfoHeaderElement = tripMainHeaderElement.querySelector('.trip-info');
render(tripInfoHeaderElement, createSitePrice());

//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
// ads sorting form to main body
render(tripEventsElement, createSiteSortingTemplate(), 'afterbegin');
// ads ul for events to main body
const tripFilterElement = siteMainElement.querySelector('.trip-sort');
render(tripFilterElement, createTripList(), 'afterend');
// gets trip-list element
const tripListElement = siteMainElement.querySelector('.trip-events__list');
// ads create-event element
render(tripListElement, createFormAddPointElement(), 'afterbegin');
// ads edit-event-form form
render (tripListElement, createFormEditPointElement());
// ads events to ul
for (let i = 0; i < TRIP_POINTS; i++) {
  render(tripListElement, createTripPoint());
}


