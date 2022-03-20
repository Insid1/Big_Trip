import { EVENTS, CITIES } from '../const.js';
import { capitalize } from '../util/common';
import Smart from './smart.js';

const createFormEditPointElement = (pointData) => {
  const addOffers = () => {
    const offers = pointData.offers;
    const addOffer = (offer) => {
      const isChecked = () => (offer.checked) ? 'checked': '';
      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name.toLowerCase()}-${offer.id}" type="checkbox" name="event-offer-seats" ${isChecked()}>
        <label class="event__offer-label" for="event-offer-seats-1">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </label>
        </div>`;
    };

    const offersElement = offers.map((element) => addOffer(element));
    return offersElement.join('');

  };
  const addListOfEvents = () => {
    const createEventElement = (eventType) => {
      eventType = eventType.toLowerCase();
      const isChecked = () => (eventType === pointData.event.toLowerCase()) ?
        'checked' : '';
      return `<div class="event__type-item">
        <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}" ${isChecked()}>
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${capitalize(eventType)}</label>
      </div>`;
    };
    const eventList = EVENTS.map((value) => createEventElement(value));
    return eventList.join();
  };
  const addListOfCities = () => {
    const createCity = (city) => `<option value="${city}"></option>`;
    const listOfCities = CITIES.map((cityName) => createCity(cityName));
    return listOfCities.join();
  };
  const addPhotos = () => {
    const createPhoto = (photoLink) => `<img class="event__photo" src="${photoLink}" alt="Event photo">`;
    return pointData
      .photos
      .reduce((acc, photo) => {
        acc += createPhoto(photo);
        return acc;
      }, '');
  };
  const generateIcon = () => {
    const iconMarkup = `<img class="event__type-icon" width="17" height="17" src="img/icons/${pointData.event.toLowerCase()}.png" alt="Event type icon">`;
    return iconMarkup;
  };

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        ${generateIcon()}
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
      <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${addListOfEvents()}
        </fieldset>
        </div>
        </div>
        
        <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${pointData.event}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointData.city}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${addListOfCities()}
        </datalist>
    </div>
    
    <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${pointData.date.format('DD/MM/YY HH:mm')}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${pointData.toTime.format('DD/MM/YY HH:mm')}">
    </div>
    
    <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
        &euro;
        </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${pointData.price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>
      </header>
      <section class="event__details">
      <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      
      <div class="event__available-offers">
      ${addOffers()}
      </div>
    </section>
    
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointData.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${addPhotos()}
        </div>
        </div>
      </section>
  </section>
  </form>
  </li>`;};

export default class EditPoint extends Smart {
  constructor(pointData) {
    super();
    this._pointData = pointData;
    this._clickHandler = this._clickHandler.bind(this);
    this._submitHandler = this._clickHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();
  }

  setClickHandler(cb) {
    this._callback.click = cb;
    this
      .getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click' , this._clickHandler);
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
      .removeEventListener('click', this._clickHandler);
  }

  removeSubmitHandler() {
    this
      .getElement()
      .removeEventListener('submit', this._submitHandler);
  }

  getTemplate() {
    return createFormEditPointElement(this._pointData);
  }

}
