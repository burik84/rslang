import { servicesApi } from './shared/services';
import { audioGame } from './games/audioGame';
import {controllers} from './controllers/controller';


const app = {
  start: () => {
    console.log('Start App');
    audioGame();
    controllers.init()
  },
  testSevice: () => {
    servicesApi.getAllWords();
  },
};

export { app };
