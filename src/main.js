import { RenderPosition } from './util.js';
import { pointData } from './mock/point-data.js';
import SiteMenuView from './view/menu.js';
import SiteFilterView from './view/filter.js';
import SiteSortingView from './view/sorting.js';
// import CreatePointView from './view/form-create.js';
import TotalPrice from './view/price.js';
import TripPointView from './view/trip-point.js';
import PointContainerView  from './view/point-container';
import EditPointView from './view/form-edit.js';
import TripInfoView from './view/trip-info.js';
import { render } from './util.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
//HEADER
// adds menu to header
const menuHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__navigation');
render(menuHeaderElement, new SiteMenuView().getElement());
// adds filter to header menu
const filterHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__filters');
render(filterHeaderElement, new SiteFilterView().getElement());
// adds trip info to header
render(tripMainHeaderElement, new TripInfoView(pointData).getElement(), RenderPosition.START);
// adds trip price to header
const tripInfoHeaderElement = tripMainHeaderElement.querySelector('.trip-info');
render(tripInfoHeaderElement, new TotalPrice(pointData).getElement());

//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
// ads sorting form to main body
render(tripEventsElement, new SiteSortingView().getElement(), RenderPosition.START);
// ads ul for events to main body
render(tripEventsElement, new PointContainerView().getElement(), RenderPosition.END);
// gets trip-list element
const tripListElement = siteMainElement.querySelector('.trip-events__list');
// ads create-event element
// renderElement(tripListElement, new CreatePointView().getElement(), RenderPosition.START);
// adds edit form and general points to list
pointData.forEach((element, index) => {
  if (index === 0) {
    render(tripListElement, new EditPointView(element).getElement());} else {
    render(tripListElement, new TripPointView(element).getElement());
  }
});


