import { isShowElement, errorMessage, removeElement } from './components/elements';
import { addUserForm, renderUserForm } from './components/form';
import {pagination} from './components/pagination';

const showAdaptiveMenu = () => {
  const buttonMenu: HTMLButtonElement = document.querySelector('.menu__button');

  buttonMenu.addEventListener('click', () => {
    ['.menu__button', '.menu-adaptive'].forEach((element) => {
      isShowElement(element);
    });
  });
};
const renderFormUser = () => {
  const buttonsSign = document.querySelectorAll('.menu-sign');
  const buttonsLogout = document.querySelectorAll('.menu-user-name');

  const showModalUser = (element: HTMLButtonElement) => {
    element.addEventListener('click', () => {
      isShowElement('.user-handler');
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
    pagination.init(document.querySelector('.dictionary__pages'), {
      size: 30, // pages size
      page: 1, // selected page
      step: 3, // pages before and after current
    });
  },
  renderUserMessage: (type?: string) => {
    addErrorLogin(type);
  },
  closeModalUserSign: () => {
    isShowElement('.user-handler');
  },
  renderUserLogin: (isLogin: boolean, name?: string) => {
    const header = document.querySelector('header');
    const buttonsUser = document.querySelectorAll('.menu-user-name');
    if (isLogin) {
      if (!header.classList.contains('login')) header.classList.add('login');
      buttonsUser.forEach((button) => {
        button.textContent = name;
      });
    } else {
      if (header.classList.contains('login')) header.classList.remove('login');
    }
  },
};
export { view };
