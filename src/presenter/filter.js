import TripStatisticPresenter from './statistic';
import Filters from '../view/filter';
import { render, remove, RenderPosition } from '../util/render';
import { FilterType, UserAction, UpdateType } from '../const';
import {filter} from '../util/filter.js';


export default class TripFilter {
  constructor(container, pointsModel, filterModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._filters = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterClick = this._handleFilterClick.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);

  }

  init() {
    this._filters = new Filters(this.getFilters());

    this._tripStatisticPresenter = new TripStatisticPresenter(this._pointsModel);

    this._filters.setClickFilters(this._handleFilterClick);

    this._renderFilters();
  }

  getFilters() {
    const points = this._pointsModel.getPoints();
    const currFilter = this._filterModel.getFilter();
    return [
      {
        type: FilterType.EVERYTHING,
        amount: filter[FilterType.EVERYTHING](points).length,
        isActive: (currFilter === FilterType.EVERYTHING),
      },
      {
        type: FilterType.FUTURE,
        amount: filter[FilterType.FUTURE](points).length,
        isActive: (currFilter === FilterType.FUTURE),
      },
      {
        type: FilterType.PAST,
        amount: filter[FilterType.PAST](points).length,
        isActive: (currFilter === FilterType.PAST),

      }
    ];
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
      case UserAction.SELECT_FILTER:
        this._filterModel.setFilter(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MAJOR:
        this._clearFilters();
        this.init();
        this._renderFilters();
        break;
    }
  }

  _handleFilterClick(filterName) {
    this._handleViewAction(UserAction.SELECT_FILTER, UpdateType.MINOR, filterName);
  }

  _renderFilters() {
    render(this._container, this._filters, RenderPosition.END);
  }

  _clearFilters() {
    remove(this._filters);
  }
}
