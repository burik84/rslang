import {
  isShowElement,
  errorMessage,
  removeElement,
} from './components/elements';
import { addUserForm, renderUserForm } from './components/form';

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
const addErrorLogin = () => {
  const message = document.querySelector('#user-sign-msg-holder');

  message.insertAdjacentHTML('afterend', errorMessage());
  removeElement('#user-error-msg-holder');
};

const view = {
  init: () => {
    const section = document.querySelector('.user-handler');
    section.append(addUserForm());
    showAdaptiveMenu();
    renderFormUser();
  },
  renderUserMessage: () => {
    addErrorLogin();
  },
  closeModalUserSign: () => {
    isShowElement('.user-handler');
  },
  renderUserLogin: (isLogin: boolean) => {
    const header = document.querySelector('header');
    if (isLogin) {
      if (!header.classList.contains('login')) header.classList.add('login');
    } else {
      if (header.classList.contains('login')) header.classList.remove('login');
    }
  },
};
export { view };
