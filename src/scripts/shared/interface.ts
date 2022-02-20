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

type TUserWordGet = {
  userId: string;
  wordId: string;
};
type TWordBody = {
  difficulty: string;
  optional: {
    testFieldString: string;
    testFieldStatus: boolean;
  };
};

type TUserWord = {
  wordId: string;
  difficulty: string;
  optional: {
    testFieldString: string;
    testFieldStatus: boolean;
  };
};
interface IControllers {
  signin: boolean;
  isUserSignIn: boolean;
  isUserSignUp: boolean;
  isSpinner: boolean;
  user: IUserAuth | any;
  words: IWordAPI[];
  userWords: TUserWord[];
  refreshToken: string;
  wordsGroup: string;
  wordsPage: number;
  init: () => void;
  userSign: (data: string[]) => void;
  updateUser: () => void;
  getDataWords: () => void;
  getDataWordsDifficult: () => void;
}

type TDataPagination = {
  size: number;
  page: number;
  step: number;
};

interface IPagination {
  code: string;
  size: number;
  page: number;
  step: number;
  element?: HTMLElement;
  extend: (data: TDataPagination) => void;
  add: (start: number, finish: number) => void;
  last: () => void;
  first: () => void;
  click: () => void;
  prev: () => void;
  next: () => void;
  bind: () => void;
  finish: () => void;
  start: () => void;
  buttons: (element: HTMLElement) => void;
  create: (element: HTMLElement) => void;
  init: (element: HTMLElement, data: TDataPagination) => void;
  // render: (data: TDataPagination) => void;
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

interface IDictinaryData {
  group: string;
  page: number;
}

interface IStatisticsAG {
  newWords: number;
  winRate: number;
  longestWinStreak: number;
  numberOfGames: number;
}

export {
  IWordAPI,
  TUser,
  TUserCreate,
  IUserAuth,
  IUserCreated,
  TUserWordGet,
  TUserWord,
  TWordBody,
  IControllers,
  IPagination,
  IAudio,
  IDictinaryData,
  IStatisticsAG,
};
