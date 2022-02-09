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

export { userTitle, errorMessage };
