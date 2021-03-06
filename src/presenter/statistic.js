import StatisticView from '../view/statistic.js';
import { UpdateType } from '../const';
import { render, RenderPosition, remove } from '../util/render.js';

export default class TripStatistic {
  constructor(statisticContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._statisticContainer = statisticContainer;
    this._isLoading = true;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this.createStatistic();
  }

  createStatistic() {
    if (this._isLoading) {
      return;
    }

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

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.createStatistic();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this.createStatistic();
        break;
    }
  }
}
