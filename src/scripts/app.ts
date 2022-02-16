import { servicesApi } from './shared/services';
import { audioGame } from './games/audioGame';
import { controllers } from './controllers/controller';
import { nav } from './view/components/nav';
import { statistics } from './view/components/statistics';

const app = {
  start: () => {
    console.log('Start App');
    nav();
    audioGame();
    statistics();
    controllers.init();
  },
  testSevice: () => {
    servicesApi.getAllWords();
  },
};

export { app };
