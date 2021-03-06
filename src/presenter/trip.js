import SortingView from '../view/trip-sorting.js';
import PointContainerView  from '../view/trip-point-container';
import NoPointView from '../view/trip-no-point.js';
import LoadingView from '../view/loading.js';
import PointPresenter, {State as PointPresenterViewState} from './point.js';
import NewPointPresenter from './new-point';
import {remove, render, RenderPosition } from '../util/render.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { sortByDate, sortByPrice, sortByTime } from '../util/point.js';
import { filter } from '../util/filter.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, offersModel, destinationsModel, api) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripListComponent = new PointContainerView();
    this._newPointComponent = new NewPointPresenter(this._tripListComponent, this._handleViewAction);
    this._loadingComponent = new LoadingView();
    this._noPointsComponent = null;
    this._sortingComponent = null;

    this._pointPresenter = {};
    this._isLoading = true;
    this._isLoadingOffers = true;
    this._isLoadingDestinations = true;

    this._offers = null;
    this._destinations = null;

    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleSortClick = this._handleSortClick.bind(this);
    this._handleNewEventButtonClick = this._handleNewEventButtonClick.bind(this);
    this._renderTrip = this._renderTrip.bind(this); // to send it to newPointPresenter
    this._currentSortType = SortType.DATE;

  }

  init() {
    this._renderTrip();
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);
  }

  hide() {
    this._sortingComponent.hide();
    this._tripListComponent.hide();
  }

  show() {
    this._sortingComponent.show();
    this._tripListComponent.show();
  }

  isNoPoints() {
    return this._getPoints().length === 0;
  }

  _getPoints() {

    this._currentFilter = this._filterModel.getFilter();
    this._filteredPoints = filter[this._currentFilter](this._pointsModel.getPoints());

    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filteredPoints
          .slice()
          .sort(sortByDate);
      case SortType.PRICE:
        return this._filteredPoints
          .slice()
          .sort(sortByPrice);
      case SortType.TIME:
        return this._filteredPoints
          .slice()
          .sort(sortByTime);
    }
    return this._pointsModel.getPoints();
  }

  _clearTrip() {

    if (this._noPointsComponent !== null) {
      remove(this._tripListComponent);
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
        this._newPointComponent.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._newPointComponent.setAborting();
          });
        break;
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.removePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[update.id].init(update);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._currentSortType = SortType.DATE;
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip();
        this._currentSortType = SortType.DATE;
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._renderTrip();
        break;
      case UpdateType.INIT_OFFERS:
        this._isLoadingOffers = false;
        this._offers = this._offersModel.getOffers();
        this._renderTrip();
        break;
      case UpdateType.INIT_DESTINATIONS:
        this._isLoadingDestinations = false;
        this._destinations = this._destinationsModel.getDestinations();
        this._renderTrip();
        break;
    }
  }

  _handleChangeMode() {
    if (this._newPointComponent._isRendered) {
      this._newPointComponent.destroy();
    }

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
    this._newPointComponent.init(this.isNoPoints(), this._renderTrip, this._offers, this._destinations);
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortClick(this._handleSortClick);
    render(this._tripContainer, this._sortingComponent, RenderPosition.START);
  }

  _renderPointList() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.END);
  }

  _renderPoint(pointData) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleViewAction, this._handleChangeMode, this._offers, this._destinations);
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
    if (this._isLoading || this._isLoadingOffers || this._isLoadingDestinations) {
      render(this._tripContainer, this._loadingComponent);
      return;
    }
    remove(this._loadingComponent);
    if (this.isNoPoints()) {
      this._renderNoPoints();
      return;
    }
    this._renderSorting();
    this._renderPointList();
    this._renderPoints();
  }
}
