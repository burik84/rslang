import { isShowElement } from './components/elements';
import {addUserForm, renderUserForm} from './components/form';


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

  buttonsSign.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
      isShowElement('.user-handler');
      renderUserForm(view.signin);
    });
  });
};

const view = {
  signin: true,
  init: () => {
    const section = document.querySelector('.user-handler');
    section.append(addUserForm());
    showAdaptiveMenu();
    renderFormUser()
  },
};
export { view };
