import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels, LinearScale, BarController, BarElement, CategoryScale, Title);
Chart.defaults.font.family = 'Montserrat';

const BAR_HEIGHT = 55;

export const createChart = (containerElement, labels, data) => {
  containerElement.height = BAR_HEIGHT * 5;

  return new Chart(containerElement, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: '#97d4ff',
        barThickness: 43,
        minBarLength: 70,
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
          formatter: (val) => `€ ${val}`,
        },
        title: {
          display: true,
          text: 'MONEY',
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
