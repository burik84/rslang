function sprintGame(){
  const lvla1: HTMLUListElement = document.querySelector('#lvla1');
  const lvla2: HTMLUListElement = document.querySelector('#lvla2');
  const lvlb1: HTMLUListElement = document.querySelector('#lvlb1');
  const lvlb2: HTMLUListElement = document.querySelector('#lvlb2');
  const lvlc1: HTMLUListElement = document.querySelector('#lvlc1');
  const lvlc2: HTMLUListElement = document.querySelector('#lvlc2');

  const gameStartPage: Element = document.querySelector('.sprint-game-start');
  const gamePlayPage: Element = document.querySelector('.sprint-game-play');
  const lvlBtn: HTMLButtonElement = document.querySelector('#lvl-btn');

  lvlBtn.addEventListener('click', function(){
    console.log(gamePlayPage.classList);
    gamePlayPage.classList.toggle('.visually-hidden');

    gameStartPage.classList.toggle('.visually-hidden');
    console.log('click');
  });
}


export { sprintGame }