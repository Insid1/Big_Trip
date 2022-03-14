import {render, RenderPosition } from './util/render.js';
import { pointsData } from './mock/point-data.js';
import SiteMenuView from './view/menu.js';
import SiteFilterView from './view/filter.js';
import SiteSortingView from './view/sorting.js';
import TotalPrice from './view/price.js';
import PointView from './view/trip-point.js';
import PointContainerView  from './view/point-container';
import TripInfoView from './view/trip-info.js';
import NoPointMessage from './view/no-point-message.js';
import { replace } from './util/render';
import EditPoint from './view/form-edit.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');

//HEADER
const Menu = new SiteMenuView();
const menuHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__navigation');
render(menuHeaderElement, Menu);
// adds filter to header menu
const filterHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__filters');
const filter =  new SiteFilterView(pointsData);
render(filterHeaderElement, filter);

//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


if (pointsData.length === 0) {
  render(tripEventsElement, new NoPointMessage(pointsData));
} else {
  const Sorting =  new SiteSortingView();
  render(tripEventsElement, Sorting, RenderPosition.START);

  const PointContainer =  new PointContainerView();
  render(tripEventsElement, PointContainer, RenderPosition.END);

  const renderPoints = (data) => {
    const renderPoint = (pointContainer, point) => {
      const generalPoint = new PointView(point);
      const editPoint = new EditPoint(point);
      generalPoint.setClickHandler(() => {
        replace(editPoint, generalPoint);
        editPoint.setEscHandler(() => {
          replace(generalPoint, editPoint);
          editPoint.removeEscHandler();
        });
      });
      editPoint.setClickHandler(() => {
        replace(generalPoint, editPoint);
        editPoint.removeEscHandler();
      });
      editPoint.setSubmitHandler(() => {
        replace(generalPoint, editPoint);
        editPoint.removeEscHandler();
      });

      render(pointContainer, generalPoint);
    };

    data.forEach((element) => {
      renderPoint(PointContainer, element);
    });
  };
  const TripInfo =  new TripInfoView(pointsData);
  render(tripMainHeaderElement, TripInfo, RenderPosition.START);

  render(TripInfo, new TotalPrice(pointsData));
  renderPoints(pointsData);
}


