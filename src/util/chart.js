import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels, LinearScale, BarController, BarElement, CategoryScale, Title);
Chart.defaults.font.family = 'Montserrat';
import { duration } from 'dayjs';
import { ChartType } from '../const';
import { formatDuration } from '../util/point';
const BAR_HEIGHT = 55;

export const createChart = (containerElement, labels, data, chartType) => {
  containerElement.height = BAR_HEIGHT * 5;

  const formatLabel = () => {
    switch (chartType) {
      case ChartType.AMOUNT:
        return (val) => `${val}x`;
      case ChartType.PRICE:
        return (val) => `€ ${val}`;
      case ChartType.PERIOD:
        return (val) => formatDuration(duration(val));
    }
  };

  return new Chart(containerElement, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: '#97d4ff',
        barThickness: 30,
        minBarLength: 100,
        borderRadius: 7,
      }],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: formatLabel(),
        },
        title: {
          display: true,
          text: chartType,
          color: '#000000',
          fullSize: true,
          position: 'left',
          font: {
            size: 24,
          }
        },
      },
      scales: {
        y: {
          ticks: {
            fontColor: '#100000',
            padding: 5,
            font: {
              size: 14
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        }
      },
    },
  });};
