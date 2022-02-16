import { servicesApi } from './shared/services';
import { audioGame } from './games/audioGame';
import { controllers } from './controllers/controller';
import { nav } from './view/components/nav';

const app = {
  start: () => {
    console.log('Start App');
    nav();
    audioGame();
    controllers.init();
  },
  testSevice: () => {
    servicesApi.getAllWords();
  },
};

export { app };
