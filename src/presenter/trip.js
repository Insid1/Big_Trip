import {render, RenderPosition } from '../util/render.js';
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
import { SORT_TYPE } from '../const.js';
import { sortByDate, sortByPrice, sortByTime } from '../util/point.js';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;

    this._tripListComponent = new PointContainerView();
    this._sortingComponent = new SiteSortingView();
    this._noPointsComponent = new NoPointView();
    this._pointPresenter = {};
    this._handleChangeData = this._handleChangeData.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._currentSortType = null;
  }

  init(tripPointsData) {
    this._tripPoints = tripPointsData.slice();
    this._renderTrip();

    this._sortingComponent.setSortClick(this._handleSortClick);

  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _sortBy(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    switch (sortType) {
      case SORT_TYPE.DATE:
        this._tripPoints = this._tripPoints
          .slice()
          .sort(sortByDate);
        break;
      case SORT_TYPE.TIME:
        this._tripPoints = this._tripPoints
          .slice()
          .sort(sortByTime);
        break;
      case SORT_TYPE.PRICE:
        this._tripPoints = this._tripPoints
          .slice()
          .sort(sortByPrice);
        break;
    }

  }

  _handleSortClick(type) {
    if (type === this._currentSortType) {
      return;
    }
    this._renderSortedPoints(type);
  }

  _renderSorting() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.START);
  }

  _renderPointList() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.END);
  }

  _renderPoint(pointData) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleChangeData, this._handleChangeMode);
    pointPresenter.init(pointData);
    this._pointPresenter[pointData.id] = pointPresenter;
  }

  _renderSortedPoints(sortType) {
    this._sortBy(sortType);
    this._clearPointList();
    this._renderPoints();
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
    this._renderSortedPoints(SORT_TYPE.DATE);
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

  _getPoints() {
    return this._pointsModel.getPoints();
  }
}
