import { RenderPosition } from './util.js';
import { createSiteMenuTemplate } from './view/menu.js';
import SiteFilterView from './view/filter.js';
import { createSitePrice } from './view/price.js';
import { createSiteTripInfo } from './view/trip-info.js';
import { createSiteSortingTemplate } from './view/sorting.js';
import { createTripList, createTripPoint } from './view/trip-point.js';
import { createFormEditPointElement } from './view/form-edit.js';
import { pointData } from './mock/point-data.js';
import { renderTemplate, renderElement } from './util.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
//HEADER
// adds menu to header
const menuHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__navigation');
renderTemplate(menuHeaderElement, createSiteMenuTemplate());
// adds filter to header menu
const filterHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__filters');
renderElement(filterHeaderElement, new SiteFilterView().getElement());
// adds trip info to header
renderTemplate(tripMainHeaderElement, createSiteTripInfo(pointData), RenderPosition.START);
// adds trip price to header
const tripInfoHeaderElement = tripMainHeaderElement.querySelector('.trip-info');
renderTemplate(tripInfoHeaderElement, createSitePrice(pointData));

//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
// ads sorting form to main body
renderTemplate(tripEventsElement, createSiteSortingTemplate(), RenderPosition.START);
// ads ul for events to main body
const tripFilterElement = siteMainElement.querySelector('.trip-sort');
renderTemplate(tripFilterElement, createTripList(), 'afterend');
// gets trip-list element
const tripListElement = siteMainElement.querySelector('.trip-events__list');
// ads create-event element
// render(tripListElement, createFormAddPointElement(), RenderPosition.START);
// adds edit form and general points to list
pointData.forEach((element, index) => {
  if (index === 0) {renderTemplate(tripListElement, createFormEditPointElement(element));} else {renderTemplate(tripListElement, createTripPoint(element));
  }
});


