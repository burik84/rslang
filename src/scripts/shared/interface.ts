interface IWordAPI {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}
type TUser = {
  email: string;
  password: string;
};

type TUserCreate = TUser & {
  name: string;
};
interface IUserAuth {
  message?: string;
  token: string;
  refreshToken?: string;
  userId: string;
  name: string;
}
interface IUserCreated {
  id: string;
  name: string;
  email: string;
}

interface IControllers {
  signin: boolean;
  isUserLogin: boolean;
  isUserSignin: boolean;
  isSpinner: boolean;
  user: IUserAuth | any;
  refreshToken: string;
  init: () => void;
  userSign: () => void;
  updateUser: () => void;
}

interface IAudio {
  length: number;
  duration: number;
  sampleRate: number;
  numberOfChannels: number;
  getChannelData(channel: number): Float32Array;
  copyFromChannel(destination: Float32Array, channelNumber: number, bufferOffset?: number): void;
  copyToChannel(source: Float32Array, channelNumber: number, bufferOffset?: number): void;
}

export { IWordAPI, TUser, TUserCreate, IUserAuth, IUserCreated, IControllers, IAudio };
