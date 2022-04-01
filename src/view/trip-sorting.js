import AbstractElement from './abstract-element';
import { SortType } from '../const';

const createSiteSortingTemplate = (sortType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" data-sort-type="${SortType.DATE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${sortType === SortType.DATE ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" data-sort-type="${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${sortType === SortType.TIME ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" data-sort-type="${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${sortType === SortType.PRICE ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;

export default class SiteSorting extends AbstractElement{
  constructor(sortType) {
    super();
    this._sortType = sortType;
    this._callback = {};
    this._sortClickHandler = this._sortClickHandler.bind(this);
  }


  getTemplate() {
    return createSiteSortingTemplate(this._sortType);
  }

  setSortClick(cb) {
    this._callback.sortClick = cb;
    this.getElement().addEventListener('click', this._sortClickHandler);
  }

  _sortClickHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.sortClick(evt.target.dataset.sortType);
  }


}
