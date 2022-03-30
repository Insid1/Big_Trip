import StatisticView from '../view/statistic.js';
import { UpdateType } from '../const';
import { render, RenderPosition, remove } from '../util/render.js';

export default class TripStatistic {
  constructor(statisticContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._statisticContainer = statisticContainer;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this.createStatistic();
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.createStatistic();
        break;
      case UpdateType.INIT:
        this.createStatistic();
        break;
    }
  }

  createStatistic() {
    if (this._statisticView) {
      remove(this._statisticView);
    }
    this._statisticView = new StatisticView(this._pointsModel.getPoints());
    render(this._statisticContainer, this._statisticView, RenderPosition.END);
    this._statisticView.hide();
  }

  hide() {
    this._statisticView.hide();
  }

  show() {
    this._statisticView.show();
  }
}
