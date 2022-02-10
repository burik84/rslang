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
export { IWordAPI, TUser, TUserCreate, IUserAuth, IUserCreated };
