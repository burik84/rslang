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
    gamePlayPage.classList.toggle('visually-hidden');
    gameStartPage.classList.toggle('visually-hidden');
  });

  const time: HTMLParagraphElement = document.querySelector('.sprint-game-timer');
  const resultsPage: Element = document.querySelector('.sprint-results');
  const timer = function(){
    let curTime:number = +time.innerHTML;
    let timerId = setInterval(() => {
      if(curTime === 1){
        showResults();
        clearInterval(timerId);
      }
      curTime--;
      time.innerHTML = '' + curTime;
    }, 1000);
  }
  const showResults = function(){
    resultsPage.classList.toggle('visually-hidden');
    gamePlayPage.classList.toggle('visually-hidden');
  }
  timer();
}

export { sprintGame }