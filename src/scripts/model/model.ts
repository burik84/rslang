import { servicesApi, servicesWordsApi } from '../shared/services';
import { TUser, TUserCreate, IUserAuth, IDictinaryData } from '../shared/interface';
import { setValue, getValue } from '../shared/localstorage';
import { controllers } from '../controllers/controller';

const model = {
  start: () => {
    console.log('start model');
    // model.isLogin();
    model.getWords();
  },
  signin: async (user: TUser) => {
    try {
      const response = await servicesApi.signin(user);
      const login = {
        name: response.name,
        token: response.token,
        userId: response.userId,
      };
      controllers.refreshToken = response.refreshToken;
      setValue(login);
      return response;
    } catch (error) {
      return false;
    }
  },
  signup: async (user: TUserCreate) => {
    try {
      const response = await servicesApi.signup(user);
      return response;
    } catch (error) {
      return false;
    }
  },
  isSignIn: () => {
    const user: IUserAuth = getValue();
    const dictionaryData: IDictinaryData = getValue('dictionary');

    controllers.user = user;

    if (dictionaryData) {
      controllers.wordsGroup = dictionaryData.group;
      controllers.wordsPage = dictionaryData.page;
    }
  },
  getWords: async () => {
    try {
      const responce = await servicesWordsApi.getWords(
        controllers.wordsGroup,
        controllers.wordsPage
      );
      return responce;
    } catch (error) {
      return false;
    }
  },
};

export { model };
