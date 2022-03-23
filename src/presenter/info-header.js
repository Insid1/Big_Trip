import TripInfo from '../view/trip-info';
import MenuHeader from '../view/menu';
import { render, RenderPosition } from '../util/render';


export default class InfoHeader {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._tripInfo = new TripInfo();
    this._menu = new MenuHeader();
  }

  init() {
    render(this._container, this._menu, RenderPosition.START);
    render(this._container, this._tripInfo, RenderPosition.START);
    // render all components
  }
}
