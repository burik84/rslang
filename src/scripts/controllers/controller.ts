import { IControllers } from '../shared/interface';
import { view } from '../view/view';
import { model } from '../model/model';

const signIn = (result: string[]) => {
  const successSignIn = model
    .signin({
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
const signUp = (result: string[]) => {
  const successSignUp = model
    .signup({
      name: result[0],
      email: result[1],
      password: result[2],
    })
    .then((data) => {
      if (!data) view.renderUserMessage('signin');
      controllers.isUserSignin = data ? true : false;
      if (controllers.isUserSignin) {
        const user = result.slice(1);
        signIn(user);
      }
    });
};
const controllers: IControllers = {
  signin: true,
  isUserLogin: false,
  isUserSignin: false,
  isSpinner: false,
  user: {},
  refreshToken: '',
  init: () => {
    console.log('Init view');
    view.init();
    model.start();
    controllers.updateUser();
  },
  userSign: (data:string[]) => {
    if (data.length === 2) signIn(data);
    if (data.length === 3) signUp(data);
  },
  updateUser: () => {
    model.isSignIn();
    if (controllers.user) {
      controllers.isUserLogin = true;
      view.renderUserLogin(controllers.isUserLogin, controllers.user.name);
    } else {
      controllers.isUserLogin = false;
      view.renderUserLogin(controllers.isUserLogin);
    }
  },
};

export { controllers };
