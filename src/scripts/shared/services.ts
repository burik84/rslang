import { urlAPI } from './api';

export const servicesApi = {
  getAllWords: async () => {
    const dataAllWords = await fetch(`${urlAPI}words`)
      .then((res) =>res.json())
      .then((data) =>{
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Something went wrong', error.message);
      });
    return dataAllWords;
  },
};
