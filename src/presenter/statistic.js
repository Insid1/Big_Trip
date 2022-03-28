import StatisticView from '../view/statistic';
import { UpdateType } from '../const';

export default class TripStatistic {
  constructor(pointsModel) {
    this._pointsModel = pointsModel;

    this._statisticView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.createStatistic();
    }
  }

  createStatistic() {
    this._statisticView = new StatisticView(this._pointsModel.getPoints());
  }

  hide() {
    this._statisticView.hide();
  }

  show() {
    this._statisticView.show();
  }
}
