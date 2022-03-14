import AbstractElement from './abstract-element.js';
import {capitalize} from '../util/common.js';
import {isChecked, isDayExpired} from '../util/point.js';
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

export default class SiteFilter extends AbstractElement{
  constructor(data) {
    super();
    this.data = data;
  }

  getTemplate() {
    return createFilterFormTemplate(this.data);
  }

}

