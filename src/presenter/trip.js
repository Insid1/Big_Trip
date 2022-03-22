import {render, RenderPosition } from '../util/render.js';
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
import { SORT_TYPE, UserAction, UpdateType } from '../const.js';
import { sortByDate, sortByPrice, sortByTime } from '../util/point.js';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;

    this._tripListComponent = new PointContainerView();
    this._noPointsComponent = new NoPointView();
    this._sortingComponent = null;
    this._pointPresenter = {};

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._currentSortType = SORT_TYPE.DATE;

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SORT_TYPE.DATE:
        return this._pointsModel
          .getPoints()
          .slice()
          .sort(sortByDate);
      case SORT_TYPE.PRICE:
        return this._pointsModel
          .getPoints()
          .slice()
          .sort(sortByPrice);
      case SORT_TYPE.TIME:
        return this._pointsModel
          .getPoints()
          .slice()
          .sort(sortByTime);
    }
    return this._pointsModel.getPoints();
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearTrip() {
    // Добавить удаление всех элементов Trip включая сортировку
    // и сбросить текущий показатель сортировки
  }

  _handleSortClick(sortType) {

    if (sortType === this._currentSortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearPointList();
    this._renderPoints();
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
        this._clearPointList();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip(); // not implemented
        break;
    }
  }

  _handleChangeMode() {
    Object.values(this._pointPresenter).forEach((value) => {
      value.resetView();
    });
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
    render(this._tripContainer, this._noPointsComponent);
  }

  _renderTrip() {
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
    }
    this._renderSorting();
    this._renderPointList();
    this._renderPoints();
  }

}
