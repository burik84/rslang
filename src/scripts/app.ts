import { servicesApi } from './shared/services';
import {handleClickMenuBurger} from './view/view';

const app = {
  init: () => {
    console.log('Start App');
    handleClickMenuBurger()
  },
  testSevice: () => {
    servicesApi.getAllWords();
  },
};

export { app };
