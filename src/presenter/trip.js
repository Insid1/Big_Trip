import SiteSortingView from '../view/trip-sorting.js';
import PointContainerView  from '../view/trip-point-container';
import NoPointView from '../view/trip-no-point.js';
import PointPresenter from './point.js';
import NewPointPresenter from './new-point';
import {remove, render, RenderPosition } from '../util/render.js';
import { SORT_TYPE, UserAction, UpdateType } from '../const.js';
import { sortByDate, sortByPrice, sortByTime } from '../util/point.js';
import { createPointTemplate } from '../util/blank-point.js';
import { filter } from '../util/filter.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._tripListComponent = new PointContainerView();
    this._noPointsComponent = null;
    this._sortingComponent = null;
    this._pointPresenter = {};

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleNewEventButtonClick = this._handleNewEventButtonClick.bind(this);
    this._renderTrip = this._renderTrip.bind(this);
    this._currentSortType = SORT_TYPE.DATE;

    this._newPointComponent = new NewPointPresenter(this._tripListComponent, this._handleViewAction);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {

    this._currentFilter = this._filterModel.getFilter();
    this._filteredPoints = filter[this._currentFilter](this._pointsModel.getPoints());

    switch (this._currentSortType) {
      case SORT_TYPE.DATE:
        return this._filteredPoints
          .slice()
          .sort(sortByDate);
      case SORT_TYPE.PRICE:
        return this._filteredPoints
          .slice()
          .sort(sortByPrice);
      case SORT_TYPE.TIME:
        return this._filteredPoints
          .slice()
          .sort(sortByTime);
    }
    return this._pointsModel.getPoints();
  }

  _clearTrip() {

    if (this._noPointsComponent !== null) {
      remove(this._noPointsComponent);
      this._noPointsComponent = null;
      return;
    }

    remove(this._sortingComponent);
    remove(this._tripListComponent);
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handleSortClick(sortType) {

    if (sortType === this._currentSortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.UPDATE_POINT:
        // console.log(this._pointPresenter);
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[update.id].init(update);
        break;
      case UpdateType.MINOR:
        this._newPointComponent.destroy();
        this._clearTrip();
        this._currentSortType = SORT_TYPE.DATE;
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._newPointComponent.destroy();

        this._clearTrip();
        this._currentSortType = SORT_TYPE.DATE;
        this._renderTrip();
        break;
    }
  }

  _handleChangeMode() {
    // this._newPointComponent.destroy();

    Object.values(this._pointPresenter).forEach((value) => {
      value.resetView();
    });
  }

  _handleNewEventButtonClick() {
    if (this.isNoPoints()) {
      this._renderPointList();
      remove(this._noPointsComponent);
    }
    this._handleChangeMode();
    this._newPointComponent.init(createPointTemplate(), this.isNoPoints(), this._renderTrip);
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SiteSortingView(this._currentSortType);
    this._sortingComponent.setSortClick(this._handleSortClick);
    render(this._tripContainer, this._sortingComponent, RenderPosition.START);
  }

  _renderPointList() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.END);
  }

  _renderPoint(pointData) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleViewAction, this._handleChangeMode);
    pointPresenter.init(pointData);
    this._pointPresenter[pointData.id] = pointPresenter;
  }

  _renderPoints() {
    this._getPoints().forEach((element) => {
      this._renderPoint(element);
    });

  }

  _renderNoPoints() {
    this._noPointsComponent = new NoPointView();
    render(this._tripContainer, this._noPointsComponent);
  }

  _renderTrip() {
    if (this.isNoPoints()) {
      this._renderNoPoints();
      return;
    }
    this._renderSorting();
    this._renderPointList();
    this._renderPoints();
  }

  hideTrip() {
    this._sortingComponent.hide();
    this._tripListComponent.hide();
  }

  showTrip() {
    this._sortingComponent.show();
    this._tripListComponent.show();
  }

  isNoPoints() {
    return this._getPoints().length === 0;
  }

}
