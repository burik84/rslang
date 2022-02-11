import { servicesApi } from './shared/services';

const app = {
  init: () => {
    console.log('Start App');
  },
  testSevice: () => {
    servicesApi.getAllWords();
  },
};

export { app };
