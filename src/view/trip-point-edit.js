import { capitalize} from '../util/common';
import Smart from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
const DATE_FORMAT = 'd/m/y H:i';

const addIcon = (event) => {
  const iconMarkup = `<img class="event__type-icon" width="17" height="17" src="img/icons/${event.toLowerCase()}.png" alt="Event type icon">`;
  return iconMarkup;
};

const addListOfEvents = (event, eventList) => {

  const addEventElement = (eventType) => {
    eventType = eventType.toLowerCase();
    const isChecked = () => (eventType === event.toLowerCase()) ?
      'checked' : '';
    return `<div class="event__type-item">
      <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${isChecked()}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${capitalize(eventType)}</label>
    </div>`;
  };
  const events = eventList.map((value) => addEventElement(value));
  return events.join('');
};

const addListOfCities = (cities) => {
  const createCity = (cityName) => `<option value="${cityName}"></option>`;
  const listOfCities = cities.map((cityName) => createCity(cityName));
  return listOfCities.join('');
};
const addPointEditHeader = (event, city, fromTime, toTime, price, destinationsData, offersData, isDisabled, isSaving, isDeleting, isNew) => {
  const chooseSaveOrAdd = () => {
    if (isSaving && isNew) {
      return 'Adding...';
    }
    if (isSaving) {
      return 'Saving...';
    }
    if (isNew) {
      return 'Add';
    }
    return 'Save';
  };
  const chooseDeleteOrCancel = () => {
    if (isNew) {
      return 'Cancel';
    }
    if (isDeleting) {
      return 'Deleting';
    }
    return 'Delete';
  };
  return `<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      ${addIcon(event)}
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled': ''}>

    <div class="event__type-list">
      <fieldset class="event__type-group"> 
        <legend class="visually-hidden">Event type</legend>
        ${addListOfEvents(event, Object.keys(offersData))}
      </fieldset>
    </div>
  </div>
      
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${event}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1" required ${isDisabled ? 'disabled': ''}>
    <datalist id="destination-list-1">
      ${addListOfCities(Object.keys(destinationsData))}
    </datalist>
  </div>
  
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${fromTime.format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled': ''}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${toTime.format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled': ''}>
  </div>
  
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="number" required min="0" name="event-price" value="${price}" ${isDisabled ? 'disabled': ''}>
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled': ''}>${chooseSaveOrAdd()}</button>
  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled': ''}>${chooseDeleteOrCancel()}</button>
  <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled': ''}>
    <span class="visually-hidden">Open event</span>
  </button>
</header>`;
};

