import { RenderPosition } from './util.js';
import SiteMenuView from './view/menu.js';
import SiteFilterView from './view/filter.js';
import SiteSortingView from './view/sorting.js';
import CreatePointView from './view/form-create.js';
import { createSitePrice } from './view/price.js';
import { createSiteTripInfo } from './view/trip-info.js';
import { createTripList, createTripPoint } from './view/trip-point.js';
import { createFormEditPointElement } from './view/form-edit.js';
import { pointData } from './mock/point-data.js';
import { renderTemplate, renderElement } from './util.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
//HEADER
// adds menu to header
const menuHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__navigation');
renderElement(menuHeaderElement, new SiteMenuView().getElement());
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
renderElement(tripEventsElement, new SiteSortingView().getElement(), RenderPosition.START);
// ads ul for events to main body
renderTemplate(tripEventsElement, createTripList(), RenderPosition.END);
// gets trip-list element
const tripListElement = siteMainElement.querySelector('.trip-events__list');
// ads create-event element
// renderElement(tripListElement, new CreatePointView().getElement(), RenderPosition.START);
// adds edit form and general points to list
pointData.forEach((element, index) => {
  if (index === 0) {renderTemplate(tripListElement, createFormEditPointElement(element));} else {renderTemplate(tripListElement, createTripPoint(element));
  }
});


