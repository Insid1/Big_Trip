import AbstractElement from './abstract-element';

const createFilter = (filter) => `<div class="trip-filters__filter">
    <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.isActive ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type} (${filter.amount})</label>
  </div>`;
const createFilters = (filters) => filters.reduce((acc, filter) => {
  acc += createFilter(filter);
  return acc;
}, '');

const createMenu = (filters) => `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  </div>

  <div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${createFilters(filters)}
    </form>
  </div>
</div>`;

export default class MenuHeader extends AbstractElement {
  constructor(filters) {
    super();
    this._callback = {};
    this._filters = filters;

    this._handleFilterClick = this._handleFilterClick.bind(this);
  }

  getTemplate() {
    return createMenu(this._filters);
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
