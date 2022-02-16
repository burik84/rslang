import { isToggleElement, errorMessage, removeElement } from './components/elements';
import { addUserForm, renderUserForm } from './components/form';
import { updateDictionary, renderTextBook } from './components/dictionary/dictionary';
import {controllers} from '../controllers/controller'

const showAdaptiveMenu = () => {
  const buttonMenu: HTMLButtonElement = document.querySelector('.menu__button');

  buttonMenu.addEventListener('click', () => {
    ['.menu__button', '.menu-adaptive'].forEach((element) => {
      isToggleElement(element);
    });
  });
};
const renderFormUser = () => {
  const buttonsSign = document.querySelectorAll('.menu-sign');
  const buttonsLogout = document.querySelectorAll('.menu-user-name');

  const showModalUser = (element: HTMLButtonElement) => {
    element.addEventListener('click', () => {
      isToggleElement('.user-handler');
      renderUserForm();
    });
  };

  buttonsSign.forEach((button: HTMLButtonElement) => {
    showModalUser(button);
  });
  buttonsLogout.forEach((button: HTMLButtonElement) => {
    showModalUser(button);
  });
};
const addErrorLogin = (type?: string) => {
  const message = document.querySelector('#user-sign-msg-holder');

  message.insertAdjacentHTML('afterend', errorMessage(type));
  removeElement('#user-error-msg-holder');
};

const view = {
  init: () => {
    const section = document.querySelector('.user-handler');
    section.append(addUserForm());
    showAdaptiveMenu();
    renderFormUser();
    view.updateViewDictionary();
  },
  renderUserMessageError: (type?: string) => {
    addErrorLogin(type);
  },
  closeModalUserSign: () => {
    isToggleElement('.user-handler');
  },
  renderUserLogin: (name?: string) => {
    const header = document.querySelector('header');
    const buttonsUser = document.querySelectorAll('.menu-user-name');
    if (controllers.isUserSignIn) {
      if (!header.classList.contains('login')) header.classList.add('login');
      buttonsUser.forEach((button) => {
        button.textContent = name;
      });
    } else {
      if (header.classList.contains('login')) header.classList.remove('login');
    }
    view.updateViewDictionary();
  },
  updateViewDictionary: () => {
    updateDictionary();
  },
  renderWordsDictionary: () => {
    renderTextBook(controllers.isUserSignIn,`${controllers.wordsGroup}`);
  },
};
export { view };
