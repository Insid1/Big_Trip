import AbstractElement from './abstract-element';
import { createChart } from '../util/chart';
import { ChartType } from '../const';
// import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.register(ChartDataLabels, LinearScale, BarController, BarElement, CategoryScale, Title);
// Chart.defaults.font.family = 'Montserrat';


const createStatistic = (pointsData) => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
  </div>
</section>`;

export default class Statistic extends AbstractElement {
  constructor(pointsData) {
    super();
    this._pointsData = pointsData;
    this.createCharts();
  }

  getTemplate() {
    return createStatistic(this._pointsData);
  }

  createCharts() {
    const chartElement = this.getElement();
    const moneyCtx = chartElement.querySelector('#money');
    const timeCtx = chartElement.querySelector('#time-spend');
    const typeCtx = chartElement.querySelector('#type');

    const createChartData = () => {
      const data = {};
      this._pointsData.forEach((value) => {
        // runs through object and if such event exist adds its values to such key otherwise creates key and assigns value
        const currEvent = value.event.toUpperCase();
        if (data[value.event]) {
          data[currEvent].totalPrice += value.price;
          data[currEvent].period += value.toTime - value.fromTime;
          data[currEvent].amount += 1;
        } else {
          data[currEvent] = {
            totalPrice: value.price,
            period: value.toTime - value.fromTime,
            amount: 1,
          };
        }
      });
      return data;
    };
    const chartData = createChartData();

    const labels = Object.keys(chartData);
    const prices = Object.values(chartData).map(({totalPrice}) => totalPrice);
    const periods = Object.values(chartData).map(({period}) => period);
    const amounts = Object.values(chartData).map(({amount}) => amount);

    createChart(moneyCtx, labels, prices);
    createChart(timeCtx, labels, periods);
    createChart(typeCtx, labels, amounts);
  }
}
