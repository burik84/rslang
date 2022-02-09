const userTitle = (text = 'Авторизация') => {
  const title: HTMLHeadingElement = document.createElement('h3');
  title.className = 'user-header';
  title.textContent = `${text} пользователя`;
  return title;
};

const exampleError = 'Не правильное имя пользователя и/или пароль';
const errorMessage = (
  text: string = exampleError
) => `<div id="user-error-msg-holder" class="show">
<p id="user-error-msg">${text}</p>
</div>`;

const isShowElement = (tag: string) => {
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
export { userTitle, errorMessage, isShowElement, removeElement };
