import { controllers } from '../../../controllers/controller';
import { pagination } from '../pagination';
import { isShowElement, isHideElement } from '../elements';
import { IWordAPI } from '../../../shared/interface';
import { Word } from './Word';

const renderTextBook = (isUserSignIn: boolean, group: string) => {
  const lists: HTMLUListElement = document.querySelector('.word__cards');
  lists.setAttribute('data-group', group);
  if (controllers.words.length > 0) {
    controllers.words.forEach((word: IWordAPI) => {
      const statistics: number[] = [0, 0];
      const li = new Word(word, isUserSignIn, statistics);
      li.init();
      lists.append(li.show().element);
    });
  } else {
    const p = document.createElement('p');
    p.textContent = 'Отсутствуют сложные слова';
    lists.append(p);
  }
};
const updateDictionary = () => {
  const lists: HTMLUListElement = document.querySelector('.dictionary__lists');
  const paginationLists: HTMLUListElement = document.querySelector('.dictionary__pages');
  const containerGroupButtons: HTMLUListElement = document.querySelector('.dictionary__lists');
  const buttonsGroup = containerGroupButtons.querySelectorAll('button');

  if (controllers.isUserSignIn) {
    isShowElement(lists);
    isShowElement(paginationLists);
    if (controllers.wordsGroup === '6') {
      isHideElement(paginationLists);
    }
  } else {
    isHideElement(lists);
    isShowElement(paginationLists);
  }
  pagination.init(paginationLists, {
    size: 30, // pages size
    page: controllers.wordsPage, // selected page
    step: 2, // pages before and after current
  });
  buttonsGroup.forEach((button: HTMLButtonElement) => {
    const group = button.getAttribute('data-group');
    if (button.classList.contains('dictionary__button-active')) {
      button.classList.remove('dictionary__button-active');
    }
    if (
      group === controllers.wordsGroup &&
      !button.classList.contains('dictionary__button-active')
    ) {
      button.classList.add('dictionary__button-active');
    }
  });
};
export { renderTextBook, updateDictionary };
