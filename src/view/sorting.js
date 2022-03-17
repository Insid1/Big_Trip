import AbstractElement from './abstract-element';

const createSiteSortingTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;

export default class SiteSorting extends AbstractElement{
  constructor() {
    super();
    this._callback = {};
    this._dayClickHandler = this._dayClickHandler.bind(this);
    this._timeClickHandler = this._timeClickHandler.bind(this);
    this._priceClickHandler = this._priceClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteSortingTemplate();
  }

  setDayClick(cb) {
    this._callback.dayClick = cb;
    this.getElement()
      .querySelector('#sort-day')
      .addEventListener('click', this._dayClickHandler);
  }

  setTimeClick(cb) {
    this._callback.timeClick = cb;
    this.getElement()
      .querySelector('#sort-time')
      .addEventListener('click', this._timeClickHandler);
  }

  setPriceClick(cb) {
    this._callback.priceClick = cb;
    this.getElement()
      .querySelector('#sort-price')
      .addEventListener('click', this._priceClickHandler);
  }

  _dayClickHandler() {
    this._callback.dayClick();
  }

  _timeClickHandler() {
    this._callback.timeClick();
  }

  _priceClickHandler() {
    this._callback.priceClick();
  }

}
