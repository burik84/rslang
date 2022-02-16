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

const showImage = (url:string, picture:HTMLImageElement) => {
  const img = new Image();
  img.src = url;

  img.addEventListener("load", () => {
    picture.src = url;
  });
};
export { userTitle, errorMessage, isToggleElement, removeElement, isShowElement, isHideElement, showImage };
