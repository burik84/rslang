
function sprintGame(){
  const lvla1: HTMLUListElement = document.querySelector('#lvla1');
  const lvla2: HTMLUListElement = document.querySelector('#lvla2');
  const lvlb1: HTMLUListElement = document.querySelector('#lvlb1');
  const lvlb2: HTMLUListElement = document.querySelector('#lvlb2');
  const lvlc1: HTMLUListElement = document.querySelector('#lvlc1');
  const lvlc2: HTMLUListElement = document.querySelector('#lvlc2');


  const getWordsGroup = async () =>{
    const words = await fetch(`${urlAPI}/words?group=${}`);
      .then((res) => res.json());
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Something went wrong', error.message);
      });
    return dataAllWords;
  }

  const gameStartPage: HTMLElement = document.querySelector('.sprint-game-start');
  const gamePlayPage: HTMLElement = document.querySelector('.sprint-game-play');
  const lvlBtn: HTMLButtonElement = document.querySelector('#lvl-btn');



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
    createRow();
    resultsPage.classList.toggle('visually-hidden');
    gamePlayPage.classList.toggle('visually-hidden');
  }
  const resultsContainer: HTMLDivElement = document.querySelector('.sprint-results__container');
  const createRow = function(){
    const wordRow: HTMLDivElement = document.createElement('div');
    wordRow.classList.add('sprint-word');
    const volumeIcon: HTMLDivElement = document.createElement('div');
    volumeIcon.classList.add('sprint-icon', 'volume-icon');
    const spelling: HTMLParagraphElement = document.createElement('p');
    spelling.classList.add('spelling');
    spelling.innerHTML = 'bla';
    const transcription: HTMLParagraphElement = document.createElement('p');
    transcription.classList.add('transcription');
    transcription.innerHTML = 'bla';
    const translation: HTMLParagraphElement = document.createElement('p');
    translation.classList.add('translation');
    translation.innerHTML = 'bla';
    const resultIco: HTMLDivElement = document.createElement('div');
    resultIco.classList.add('sprint-icon', 'wrong');
    wordRow.append(volumeIcon);
    wordRow.append(spelling);
    wordRow.append(transcription);
    wordRow.append(translation);
    wordRow.append(resultIco);
    resultsContainer.append(wordRow);
  }

  lvlBtn.addEventListener('click', function(){
    gamePlayPage.classList.toggle('visually-hidden');
    gameStartPage.classList.toggle('visually-hidden');
    timer();
  });
}

export { sprintGame }