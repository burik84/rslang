import { urlAPI } from '../shared/api';
import { IWordAPI } from '../shared/interface'
function sprintGame(){
  const lvla1: HTMLUListElement = document.querySelector('#lvla1');
  const lvla2: HTMLUListElement = document.querySelector('#lvla2');
  const lvlb1: HTMLUListElement = document.querySelector('#lvlb1');
  const lvlb2: HTMLUListElement = document.querySelector('#lvlb2');
  const lvlc1: HTMLUListElement = document.querySelector('#lvlc1');
  const lvlc2: HTMLUListElement = document.querySelector('#lvlc2');

  const sprintWords: Array<IWordAPI> = [];
  const sprintResults: any = [];
  let sprintScore: number = 0;
  const sprintAnswer: Array<boolean> = [];

  async function getWordsGroup(group:number = 1){
    const words = await fetch(`${urlAPI}/words?group=${group}`)
      .then((res:any) => res.json())
      .then((data:any) => {
        sprintWords.push(...data);
      })
      .catch((error) => {
        console.log('Something went wrong', error.message);
      })
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

  const showWord = (idx: number) => {
    const sprintWordPlace: HTMLSpanElement = document.querySelector('.word-question');
    const answerPlace: HTMLSpanElement = document.querySelector('.sprint-translation');
    sprintWordPlace.innerHTML = sprintWords[idx].word;
    const randomAnswer: number = Math.floor(Math.random() * 5);
    let isTrue: boolean = true;
    if(idx+randomAnswer > sprintWords.length){
      answerPlace.innerHTML = sprintWords[randomAnswer].wordTranslate;
      if(sprintWords[randomAnswer].wordTranslate !== sprintWords[idx].wordTranslate) isTrue = false;
    }
    answerPlace.innerHTML = sprintWords[idx + randomAnswer].wordTranslate;
    if(sprintWords[idx + randomAnswer].wordTranslate !== sprintWords[idx].wordTranslate) isTrue = false;
    sprintResults.push([sprintWords[idx], isTrue]);
  }

  const trueBtn: HTMLButtonElement = document.querySelector('#trueBtn');
  const falseBtn: HTMLButtonElement = document.querySelector('#falseBtn');
  const scoreBlock: HTMLSpanElement = document.querySelector('.score');

  function updateScore(){
    const lastFourAnswers: Array<boolean> = sprintAnswer.slice(-4);
    if(lastFourAnswers.every((answer) => answer === true)){
      sprintScore +=20;
    } else{
      sprintScore += 10;
    }
    scoreBlock.innerHTML = `${sprintScore}`;
  }

  const showResults = function(){
    resultsPage.classList.toggle('visually-hidden');
    gamePlayPage.classList.toggle('visually-hidden');
    sprintResults.forEach((arr: any) => {
      createRow(arr[0], arr[1]);
    })
  }
  const resultsContainer: HTMLDivElement = document.querySelector('.sprint-results__container');
  const createRow = function(obj: IWordAPI, isTrue: boolean){
    const wordRow: HTMLDivElement = document.createElement('div');
    wordRow.classList.add('sprint-word');
    const volumeIcon: HTMLDivElement = document.createElement('div');
    volumeIcon.classList.add('sprint-icon', 'volume-icon');
    const spelling: HTMLParagraphElement = document.createElement('p');
    spelling.classList.add('spelling');
    spelling.innerHTML = obj.word;
    const transcription: HTMLParagraphElement = document.createElement('p');
    transcription.classList.add('transcription');
    transcription.innerHTML = obj.transcription;
    const translation: HTMLParagraphElement = document.createElement('p');
    translation.classList.add('translation');
    translation.innerHTML = obj.wordTranslate;
    const resultIco: HTMLDivElement = document.createElement('div');
    resultIco.classList.add('sprint-icon');
    if(isTrue === true){
      resultIco.classList.add('checkmark');
    } else {
      resultIco.classList.add('wrong');
    }
    wordRow.append(volumeIcon);
    wordRow.append(spelling);
    wordRow.append(transcription);
    wordRow.append(translation);
    wordRow.append(resultIco);
    resultsContainer.append(wordRow);
  }

  lvla1.addEventListener('click', (event) => {
    const n:number = 0;
    getWordsGroup(n);
  });
  lvla2.addEventListener('click', (event) => {
    const n: number = 1;
    getWordsGroup(n);
  });
  lvlb1.addEventListener('click', (event) => {
    const n: number = 2;
    getWordsGroup(n);
  });
  lvlb2.addEventListener('click', (event) => {
    const n: number = 3;
    getWordsGroup(n);
  });
  lvlc1.addEventListener('click', (event) => {
    const n: number = 4;
    getWordsGroup(n);
  });
  lvlc2.addEventListener('click', (event) => {
    const n: number = 5;
    getWordsGroup(n);
  });

  lvlBtn.addEventListener('click', function(){
    gamePlayPage.classList.toggle('visually-hidden');
    gameStartPage.classList.toggle('visually-hidden');
    timer();
    showWord(0);
  });

  trueBtn.addEventListener('click', () => {
    if(sprintResults[sprintResults.length-1][1] === true){
      sprintAnswer.push(true);
      updateScore()
    }
    sprintAnswer.push(false);
    showWord(Math.floor(Math.random() * sprintWords.length));
  });
  falseBtn.addEventListener('click', () => {
    if(sprintResults[sprintResults.length-1][1] === false){
      sprintAnswer.push(true);
      updateScore();
    }
    sprintAnswer.push(false);
    showWord(Math.floor(Math.random() * sprintWords.length));
  })
}

export { sprintGame }
