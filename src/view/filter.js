import AbstractElement from './abstract-element';


const addFilters = (filters) => {

  const createFilter = (filter) => `<div class="trip-filters__filter">
  <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.isActive ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type} (${filter.amount})</label>
</div>`;
  const createFilters = () => filters.reduce((acc, filter) => {
    acc += createFilter(filter);
    return acc;
  }, '');

  return `<div class="trip-controls__filters">
  <h2 class="visually-hidden">Filter events</h2>
  <form class="trip-filters" action="#" method="get">
    ${createFilters(filters)}
  </form>
</div>`;
};


export default class Filters extends AbstractElement {
  constructor(filters) {
    super();
    this._callback = {};
    this._filters = filters;

    this._handleFilterClick = this._handleFilterClick.bind(this);
  }

  disable() {
    this.getElement().querySelectorAll('input').forEach((input) => {
      input.disabled = true;
    });
  }

  enable() {
    this.getElement().querySelectorAll('input').forEach((input) => {
      input.disabled = false;
    });
  }

  getTemplate() {
    return addFilters(this._filters);
  }

  setClickFilters(cb) {
    this._callback.filterClick = cb;
    this
      .getElement()
      .querySelector('.trip-filters')
      .addEventListener('click', this._handleFilterClick);
  }

  _handleFilterClick(evt) {
    if (evt.target.tagName !== 'INPUT'){
      return;
    }
    this._callback.filterClick(evt.target.value);
  }
}
