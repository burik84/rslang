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
  userWords:[],
  refreshToken: '',
  wordsGroup: '0',
  wordsPage: 1,
  init: () => {
    console.log('Init view');
    model.getPageLibrary();
    view.init();
    controllers.updateUser();
    if (controllers.wordsGroup==='6') {
      controllers.getDataWordsDifficult()
    } else {
    controllers.getDataWords();
    }
  },
  userSign: (data: string[]) => {
    if (data.length === 2) signIn(data);
    if (data.length === 3) signUp(data);
  },
  updateUser: () => {
    model.isSignIn();
    console.log(controllers.user, controllers.isUserSignIn);
    if (controllers.user) {
      controllers.isUserSignIn = true;
      view.renderUserLogin(controllers.user.name);
    } else {
      controllers.isUserSignIn = false;
      if (controllers.wordsGroup === '6') {
        controllers.wordsGroup = '0';
        controllers.wordsPage = 1;
      }
      view.renderUserLogin();
    }
  },
  getDataWords: () => {
    view.showSpinnerWords();

    model.savePageLibrary();

    const getWords = model
      .getWords()
      .then((data) => {
        controllers.words = data;
        view.renderWordsDictionary();
      })
      .catch();
  },
  getDataWordsDifficult: () => {
    view.showSpinnerWords();
    model.savePageLibrary();
    const getWords = model
      .getUserWords()
      .then((data) => {
        controllers.words = data;
        view.renderWordsDictionary();
      })
      .catch();
  },
};

export { controllers };
