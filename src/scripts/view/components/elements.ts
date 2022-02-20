const userTitle = (text = 'Авторизация') => {
  const title: HTMLHeadingElement = document.createElement('h3');
  title.className = 'user-header';
  title.textContent = `${text} пользователя`;
  return title;
};

const errorLogin = 'Не правильное имя пользователя и/или пароль';
const errorSignin = 'Пользователь с указанным email уже существует';
const errorMessage = (type?: string) => {
  const text = type ? errorSignin : errorLogin;
  return `<div id="user-error-msg-holder" class="show">
  <p id="user-error-msg">${text}</p>
  </div>`;
};
const isShowElement = (element: HTMLElement) => {
  if (!element.classList.contains('open')) {
    element.classList.add('open');
  }
};
const isHideElement = (element: HTMLElement) => {
  if (element.classList.contains('open')) {
    element.classList.remove('open');
  }
};
const isToggleElement = (tag: string) => {
  const element: HTMLDivElement = document.querySelector(tag);

  if (element.classList.contains('open')) {
    element.classList.remove('open');
  } else {
    element.classList.add('open');
  }
};

const removeElement = (tag: string) => {
  setTimeout(() => {
    const element = document.querySelector(tag);
    element.remove();
  }, 3000);
};

const getSpinner = {
  tag: '.loading',
  elementSpinner:
    '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  add: ():HTMLDivElement => {
    const loading: HTMLDivElement = document.createElement('div');
    const container: HTMLDivElement = document.createElement('div');
    const overflow: HTMLDivElement = document.createElement('div');
    overflow.className = 'loading__overflow';
    container.className = 'loading__spinner';
    loading.className = 'loading';

    container.insertAdjacentHTML('afterbegin', getSpinner.elementSpinner);

    loading.append(overflow, container);
    return loading
  },
  show: (parent:HTMLElement) => {
    const spinner=parent.querySelector(getSpinner.tag)
    if(!spinner.classList.contains('active')) spinner.classList.add('active')
  },
  hide: (parent:HTMLElement) => {
    const spinner=parent.querySelector(getSpinner.tag)
    if(spinner.classList.contains('active')) spinner.classList.remove('active')
  },
};
export {
  userTitle,
  errorMessage,
  isToggleElement,
  removeElement,
  isShowElement,
  isHideElement,
  getSpinner,
};
