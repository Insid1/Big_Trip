import TripStatisticPresenter from './statistic';
import TripInfo from '../view/trip-info';
import MenuHeader from '../view/menu';
import { render, remove, RenderPosition } from '../util/render';
import { FilterType, UserAction, UpdateType } from '../const';
import {filter} from '../util/filter.js';
import {sortByDate} from '../util/point.js';


export default class InfoHeader {
  constructor(container, pointsModel, filterModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._tripInfo = null;
    this._menu = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterClick = this._handleFilterClick.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._pointsModel.addObserver(this._handleModelEvent);

  }

  init() {
    this._tripInfo = new TripInfo(this._pointsModel.getPoints().slice().sort(sortByDate));
    this._menu = new MenuHeader(this.getFilters());

    this._tripStatisticPresenter = new TripStatisticPresenter(this._pointsModel);

    this._menu.setClickFilters(this._handleFilterClick);

    this._renderHeader();
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
      case UpdateType.PATCH:
        // not implemented. Has nothing to do with filters. But with menu ?
        break;
      case UpdateType.MINOR:
        // not implemented. Has nothing to do with filters. But with menu ?
        break;
      case UpdateType.MAJOR:
        this._clearHeader();
        this.init();
        this._renderHeader();
        break;
    }
  }

  _handleTableClick() {
    this._tripStatisticPresenter.hide();
  }

  _handleFilterClick(filterName) {
    this._handleViewAction(UserAction.SELECT_FILTER, UpdateType.MINOR, filterName);
  }

  _renderHeader() {

    render(this._container, this._menu, RenderPosition.START);
    render(this._container, this._tripInfo, RenderPosition.START);
  }

  _clearHeader() {
    remove(this._tripInfo);
    remove(this._menu);
  }
}
