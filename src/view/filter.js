import { createElement, capitalize, isDayExpired, isChecked } from '../util';
const createFilterFormTemplate = (data) => {
  const createFilterData = () => {
    let numOfFuturePoints = 0;
    let numOfPastPoints = 0;
    data.forEach((value) => {
      if (isDayExpired(value.date)) {
        numOfPastPoints += 1;
      } else {
        numOfFuturePoints += 1;
      }
    });
    const filterInfo = [
      {
        name: 'everything',
        amount: data.length,
        active: true,
      },
      {
        name: 'future',
        amount: numOfFuturePoints,
        active: false,
      },
      {
        name: 'past',
        amount: numOfPastPoints,
        active: false,
      },
    ];
    return filterInfo;
  };
  const filteredData = createFilterData();
  const createFilterTemplate = (name, amount, flag = true) => `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked(flag)} >
    <label class="trip-filters__filter-label" for="filter-${name}">${capitalize(name)} (${amount})</label>
  </div>`;
  const createFilters = () => filteredData.map(({name, amount, active}) => createFilterTemplate(name, amount, active)).join('');

  return `<form class="trip-filters" action="#" method="get">
  ${createFilters()} </form>
`;};

export default class SiteFilter {
  constructor(data) {
    this.data = data;
    this._element = null;
  }

  getTemplate() {
    return createFilterFormTemplate(this.data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

