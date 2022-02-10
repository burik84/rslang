import { servicesApi } from '../shared/services';
import { TUser, TUserCreate, IUserAuth } from '../shared/interface';
import { setValue, getValue } from '../shared/localstorage';
import { controllers } from '../controllers/controller';

const model = {
  start: () => {
    console.log('start model');
    // model.isLogin();
  },
  login: async (user: TUser) => {
    try {
      const response = await servicesApi.login(user);
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
  signin: async (user: TUserCreate) => {
    try {
      const response = await servicesApi.signin(user);
      return response;
    } catch (error) {
      return false;
    }
  },
  isLogin: () => {
    const user: IUserAuth = getValue();
    controllers.user = user;
  },
};

export { model };
