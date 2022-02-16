import { controllers } from '../../../controllers/controller';
import {pagination} from '../pagination';
import { isShowElement,isHideElement } from '../elements';

const renderTextBook = () => {
  const lists: HTMLUListElement = document.querySelector('.word__cards');
};
const updateDictionary = () => {
  const lists: HTMLUListElement = document.querySelector('.dictionary__lists');
  const paginationLists:HTMLUListElement=document.querySelector('.dictionary__pages')
  if (controllers.isUserSignIn) {
    isShowElement(lists)
    isShowElement(paginationLists)
  } else {
    isHideElement(lists)
    isHideElement(paginationLists)
  }
  pagination.init(paginationLists, {
    size: 30, // pages size
    page: 1, // selected page
    step: 3, // pages before and after current
  });
};
export { renderTextBook, updateDictionary };
