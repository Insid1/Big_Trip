import TripInfo from '../view/trip-info';
import MenuHeader from '../view/menu';
import NewEventButton from '../view/new-event-btn';
import { render, RenderPosition } from '../util/render';


export default class InfoHeader {
  constructor(container, data, filteredData) {
    this._container = container;
    this._data = data;
    this._filteredData = filteredData;
    this._tripInfo = new TripInfo(data);
    this._menu = new MenuHeader(filteredData);
    this._newEventButton = new NewEventButton();
  }

  init() {
    render(this._container, this._newEventButton, RenderPosition.START);
    render(this._container, this._menu, RenderPosition.START);
    render(this._container, this._tripInfo, RenderPosition.START);
  }
}
