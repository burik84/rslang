import {userTitle, errorMessage} from './components/elements';

const isShowElement = (tag: string) => {
  const element: HTMLDivElement = document.querySelector(tag);

  if (element.classList.contains('open')) {
    element.classList.remove('open');
  } else {
    element.classList.add('open');
  }
};
const addUserForm = () => {
  const fragment:DocumentFragment=document.createDocumentFragment()
  const messageHolder:HTMLDivElement=document.createElement('div')
  const messageButtonSwtchAuth:HTMLButtonElement=document.createElement('button')

  messageHolder.className='user-sign-msg-holder';
  messageButtonSwtchAuth.className='button button-link'
  messageButtonSwtchAuth.id='user-sign-button'

  messageHolder.innerHTML='<p id="user-sign-msg">Если вы не регистрировались</p>'
  messageButtonSwtchAuth.textContent='зарегистрироваться'
  messageHolder.append(messageButtonSwtchAuth)

  fragment.append(userTitle(), messageHolder)
  return fragment
};
const view = {
  openElement: () => {
    const buttonMenu: HTMLButtonElement =
      document.querySelector('.menu__button');
    const buttonsSign = document.querySelectorAll('.menu-sign');

    buttonMenu.addEventListener('click', () => {
      ['.menu__button', '.menu-adaptive'].forEach((element) => {
        isShowElement(element);
      });
    });

    buttonsSign.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        isShowElement('.user-handler');
      });
    });
  },
  init: () => {
    const section=document.querySelector('.user-handler')
    section.append(addUserForm())
  },
};
export { view };
