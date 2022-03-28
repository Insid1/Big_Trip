import Info from '../view/trip-info';
import { render, remove, RenderPosition } from '../util/render';
import { UpdateType } from '../const';
import {sortByDate} from '../util/point.js';


export default class TripInfo {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._tripInfo = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._tripInfo = new Info(this._pointsModel.getPoints().slice().sort(sortByDate));
    this._renderHeader();

    // this._tripStatisticPresenter = new TripStatisticPresenter(this._pointsModel);

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

  // _handleTableClick() {
  //   this._tripStatisticPresenter.hide();
  // }

  _renderHeader() {
    render(this._container, this._tripInfo, RenderPosition.START);
  }

  _clearHeader() {
    remove(this._tripInfo);
  }
}
