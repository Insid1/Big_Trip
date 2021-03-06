import Info from '../view/trip-info';
import { render, remove, RenderPosition } from '../util/render';
import { UpdateType } from '../const';
import {sortByDate} from '../util/point.js';


export default class TripInfo {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._tripInfo = null;

    this._isLoading = true;

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._tripInfo = new Info(this._pointsModel.getPoints().slice().sort(sortByDate));
    this._renderInfo();

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MAJOR:
        this._clearInfo();
        this.init();
        this._renderInfo();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this.init();
        this._renderInfo();
        break;
    }
  }

  _renderInfo() {
    if (this._isLoading) {
      return;
    }
    render(this._container, this._tripInfo, RenderPosition.START);
  }

  _clearInfo() {
    remove(this._tripInfo);
    this._pointsModel.removeObservers(this._handleModelEvent);
  }
}
