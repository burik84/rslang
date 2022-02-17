import { Chart } from 'chart.js';
import { controllers } from '../../controllers/controller';

const statisticsChart = () => {

  const canvas1 = <HTMLCanvasElement> document.querySelector('#myChart-1');
  const ctx1 = canvas1.getContext('2d');

  const totalWordCount = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['', '', '...', '', '', 'Вчера', 'Сегодня'],
      datasets: [
        {
          backgroundColor: [
            'rgba(4, 124, 148, 0.3)'
          ],
          borderColor: [
            'rgba(32, 164, 180, 1)',
            'rgba(32, 164, 180, 1)',
            'rgba(32, 164, 180, 1)',
            'rgba(32, 164, 180, 1)',
            'rgba(32, 164, 180, 1)',
            'rgba(32, 164, 180, 1)',
            'rgba(32, 164, 180, 1)'
          ],
          borderWidth: 3,
          label: 'Всего слов',
          data: [10, 25, 30, 50, 61, 70, 85],
        },
      ],
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Общеее количество изученных слов',
        position: 'top',
        fontSize: 16,
        padding: 10
      },
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  });

  const canvas2 = <HTMLCanvasElement> document.querySelector('#myChart-2');
  const ctx2 = canvas2.getContext('2d');

      const wordsByDay = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['', '', '...', '', 'Вчера', 'Сегодня'],
            datasets: [{
                label: 'Количество слов',
                data: [30, 35, 28, 20, 31, 40],
                backgroundColor: [
                    'rgba(177, 207, 211, 0.6)',
                    'rgba(152, 212, 228, 0.6)',
                    'rgba(32, 164, 180, 0.6)',
                    'rgba(80, 155, 166, 0.6)',
                    'rgba(4, 124, 148, 0.6)',
                    'rgba(47, 99, 102, 0.6)'
                ],
                borderColor: [
                    'rgba(177, 207, 211, 1)',
                    'rgba(152, 212, 228, 1)',
                    'rgba(32, 164, 180, 1)',
                    'rgba(80, 155, 166, 1)',
                    'rgba(4, 124, 148, 1)',
                    'rgba(47, 99, 102, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Количество новых слов за каждый день изучения',
                position: 'top',
                fontSize: 16,
                padding: 10
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 45
                    }
                }]
            }
        }
      })
};

function showStatisticsModal() {
  const statisticsNonAuthorisedModal = document.querySelector('#statistics-non-authorised-modal');
  if (controllers.isUserSignIn == true) {
    statisticsNonAuthorisedModal.classList.add('visually-hidden');
  } else {
    statisticsNonAuthorisedModal.classList.remove('visually-hidden');
  }
}

const statistics = () => {
  showStatisticsModal();

  document.querySelector('#nav-statistics').addEventListener('click', showStatisticsModal);

  document.querySelector('#nav-statistics-adaptive').addEventListener('click', showStatisticsModal);
};

export { statistics, statisticsChart, showStatisticsModal };
