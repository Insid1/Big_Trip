import PointView from '../view/trip-point.js';
import EditPointView from '../view/trip-point-edit.js';
import { render, replace, remove } from '../util/render';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._mode = Mode.DEFAULT;

    this._changeData = changeData; // function that updates point in TripPresenter and inits it
    this._changeMode = changeMode; // function that changes all modes to Default

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handlePointClick = this._handlePointClick.bind(this);
    this._handlePointFavoriteClick = this._handlePointFavoriteClick.bind(this);
    this._handleEditDelClick = this._handleEditDelClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleEditSubmit = this._handleEditSubmit.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(pointData) {
    this.pointData = pointData;
    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(pointData);
    this._pointEditComponent = new EditPointView(pointData);

    this._pointComponent.setClickHandler(this._handlePointClick);
    this._pointComponent.setClickFavoriteHandler(this._handlePointFavoriteClick);
    this._pointEditComponent.setClickHandler(this._handleEditClick);
    this._pointEditComponent.setSubmitHandler(this._handleEditSubmit);
    this._pointEditComponent.setClickDelHandler(this._handleEditDelClick);

    if (prevPointComponent === null && prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent);
      return;
    }

    switch (this._mode){
      case (Mode.DEFAULT):
        replace(this._pointComponent, prevPointComponent);
        break;
      case (Mode.EDIT):
        replace(this._pointEditComponent, prevPointEditComponent);
        break;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  _replacePointToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._handleEscKeyDown);
    this._mode = Mode.EDIT;

  }

  _replaceEditToPoint() {
    this._pointEditComponent.reset(this.pointData);
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._handleEscKeyDown);
    this._mode = Mode.DEFAULT;

  }

  _handlePointClick() {
    this._changeMode();
    this._replacePointToEdit();
  }

  _handlePointFavoriteClick() {
    const newPointData = Object.assign({}, this.pointData);
    newPointData.favorite = !newPointData.favorite;
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      newPointData);
  }

  _handleEditClick() {
    this._changeMode();
    this._replaceEditToPoint();

  }

  _handleEditSubmit(newData) {
    this._replaceEditToPoint();
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MAJOR,
      newData);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditToPoint();
    }
  }

  _handleEditDelClick() {
    this._changeData(UserAction.DELETE_POINT, UpdateType.MAJOR, this.pointData);
  }
}
