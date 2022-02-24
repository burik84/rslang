import { servicesWordsApi } from './shared/services';
import { audioGame } from './games/audioGame';
import { controllers } from './controllers/controller';
import { nav } from './view/components/nav';
import { statistics, statisticsChart } from './view/components/statistics';
import { sprintGame } from './games/sprintGame'

const app = {
  start: () => {
    console.log('Start App');
    nav();
    audioGame();
    statistics();
    statisticsChart();
    controllers.init();
    sprintGame();
  },
  testSevice: () => {
    servicesWordsApi.getWords();
  },
};

export { app };
