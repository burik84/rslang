import { urlAPI } from './api';
import {
  TUser,
  TUserCreate,
  IUserAuth,
  IUserCreated,
  TUserWord,
  TUserWordGet,
  IAudio,
} from './interface';

export const servicesApi = {
  signin: async (user: TUser) => {
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
  signup: async (user: TUserCreate) => {
    const rawResponse = await fetch(`${urlAPI}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content: IUserCreated = await rawResponse.json().catch(() => false);

    return content;
  },
};

export const servicesWordsApi = {
  getWords: async (group = '1', page = 1) => {
    const dataAllWords = await fetch(`${urlAPI}/words?group=${group}&page=${page - 1}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Something went wrong', error.message);
      });
    return dataAllWords;
  },
  getUserWords: async (token: string, userId: string) => {
    const rawResponse = await fetch(`${urlAPI}/users/${userId}/words`, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();
    return content;
  },
  createUserWord: async (token: string, userId: string, { wordId, word }: TUserWord) => {
    const rawResponse = await fetch(`${urlAPI}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const content = await rawResponse.json();
    return content;
  },
  updateUserWord: async (token: string, userId: string, { wordId, word }: TUserWord) => {
    const rawResponse = await fetch(`${urlAPI}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const content = await rawResponse.json();

    return content;
  },
  getUserWord: async (token: string, { userId, wordId }: TUserWordGet) => {
    const content = await fetch(`${urlAPI}/users/${userId}/words/${wordId}`, {
      method: 'GET',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }).then((data) => data.json());

    return content;
  },
  deleteUserWord: async (token: string, { userId, wordId }: TUserWordGet) => {
    const content = await fetch(`${urlAPI}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // const content = await rawResponse.json();
    return content;
  },
};

export const loadImage = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = url;
  });
};

export const audioPlayWord = async (url: string) => {
  let audio: IAudio;
  const AudioContext = window.AudioContext;
  const audioContext = new AudioContext();
  await fetch(url)
    .then((data) => data.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((decodedAudio) => {
      audio = decodedAudio;
    })
    .then((data) => {
      const playSound = audioContext.createBufferSource();
      playSound.buffer = audio;
      playSound.connect(audioContext.destination);
      playSound.start(audioContext.currentTime);
    });
};
