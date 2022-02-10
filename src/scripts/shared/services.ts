import { urlAPI } from './api';
import { TUser, TUserCreate, IUserAuth, IUserCreated } from './interface';

export const servicesApi = {
  getAllWords: async () => {
    const dataAllWords = await fetch(`${urlAPI}/words`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Something went wrong', error.message);
      });
    return dataAllWords;
  },
  login: async (user: TUser) => {
    const rawResponse = await fetch(`${urlAPI}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content: IUserAuth = await rawResponse.json();
    return content;
  },
  signin: async (user: TUserCreate) => {
    const rawResponse = await fetch(`${urlAPI}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content: IUserCreated = await rawResponse.json().catch(()=>false);

    return content;
  },
};
