import { isShowElement, userTitle } from './elements';
import { validateInput } from './validate';
import { view } from '../view';

const inputForms: string[] = ['password', 'email', 'text'];

const addInput = (type = 'text') => {
  const container: HTMLDivElement = document.createElement('div');
  const input: HTMLInputElement = document.createElement('input');
  const hint: HTMLParagraphElement = document.createElement('p');

  container.className = 'login-input-container';
  hint.className = 'login-input-hint';

  switch (type) {
    case 'text':
      input.type = type;
      input.name = 'username';
      input.id = 'username-field';
      input.className = 'login-form-field';
      input.placeholder = 'username';
      hint.textContent =
        'Имя может содержать только цифробуквенные символы и не менее 3 символов';
      break;
    case 'email':
      input.type = type;
      input.name = type;
      input.id = `${type}-field`;
      input.className = 'login-form-field';
      input.placeholder = `${type}`;
      hint.textContent = 'Почта может содержать только цифробуквенные символы';
      break;
    case 'password':
      input.type = type;
      input.name = type;
      input.id = `${type}-field`;
      input.className = 'login-form-field';
      input.placeholder = `${type}`;
      hint.textContent =
        'Пароль может содержать только цифробуквенные символы и не менее 8 символов';
      break;
    default:
      break;
  }

  input.addEventListener('input', (e) => {
    const isValidate = validateInput(type, input.value);
    if (isValidate) {
      if (!container.classList.contains('validate'))
        container.classList.add('validate');
      if (container.classList.contains('invalidate'))
        container.classList.remove('invalidate');
    } else {
      if (container.classList.contains('validate'))
        container.classList.remove('validate');
      if (!container.classList.contains('invalidate'))
        container.classList.add('invalidate');
    }
  });
  container.append(input);
  container.insertAdjacentElement('afterbegin', hint);
  return container;
};
const renderUserForm = (signin = true) => {
  const textMessageHolder = signin
    ? 'Если вы не регистрировались'
    : 'Если у вас уже есть аккаунт ';
  const messageHolder: HTMLParagraphElement =
    document.querySelector('#user-sign-msg');
  const messageButtonSwtchAuth: HTMLButtonElement =
    document.querySelector('#user-sign-button');
  const buttonSubmit: HTMLInputElement =
    document.querySelector('#login-form-submit');

  const form: HTMLFormElement = document.querySelector('form');
  const blocksInputForm = form.querySelectorAll('div');

  messageHolder.textContent = textMessageHolder;
  messageButtonSwtchAuth.textContent = signin ? 'регистрация' : 'авторизация';

  buttonSubmit.value = signin ? 'Авторизация' : 'Регистрация';
  blocksInputForm.forEach((element: HTMLDivElement) => {
    element.parentNode.removeChild(element);
  });
  inputForms.forEach((element, index) => {
    if (signin) {
      if (index < 2)
        form.insertAdjacentElement('afterbegin', addInput(element));
    } else {
      form.insertAdjacentElement('afterbegin', addInput(element));
    }
  });
};
const addUserForm = () => {
  let currentSignin = view.signin;
  const fragment: DocumentFragment = document.createDocumentFragment();
  const messageHolder: HTMLDivElement = document.createElement('div');
  const messageButtonSwtchAuth: HTMLButtonElement =
    document.createElement('button');
  const form: HTMLFormElement = document.createElement('form');
  const buttonReset: HTMLButtonElement = document.createElement('button');
  const buttonSubmit: HTMLInputElement = document.createElement('input');

  messageHolder.id = 'user-sign-msg-holder';
  messageButtonSwtchAuth.className = 'button button-link';
  messageButtonSwtchAuth.id = 'user-sign-button';

  messageHolder.innerHTML = `<p id="user-sign-msg"></p>`;
  messageHolder.append(messageButtonSwtchAuth);

  form.id = 'signin-form';

  buttonReset.type = 'reset';
  buttonReset.textContent = 'Закрыть';
  buttonSubmit.type = 'submit';
  buttonSubmit.id = 'login-form-submit';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  messageButtonSwtchAuth.addEventListener('click', () => {
    currentSignin = !currentSignin;
    view.signin = currentSignin;
    renderUserForm(currentSignin);
  });
  buttonReset.addEventListener('click', () => {
    isShowElement('.user-handler');
  });
  form.append(buttonSubmit);

  fragment.append(userTitle(), messageHolder, form, buttonReset);
  return fragment;
};

export { addUserForm, renderUserForm };