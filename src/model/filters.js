import Observer from '../util/observer';
import dayjs from 'dayjs';
import { FilterType } from '../const';

export default class TripFilters extends Observer {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    this._filteredPoints = null;
    this._currentFilter = FilterType.EVERYTHING;
  }

  getFilteredPoints(filterType = FilterType.EVERYTHING) {
    this._currentFilter = filterType;
    if (this._filteredPoints !== null) {
      return this._filteredPoints[this._currentFilter];
    }
    this._createFilteredPoints();
    return this._filteredPoints[this._currentFilter];
  }

  _createFilteredPoints() {
    const today = dayjs();
    const filteredData = {};
    filteredData.everything = this._pointsModel.getPoints();
    filteredData.future = this._pointsModel
      .getPoints()
      .filter((pointData) => (pointData.fromTime >= today || pointData.toTime >= today));
    filteredData.past = this._pointsModel
      .getPoints()
      .filter((pointData) => pointData.fromTime < today && pointData.toTime < today);
    this._filteredPoints = filteredData;

  }

}
