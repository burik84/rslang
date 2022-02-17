import { urlAPI } from './api';
import { TUser, TUserCreate, IUserAuth, IUserCreated, IAudio } from './interface';

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
