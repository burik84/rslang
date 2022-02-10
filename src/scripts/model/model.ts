import { servicesApi } from '../shared/services';
import { TUser, IUserAuth } from '../shared/interface';
import { setValue, getValue } from '../shared/localstorage';
import {controllers} from '../controllers/controller';

const model = {
  start: () => {
    console.log('start model');
    // model.isLogin();
  },
  login: async (user: TUser) => {
    try {
      const response = await servicesApi.signin(user);
      const login = {
        name: response.name,
        token: response.token,
        userId: response.userId,
      };
      controllers.user = login;
      setValue(login);
      return response;
    } catch (error) {
      console.error('rejected login:', error.message);
      return false;
    }
  },
  isLogin:()=>{
    const user:IUserAuth=getValue()
    controllers.user=user
    // return user
  }
};

export { model };