const addPhotos = (photos) => {
  if (!photos) {return '';}
  const createPhoto = (photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`;

  const photoElements = photos
    .reduce((acc, photo) => {
      acc += createPhoto(photo);
      return acc;
    }, '');

  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${photoElements}
  </div>
  </div>
  `;
};

const addDescription = (description) => {
  if (!description) {return '';}
  return `<p class="event__destination-description">${description}</p>`;
};

const addOffers = (totalOffers, pointOffers, isDisabled) => {
  const addOffer = (offer) => {
    const isChecked = () => pointOffers.some((pointOffer) => pointOffer.name === offer.name) ? 'checked' : '';
    return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}" data-price="${offer.price}" value="${offer.name}" type="checkbox" name="event-offer-${offer.name}" ${isChecked()} ${isDisabled ? 'disabled': ''}>
        <label class="event__offer-label" for="event-offer-${offer.name}">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </label>
        </div>`;
  };
  const offersElement = totalOffers.map(addOffer);
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${offersElement.join('')}
  </div>
</section>`;
};

const createPointEditDetailsDestination = (photos, description) => {
  if (!photos && !description) {
    return '';
  }

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  ${description !== null ? addDescription(description) : ''}
  ${description !== null ? addPhotos(photos) : ''}
</section>`;
};

const addPointEditDetails = (offers, photos, description, event, offersData, isDisabled) => {
  const exactOffers = offersData[event];
  return `<section class="event__details">
  ${exactOffers.length !== 0 ? addOffers(exactOffers, offers, isDisabled) : ''}
  ${createPointEditDetailsDestination(photos, description)}
</section>`;};

const addPointEdit = (pointData, offersData, destinationsData, isNew) => {
  const {event, city,
    fromTime, toTime,
    price, offers,
    description, photos,
    isDisabled, isSaving,
    isDeleting} = pointData;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${addPointEditHeader(event, city,fromTime, toTime, price, destinationsData, offersData, isDisabled, isSaving, isDeleting, isNew)}
      ${addPointEditDetails(offers, photos, description, event, offersData, isDisabled)}
    </form>
  </li>`;
};


export default class EditPoint extends Smart {
  constructor(pointData, offersData, destinationsData, isNewPoint) {
    super();
    this._pointState = EditPoint.parseDataToState(pointData);
    this._offersData = offersData;
    this._destinationsData = destinationsData;

    this._datePickerFromTime = null;
    this._datePickerToTime = null;
    this.isNewPoint = Boolean(isNewPoint);

    this._clickPointerHandler = this._clickPointerHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._clickDelHandler = this._clickDelHandler.bind(this);
    this._clickEventsHandler = this._clickEventsHandler.bind(this);
    this._changeCityHandler = this._changeCityHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);
    this._clickPointerHandler = this._clickPointerHandler.bind(this);
    this._changeFromTimeHandler = this._changeFromTimeHandler.bind(this);
    this._changeToTimeHandler = this._changeToTimeHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);

    this._callback.clickEvents = this._clickEventsHandler;
    this._setInnerHandlers();
    this._setDatePickerFromTime();
    this._setDatePickerToTime();

  }

  setClickDelHandler(cb) {
    this._callback.clickDel = cb;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._clickDelHandler);
  }

  setClickHandler(cb) {
    this._callback.clickPointer = cb;
    this
      .getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click' , this._clickPointerHandler);

  }

  setSubmitHandler(cb) {
    this._callback.submit = cb;
    this.getElement()
      .addEventListener('submit', this._submitHandler);
  }

  removeClickHandler() {
    this
      .getElement()
      .querySelector('.event__rollup-btn')
      .removeEventListener('click', this._clickPointerHandler);
  }

  removeSubmitHandler() {
    this
      .getElement()
      .removeEventListener('submit', this._submitHandler);
  }

  getTemplate() {
    return addPointEdit(this._pointState, this._offersData, this._destinationsData, this.isNewPoint);
  }

  reset(oldData) {
    this.updateData(EditPoint.pasrseStateToData(oldData));
  }

  restoreHandlers() {
    this.setClickHandler(this._callback.clickPointer);
    this.setSubmitHandler(this._callback.submit);
    this.setClickDelHandler(this._callback.clickDel);
    this._setInnerHandlers();
    this._setDatePickerFromTime();
    this._setDatePickerToTime();
  }

  _clickEventsHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    const newEvent = evt.target.value;
    this.updateData({
      event: newEvent,
      offers: [],
    });
  }

  _changeCityHandler(evt) {
    const newCity = evt.target.value;
    if (Object.keys(this._destinationsData).includes(newCity)) {
      evt.preventDefault();
      evt.target.setCustomValidity('');
      this.updateData({
        city: newCity,
        description: this._destinationsData[newCity].description,
        photos: this._destinationsData[newCity].photos,
      });
    } else {
      evt.target.setCustomValidity('Enter city from List');
    }
    evt.target.reportValidity();
  }

  _changePriceHandler(evt) {
    const price = +evt.target.value;
    if (price < 1) {
      evt.target.setCustomValidity('Enter a number bigger than one');
    } else {
      evt.target.setCustomValidity('');
      evt.preventDefault();
      this.updateData({
        price: price,
      }, true);
    }
    evt.target.reportValidity();
  }

  _changeOffersHandler(evt) {
    evt.preventDefault();

    const currentOffersCopy = JSON.parse(JSON.stringify(this._pointState.offers)); // deep copy
    const index = currentOffersCopy.findIndex((offer) => offer.name === evt.target.value);

    if (index === -1) {
      currentOffersCopy.push({
        name: evt.target.value,
        price: +evt.target.dataset.price,
      });
    } else {
      currentOffersCopy.splice(index, 1);
    }
    this.updateData({
      offers: currentOffersCopy
    }, true);

  }

  _clickPointerHandler(evt) {
    evt.preventDefault();
    this._callback.clickPointer();
  }

  _changeFromTimeHandler([userDate]) {
    this.updateData({
      fromTime: dayjs(userDate),
    }, true);
  }

  _changeToTimeHandler([userDate]) {
    this.updateData({
      toTime: dayjs(userDate),
    }, true);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(EditPoint.pasrseStateToData(this._pointState));
  }

  _clickDelHandler() {
    this._callback.clickDel();
  }

  _setDatePickerFromTime() {
    if (this._datePickerFromTime) {
      this._datePickerFromTime.destroy();
      this._datePickerFromTime = null;
    }

    this._datePickerFromTime = flatpickr(this.getElement()
      .querySelector('#event-start-time-1'), {
      dateFormat: DATE_FORMAT,
      enableTime: true,
      defaultDate: this._pointState.date,
      onChange: this._changeFromTimeHandler,
      'time_24hr': true,
    });
  }

  _setDatePickerToTime() {
    if (this._datePickerToTime) {
      this._datePickerToTime.destroy();
      this._datePickerToTime = null;
    }

    this._datePickerToTime = flatpickr(this.getElement()
      .querySelector('#event-end-time-1'), {
      dateFormat: DATE_FORMAT,
      enableTime: true,
      defaultDate: this._pointState.date,
      onChange: this._changeToTimeHandler,
      'time_24hr': true,
    });
  }

  _setInnerHandlers() {
    const currElement = this.getElement();
    currElement
      .querySelector('.event__type-group')
      .addEventListener('click', this._clickEventsHandler);

    currElement
      .querySelector('#event-destination-1')
      .addEventListener('change', this._changeCityHandler);

    currElement
      .querySelector('.event__input--price')
      .addEventListener('change', this._changePriceHandler);

    if (currElement.querySelector('.event__available-offers')) {
      currElement
        .querySelector('.event__available-offers')
        .addEventListener('change', this._changeOffersHandler);
    }
  }

  static parseDataToState(state) {
    return Object.assign(
      {},
      state,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
  }

  static pasrseStateToData(data) {
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return Object.assign({},
      data);
  }
}
