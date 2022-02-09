import { view } from '../view/view';
import { model } from '../model/model';

const controllers = {
  init: () => {
    console.log('Init view');
    view.init();
    model.start();
  },
};

export { controllers };
