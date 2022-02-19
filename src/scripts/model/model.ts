import { servicesApi, servicesWordsApi } from '../shared/services';
import { TUser, TUserCreate, IUserAuth, IDictinaryData, TWordBody } from '../shared/interface';
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

    controllers.user = user;

    model.savePageLibrary();
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
  getPageLibrary: () => {
    const dictionaryData: IDictinaryData = getValue('dictionary');

    if (dictionaryData) {
      controllers.wordsGroup = dictionaryData.group;
      controllers.wordsPage = dictionaryData.page;
    } else {
      controllers.wordsGroup = '0';
      controllers.wordsPage = 1;
    }
  },
  savePageLibrary: () => {
    const dictionaryData: IDictinaryData = {
      group: controllers.wordsGroup,
      page: controllers.wordsPage,
    };

    setValue(dictionaryData, 'dictionary');
  },
  createUserWord: async (wordId: string, word: TWordBody) => {
    const userId = controllers.user.userId;

    const data = await servicesWordsApi.createUserWord(controllers.user.token, userId, {
      wordId,
      word,
    });
    return data;
  },

  getUserWords: async () => {
    const userId = controllers.user.userId;

    const data = await servicesWordsApi.getUserWords(controllers.user.token, userId);
    return data;
  },
  getUserWord: async (wordId: string) => {
    const userId = controllers.user.userId;

    const data = await servicesWordsApi.getUserWord(controllers.user.token, { userId, wordId });
    return data;
  },

  updateUserWord: async (wordId: string, word: TWordBody) => {
    const userId = controllers.user.userId;

    const data = await servicesWordsApi.updateUserWord(controllers.user.token, userId, {
      wordId,
      word,
    });
    return data;
  },

  deleteUserWord: async (wordId: string) => {
    const userId = controllers.user.userId;

    const data = await servicesWordsApi.deleteUserWord(controllers.user.token, { userId, wordId });
    return data;
  },
};

export { model };
