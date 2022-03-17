import {render, RenderPosition } from '../util/render.js';
// import { replace } from '../util/render';
// import SiteMenuView from './view/menu.js';
// import SiteFilterView from './view/filter.js';
import { updateItem } from '../util/common.js';
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
    this._pointPresenter = {};
    this._handleChangeData = this._handleChangeData.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleDayClick = this._handleDayClick.bind(this);
    this._handleTimeClick = this._handleTimeClick.bind(this);
    this._handlePriceClick = this._handlePriceClick.bind(this);
  }

  init(tripPointsData) {
    this._tripPoints = tripPointsData.slice();
    this._renderTrip();

    this._sortingComponent.setDayClick(this._handleDayClick);
    this._sortingComponent.setTimeClick(this._handleTimeClick);
    this._sortingComponent.setPriceClick(this._handlePriceClick);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _isSorted() {
    return this._tripPoints.every((element, index) => element === this._prevTripPoints[index]);
  }

  _sortByDay() {
    this._prevTripPoints = this._tripPoints;
    const sortedPointsData = this._tripPoints.slice();
    sortedPointsData.sort((a ,b )=> a.date - b.date);
    this._tripPoints = sortedPointsData;
  }

  _sortByTime() {
    this._prevTripPoints = this._tripPoints;
    const sortedPointsData = this._tripPoints.slice();
    sortedPointsData.sort((a ,b )=> a.pointDuration.as('milliseconds') - b.pointDuration.as('milliseconds'));
    this._tripPoints = sortedPointsData;
  }

  _sortByPrice() {
    this._prevTripPoints = this._tripPoints;
    const sortedPointsData = this._tripPoints.slice();
    sortedPointsData.sort((a ,b )=> a.price - b.price);
    this._tripPoints = sortedPointsData;
  }

  _handleDayClick() {
    this._sortByDay();
    if (this._isSorted()) {
      return;
    }
    this._clearPointList();
    this._renderPoints();
  }

  _handleTimeClick() {
    this._sortByTime();
    if (this._isSorted()) {
      return;
    }
    this._clearPointList();
    this._renderPoints();
  }

  _handlePriceClick() {
    this._sortByPrice();
    if (this._isSorted()) {
      return;
    }
    this._clearPointList();
    this._renderPoints();
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.START);
  }

  _renderPointList() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.END);
    this._renderPoints();
  }

  _renderPoint(pointData) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleChangeData, this._handleChangeMode);
    pointPresenter.init(pointData);
    this._pointPresenter[pointData.id] = pointPresenter;
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

  _handleChangeData(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleChangeMode() {
    Object.values(this._pointPresenter).forEach((value) => {
      value.resetView();
    });
  }
}
