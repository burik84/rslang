import { IControllers } from '../shared/interface';
import { view } from '../view/view';
import { model } from '../model/model';

const loginUser = (result: string[]) => {
  const successLogin = model
    .login({
      email: result[0],
      password: result[1],
    })
    .then((data) => {
      if (!data) view.renderUserMessage();
      controllers.isUserLogin = data ? true : false;
      if (controllers.isUserLogin) {
        controllers.updateUser();
        view.closeModalUserSign();
      }
    });
};
const signinUser = (result: string[]) => {
  const successSignin = model
    .signin({
      name: result[0],
      email: result[1],
      password: result[2],
    })
    .then((data) => {
      console.log(data);
      if (!data) view.renderUserMessage('signin');
      controllers.isUserSignin = data ? true : false;
      if (controllers.isUserSignin) {
        const user = result.slice(1);
        loginUser(user);
      }
    });
};
const controllers: IControllers = {
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

    if (result.length === 2) loginUser(result);
    if (result.length === 3) signinUser(result);
  },
  updateUser: () => {
    model.isLogin();
    if (controllers.user) {
      controllers.isUserLogin = true;
      view.renderUserLogin(controllers.isUserLogin, controllers.user.name);
    }else{
      controllers.isUserLogin = false;
      view.renderUserLogin(controllers.isUserLogin);
    }
  },
};

export { controllers };
