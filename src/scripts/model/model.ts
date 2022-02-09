import { servicesApi } from '../shared/services';
import { TUser, IUserAuth } from '../shared/interface';
import { setValue } from '../shared/localstorage';

const model = {
  start: () => {
    console.log('start model');
  },
  user: {},
  login: async (user: TUser) => {
    try {
      const response = await servicesApi.signin(user);
      console.log(response);
      const login = {
        name: response.name,
        refreshToken: response.refreshToken,
        token: response.token,
        userId: response.userId,
      };
      model.user = login;
      setValue(login);
      return response;
    } catch (error) {
      console.error('rejected login:', error.message);
      return false;
    }
  },
};

export { model };
