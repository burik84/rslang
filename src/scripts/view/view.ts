import { isToggleElement, errorMessage, removeElement } from './components/elements';
import { addUserForm, renderUserForm } from './components/form';
import { updateDictionary } from './components/dictionary/dictionary';

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
    updateDictionary();
  },
  renderUserMessageError: (type?: string) => {
    addErrorLogin(type);
  },
  closeModalUserSign: () => {
    isToggleElement('.user-handler');
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
    updateDictionary()
  },
};
export { view };
