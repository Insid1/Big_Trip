import EditPointView from '../view/trip-point-edit.js';
import { render, remove, RenderPosition } from '../util/render';
import { UserAction, UpdateType } from '../const.js';

export default class NewPoint {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;

    this._changeData = changeData; // function that updates point in TripPresenter and inits it

    this._addPointComponent = null;

    this._handleAddPointDelClick = this._handleAddPointDelClick.bind(this);
    this._handleAddPointClick = this._handleAddPointClick.bind(this);
    this._handleAddPointSubmit = this._handleAddPointSubmit.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(pointData) {
    this.pointData = pointData;
    if (this._addPointComponent !== null) {
      this.destroy();
      this._addPointComponent = null;
    }
    this._addPointComponent = new EditPointView(pointData);

    document.addEventListener('keydown', this._handleEscKeyDown);
    this._addPointComponent.setClickHandler(this._handleAddPointClick);
    this._addPointComponent.setSubmitHandler(this._handleAddPointSubmit);
    this._addPointComponent.setClickDelHandler(this._handleAddPointDelClick);

    render(this._pointListContainer, this._addPointComponent, RenderPosition.START);

  }

  destroy() {
    if (this._addPointComponent === null) {
      return;
    }
    document.removeEventListener('keydown', this._handleEscKeyDown);
    remove(this._addPointComponent);
    this._addPointComponent = null;
  }

  _handleAddPointClick() {
    this.destroy();
  }

  _handleAddPointSubmit(newData) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      Object.assign({}, newData));
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleAddPointDelClick() {
    this.destroy();
  }
}
