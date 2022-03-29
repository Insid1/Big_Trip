import AbstractElement from './abstract-element.js';
import { getDuration, formatDuration } from '../util/point.js';

const createTripPoint = (pointData) => {
  const createIconLink = () => `img/icons/${pointData.event.toLowerCase()}.png`;
  const createFavorites = () => {
    let activeClass = '';
    if (pointData.favorite) {
      activeClass = 'event__favorite-btn--active';
    }
    return `<button class="event__favorite-btn ${activeClass}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`;
  };
  const addSelectedOffers = () => {
    const offers = pointData.offers;
    return offers.reduce((acc, offer) => {
      acc += `<li class="event__offer">
  <span class="event__offer-title">${offer.name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`;
      return acc;
    }, '');
  };
  const generateDuration = () => {
    const period =  getDuration(pointData.fromTime, pointData.toTime);
    return formatDuration(period);
  };

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${pointData.fromTime.format('YYYY-MM-DD')}">${pointData.fromTime.format('MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${createIconLink()}" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointData.event} ${pointData.city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${pointData.fromTime.format('YYYY-MM-DDTHH:MM')}">${pointData.fromTime.format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${pointData.toTime.format('YYYY-MM-DDTHH:MM')}">${pointData.toTime.format('HH:mm')}</time>
        </p>
        <p class="event__duration">${generateDuration()}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${pointData.price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${addSelectedOffers()}
      </ul>
      ${createFavorites()}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractElement{
  constructor(pointData) {
    super();
    this._pointData = pointData;
    this._clickHandler = this._clickHandler.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);
  }

  _clickHandler(evt) { // save callback for handler
    evt.preventDefault();
    this._callback.click();
  }

  _clickFavoriteHandler(evt) { // save callback for handler
    evt.preventDefault();
    this._callback.clickFavorite();
  }

  setClickHandler(cb) {
    this._callback.click = cb;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click',this._clickHandler);
  }

  setClickFavoriteHandler(cb) {
    this._callback.clickFavorite = cb;
    this.getElement()
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this._clickFavoriteHandler);
  }

  removeClickHandler() {
    this.getElement()
      .querySelector('.event__rollup-btn')
      .removeEventListener('click', this._clickHandler);
  }

  removeClickFavoriteHandler() {
    this
      .getElement()
      .querySelector('.event__favorite-btn')
      .removeEventListener('click', this._clickFavoriteHandler);
  }

  getTemplate() {
    return createTripPoint(this._pointData);
  }

}
