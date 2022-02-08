import {view} from '../view/view';
import {model} from '../model/model';

const controllers={
  init: () => {
    console.log('Init view');
    view.init()
    view.openElement()
    model.start()
  },
}

export {controllers}