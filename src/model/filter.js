import Observer from '../util/observer';
import { FilterType } from '../const';

export default class TripFilters extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filterName) {
    this._activeFilter = filterName;
    this.notify(updateType, filterName);
  }

  getFilter() {
    return this._activeFilter;
  }

}
