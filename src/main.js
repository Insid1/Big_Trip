import { RenderPosition } from './util.js';
import { pointsData } from './mock/point-data.js';
import SiteMenuView from './view/menu.js';
import SiteFilterView from './view/filter.js';
import SiteSortingView from './view/sorting.js';
import TotalPrice from './view/price.js';
import PointView from './view/trip-point.js';
import PointContainerView  from './view/point-container';
import TripInfoView from './view/trip-info.js';
import NoPointMessage from './view/no-point-message.js';
import { render } from './util.js';
import EditPoint from './view/form-edit.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainHeaderElement = siteHeaderElement.querySelector('.trip-main');
//HEADER
// adds menu to header
const menuHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__navigation');
render(menuHeaderElement, new SiteMenuView().getElement());
// adds filter to header menu
const filterHeaderElement = tripMainHeaderElement.querySelector('.trip-controls__filters');
render(filterHeaderElement, new SiteFilterView(pointsData).getElement());
// adds trip info to header

//MAIN
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


if (pointsData.length === 0) {
  render(tripEventsElement, new NoPointMessage(pointsData).getElement());
} else {
  // ads sorting form to main body
  render(tripEventsElement, new SiteSortingView().getElement(), RenderPosition.START);
  // ads ul for events to main body
  render(tripEventsElement, new PointContainerView().getElement(), RenderPosition.END);
  // gets trip-list element
  const tripListElement = siteMainElement.querySelector('.trip-events__list');
  // adds edit form and general points to list
  const renderPoints = (data) => {
    const renderPoint = (pointContainer, point) => {
      const generalPointElement = new PointView(point).getElement();
      const editorPointElement = new EditPoint(point).getElement();
      const replaceWithEditPoint = () => {
        pointContainer.replaceChild(editorPointElement, generalPointElement);
      };
      const replaceWithGeneralPoint = () => {
        pointContainer.replaceChild(generalPointElement, editorPointElement);
      };
      const onEscDown = (evt) => {
        if (evt.key === 'Esc' || evt.key === 'Escape' ) {
          evt.preventDefault();
          replaceWithGeneralPoint();
          document.removeEventListener('keydown', onEscDown);
        }
      };

      generalPointElement
        .querySelector('.event__rollup-btn')
        .addEventListener('click', () => {
          replaceWithEditPoint();
          document.addEventListener('keydown', onEscDown);
        });
      editorPointElement
        .querySelector('.event__rollup-btn')
        .addEventListener('click', () => {
          replaceWithGeneralPoint();
        });
      editorPointElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        replaceWithGeneralPoint();

      });

      render(pointContainer, generalPointElement);
    };

    data.forEach((element) => {
      renderPoint(tripListElement, element);
    });
  };
  render(tripMainHeaderElement, new TripInfoView(pointsData).getElement(), RenderPosition.START);
  // adds trip price to header
  const tripInfoHeaderElement = tripMainHeaderElement.querySelector('.trip-info');
  render(tripInfoHeaderElement, new TotalPrice(pointsData).getElement());
  renderPoints(pointsData);
}


