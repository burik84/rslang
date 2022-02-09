const isShowElement = (tag: string) => {
  const element: HTMLDivElement = document.querySelector(tag);

  if (element.classList.contains('open')){
    element.classList.remove('open')
  } else {
    element.classList.add('open')
  }
};
const handleClickMenuBurger = () => {
  const buttonMenu: HTMLButtonElement = document.querySelector('.menu__button');

  buttonMenu.addEventListener('click', () => {
    console.log('click');

    ['.menu__button', '.menu-adaptive'].forEach((element) => {
      isShowElement(element);
    });
  });
};

export { handleClickMenuBurger };
