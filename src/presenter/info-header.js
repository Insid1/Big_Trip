import TripInfo from '../view/trip-info';
import MenuHeader from '../view/menu';
import NewEventButton from '../view/new-event-btn';
import { render, RenderPosition } from '../util/render';
import { FilterType } from '../const';
import {filter} from '../util/filter.js';


export default class InfoHeader {
  constructor(container, pointsModel, filterModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._newEventButton = new NewEventButton();

    // this._handleFilterClick = this._handleFilterClick.bind(this);
    // this._handleModelEvent = this._handleModelEvent.bind(this);
    // this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._tripInfo = new TripInfo(this._pointsModel.getPoints());
    this._menu = new MenuHeader(this.getFilters());

    // this._menu.setClickFilters(this._handleFilterClick);
    this._renderHeader();
  }

  setFilteredPoints(filteredPoints) {
    this._filteredPoints = filteredPoints;
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

  _renderHeader() {
    render(this._container, this._newEventButton, RenderPosition.START);
    render(this._container, this._menu, RenderPosition.START);
    render(this._container, this._tripInfo, RenderPosition.START);
  }
}
