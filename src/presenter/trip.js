import {render, RenderPosition } from '../util/render.js';
// import { replace } from '../util/render';
// import SiteMenuView from './view/menu.js';
// import SiteFilterView from './view/filter.js';
import SiteSortingView from '../view/sorting.js';
// import TotalPrice from './view/price.js';
import PointContainerView  from '../view/point-container';
// import PointView from '../view/trip-point.js';
// import EditPointView from '../view/form-edit.js';
import PointPresenter from './point.js';
// import TripInfoView from './view/trip-info.js';
import NoPointView from '../view/no-point.js';


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripListComponent = new PointContainerView();
    this._sortingComponent = new SiteSortingView();
    this._noPointsComponent = new NoPointView();
  }

  init(tripPointsData) {
    this._tripPoints = tripPointsData.slice();
    this._renderTrip();
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.START);
  }

  _renderPointList() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.END);
    this._renderPoints();
  }

  _renderPoint(pointData) {
    const pointPresenter = new PointPresenter(this._tripListComponent);
    pointPresenter.init(pointData);
  }

  _renderPoints() {
    this._tripPoints.forEach((element) => {
      this._renderPoint(element);
    });
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointsComponent);
  }

  _renderTrip() {
    this._renderSorting();
    this._renderPointList();
  }
}
