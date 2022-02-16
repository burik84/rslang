import { IControllers, IWordAPI } from '../shared/interface';
import { view } from '../view/view';
import { model } from '../model/model';

const signIn = (result: string[]) => {
  const successSignIn = model
    .signin({
      email: result[0],
      password: result[1],
    })
    .then((data) => {
      if (!data) {
        view.renderUserMessageError();
        controllers.isUserSignIn = false;
      } else {
        controllers.updateUser();
        view.closeModalUserSign();
        controllers.isUserSignIn = true;
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
      if (!data) {
        view.renderUserMessageError('signin');
        controllers.isUserSignUp = false;
      } else {
        controllers.isUserSignUp = true;
        const user = result.slice(1);
        signIn(user);
      }
    });
};
const controllers: IControllers = {
  signin: true,
  isUserSignIn: false,
  isUserSignUp: false,
  isSpinner: false,
  user: {},
  words: [],
  refreshToken: '',
  wordsGroup: 1,
  wordsPage: 1,
  init: () => {
    console.log('Init view');
    view.init();
    controllers.updateUser();

    const getWords = model
      .getWords()
      .then((data) => {
        controllers.words = data;
        view.renderWordsDictionary();
      })
      .catch();
  },
  userSign: (data: string[]) => {
    if (data.length === 2) signIn(data);
    if (data.length === 3) signUp(data);
  },
  updateUser: () => {
    model.isSignIn();
    if (controllers.user) {
      controllers.isUserSignIn = true;
      view.renderUserLogin(controllers.isUserSignIn, controllers.user.name);
    } else {
      controllers.isUserSignIn = false;
      view.renderUserLogin(controllers.isUserSignIn);
      controllers.wordsGroup = 1;
      controllers.wordsPage = 1;
    }
  },
};

export { controllers };
