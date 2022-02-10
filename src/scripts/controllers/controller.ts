import { IUserAuth } from '../shared/interface';
import { view } from '../view/view';
import { model } from '../model/model';

const controllers = {
  signin: true,
  isUserLogin: false,
  isUserSignin: false,
  isSpinner: false,
  user: {},
  init: () => {
    console.log('Init view');
    view.init();
    model.start();
    controllers.updateUser();
  },
  userSign: () => {
    const result: string[] = [];
    const inputs = document.querySelectorAll('.login-form-field');

    inputs.forEach((element: HTMLInputElement) => {
      result.push(element.value);
    });

    if (result.length === 2) {
      const successLogin = model
        .login({
          email: result[0],
          password: result[1],
        })
        .then((data) => {
          if (!data) view.renderUserMessage();
          controllers.isUserLogin = data ? true : false;
          if (controllers.isUserLogin){
            controllers.updateUser()
            view.closeModalUserSign();
          }
        });
    }
  },
  updateUser: () => {
    model.isLogin();
    if (controllers.user) controllers.isUserLogin = true;
    if (!controllers.user) controllers.isUserLogin = false;
    view.renderUserLogin(controllers.isUserLogin);
  },
};

export { controllers };
