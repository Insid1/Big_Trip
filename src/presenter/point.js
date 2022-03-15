import PointView from '../view/trip-point.js';
import EditPointView from '../view/form-edit.js';
import { render, replace } from '../util/render';


export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleEditSubmit = this._handleEditSubmit.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(pointData) {
    this._pointComponent = new PointView(pointData);
    this._pointEditComponent = new EditPointView(pointData);

    this._pointComponent.setClickHandler(this._handlePointClick);
    this._pointEditComponent.setClickHandler(this._handleEditClick);
    this._pointEditComponent.setSubmitHandler(this._handleEditSubmit);

    render(this._pointListContainer, this._pointComponent);
  }

  _replacePointToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._handleEscKeyDown);

  }

  _replaceEditToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._handleEscKeyDown);

  }

  _handlePointClick() {
    this._replacePointToEdit();
  }

  _handleEditClick() {
    this._replaceEditToPoint();

  }

  _handleEditSubmit() {
    this._replaceEditToPoint();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditToPoint();
    }
  }
}
