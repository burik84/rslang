import { isShowElement, errorMessage, removeElement } from './components/elements';
import { addUserForm, renderUserForm } from './components/form';
import {model} from '../model/model';

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
    renderFormUser();
  },
  submit: () => {
    const result:string[]=[]
    const inputs = document.querySelectorAll('.login-form-field');
    const message=document.querySelector('#user-sign-msg-holder')

    inputs.forEach((element: HTMLInputElement) => {
      result.push(element.value)
    });

    if (result.length===2){
      const successLogin=model.login({
        'email':result[0],
        'password':result[1]
      }).then(data=>{
        if (!data) {
          message.insertAdjacentHTML('afterend',errorMessage())
          removeElement('#user-error-msg-holder')
        }
      })
    }

  },
};
export { view };
