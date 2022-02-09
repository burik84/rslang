import { servicesApi } from './shared/services';
import {handleClickMenuBurger} from './view/view';
import { audioGame } from './games/audioGame';

const app = {
  init: () => {
    console.log('Start App');
    handleClickMenuBurger();
    audioGame();
  },
  testSevice: () => {
    servicesApi.getAllWords();
  },
};

export { app };
