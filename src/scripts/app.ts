import { servicesApi } from './shared/services';
import {controllers} from './controllers/controller';
import { sprintGame } from './games/sprintGame';

const app = {
  start: () => {
    console.log('Start App');
    controllers.init();
    sprintGame();
  },
  testSevice: () => {
    servicesApi.getAllWords();
  },
};

export { app };
