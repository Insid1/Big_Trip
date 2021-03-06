import EditPointView from '../view/trip-point-edit.js';
import dayjs from 'dayjs';
import { getRandomValueFromArr } from '../util/common.js';
import { render, remove, RenderPosition } from '../util/render';
import { UserAction, UpdateType } from '../const.js';
import { isOnline } from '../util/common.js';
import { OfflineMessage } from '../const.js';
import { toast } from '../util/toast.js';

export const createPointTemplate = (offers, destinations) => {
  const event = getRandomValueFromArr(Object.keys(offers));
  const city = getRandomValueFromArr(Object.keys(destinations));
  return {
    event,
    city,
    fromTime: dayjs(),
    toTime: dayjs(),
    price: 0,
    offers: [],
    favorite: false,
    description: destinations[city].description,
    photos: destinations[city].photos,
  };

};

export default class NewPoint {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;

    this._changeData = changeData; // function that updates point in TripPresenter and inits it

    this._offers = null;
    this._destinations = null;

    this._isRendered = false;
    this._isNewPoint = true;

    this._addPointComponent = null;

    this._handleAddPointDelClick = this._handleAddPointDelClick.bind(this);
    this._handleAddPointClick = this._handleAddPointClick.bind(this);
    this._handleAddPointSubmit = this._handleAddPointSubmit.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(isNoPoints, renderTrip, offers, destinations) {
    this.pointData = createPointTemplate(offers, destinations);
    this._isNoPoints = isNoPoints;
    this._renderTrip = renderTrip;
    this._offers = offers;
    this._destinations = destinations;

    if (this._addPointComponent !== null) {
      this.destroy();
      this._addPointComponent = null;
    }
    this._addPointComponent = new EditPointView(this.pointData, this._offers, this._destinations, this._isNewPoint);

    document.addEventListener('keydown', this._handleEscKeyDown);
    this._addPointComponent.setClickHandler(this._handleAddPointClick);
    this._addPointComponent.setSubmitHandler(this._handleAddPointSubmit);
    this._addPointComponent.setClickDelHandler(this._handleAddPointDelClick);

    render(this._pointListContainer, this._addPointComponent, RenderPosition.START);
    this._isRendered = true;
  }

  destroy() {
    if (this._addPointComponent === null) {
      return;
    }
    document.removeEventListener('keydown', this._handleEscKeyDown);
    remove(this._addPointComponent);
    this._addPointComponent = null;
    this._isRendered = false;
  }

  setSaving() {
    this._addPointComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._addPointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._addPointComponent.shake(resetFormState);
  }

  _handleAddPointClick() {
    this.destroy();
    if (this._isNoPoints) {
      this._renderTrip();
    }
  }

  _handleAddPointSubmit(newData) {
    if (!isOnline()) {
      toast(OfflineMessage.ADD);
      return;
    }

    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      Object.assign({}, newData));
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      if (this._isNoPoints) {
        this._renderTrip();
      }
    }
  }

  _handleAddPointDelClick() {
    this.destroy();
    if (this._isNoPoints) {
      this._renderTrip();
    }
  }
}
