import { controllers } from '../../../controllers/controller';
import { pagination } from '../pagination';
import { isShowElement, isHideElement } from '../elements';
import { IWordAPI } from '../../../shared/interface';
import { Word } from './Word';

const renderTextBook = (isUserSignIn: boolean) => {
  const lists: HTMLUListElement = document.querySelector('.word__cards');
  controllers.words.forEach((word: IWordAPI) => {
    const statistics: number[] = [0, 0];
    const li = new Word(word, isUserSignIn, statistics);
    lists.append(li.init().element);
  });
};
const updateDictionary = () => {
  const lists: HTMLUListElement = document.querySelector('.dictionary__lists');
  const paginationLists: HTMLUListElement = document.querySelector('.dictionary__pages');
  if (controllers.isUserSignIn) {
    isShowElement(lists);
    if (controllers.wordsGroup === 7) {
      isHideElement(paginationLists);
    }
  } else {
    isHideElement(lists);
  }
  pagination.init(paginationLists, {
    size: 30, // pages size
    page: controllers.wordsPage, // selected page
    step: 3, // pages before and after current
  });
};
export { renderTextBook, updateDictionary };
