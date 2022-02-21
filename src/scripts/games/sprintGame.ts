import { urlAPI } from '../shared/api';
import { IWordAPI } from '../shared/interface'
function sprintGame(){
  const lvla1: HTMLUListElement = document.querySelector('#lvla1');
  const lvla2: HTMLUListElement = document.querySelector('#lvla2');
  const lvlb1: HTMLUListElement = document.querySelector('#lvlb1');
  const lvlb2: HTMLUListElement = document.querySelector('#lvlb2');
  const lvlc1: HTMLUListElement = document.querySelector('#lvlc1');
  const lvlc2: HTMLUListElement = document.querySelector('#lvlc2');

  let sprintWords: Array<IWordAPI> = [];
  let sprintResults: any = [];
  let sprintScore: number = 0;
  let page: number = 1;

  async function getWordsGroup(group:number, page: number){
    const words = await fetch(`${urlAPI}/words?group=${group}&page=${page - 1}`)
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
  const resultsPage: Element = document.querySelector('.sprint-results-section');
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
    const randomAnswer: number = Math.floor(Math.random() * 3);
    let isTrue: boolean = true;
    if(idx+randomAnswer >= sprintWords.length){
      answerPlace.innerHTML = sprintWords[idx - randomAnswer].wordTranslate;
      if(sprintWords[randomAnswer].wordTranslate !== sprintWords[idx].wordTranslate) {
        isTrue = false;
      } else {
        isTrue = true;
      }
    } else {
      answerPlace.innerHTML = sprintWords[idx + randomAnswer].wordTranslate;
      if(sprintWords[idx + randomAnswer].wordTranslate !== sprintWords[idx].wordTranslate){
        isTrue = false;
      } else {
        isTrue = true;
      }
    }
    sprintResults.push([sprintWords[idx], isTrue]);
  }

  const trueBtn: HTMLButtonElement = document.querySelector('#trueBtn');
  const falseBtn: HTMLButtonElement = document.querySelector('#falseBtn');
  const scoreBlock: HTMLSpanElement = document.querySelector('.score');

  function updateScore(){
    const lastFourAnswers: Array<boolean> = sprintResults.map((el:Array<any>) => [el[1], el[2]]).slice(-4);
    if(lastFourAnswers.length === 4 && lastFourAnswers.every((arr: any) => arr[0] === arr[1])){
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
      createRow(arr[0], arr[1], arr[2]);
    })
  }
  const resultsContainer: HTMLDivElement = document.querySelector('.sprint-results__container');
  const createRow = function(obj: IWordAPI, isTrue: boolean,answer: boolean){
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
    if(isTrue === answer){
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
    for(let i = 0; i < 30; i++){
      getWordsGroup(n, page);
      page++;
    }
    console.log(sprintWords);
  });
  lvla2.addEventListener('click', (event) => {
    const n: number = 1;
    for(let i = 0; i < 30; i++){
      getWordsGroup(n, page);
      page++;
    }
  });
  lvlb1.addEventListener('click', (event) => {
    const n: number = 2;
    for(let i = 0; i < 30; i++){
      getWordsGroup(n, page);
      page++;
    }
  });
  lvlb2.addEventListener('click', (event) => {
    const n: number = 3;
    for(let i = 0; i < 30; i++){
      getWordsGroup(n, page);
      page++;
    }
  });
  lvlc1.addEventListener('click', (event) => {
    const n: number = 4;
    for(let i = 0; i < 30; i++){
      getWordsGroup(n, page);
      page++;
    }
  });
  lvlc2.addEventListener('click', (event) => {
    const n: number = 5;
    for(let i = 0; i < 30; i++){
      getWordsGroup(n, page);
      page++;
    }
  });

  lvlBtn.addEventListener('click', function(){
    gamePlayPage.classList.toggle('visually-hidden');
    gameStartPage.classList.toggle('visually-hidden');
    timer();
    showWord(0);
  });

  trueBtn.addEventListener('click', () => {
    if(sprintResults[sprintResults.length-1][1] === true){
      sprintResults[sprintResults.length - 1].push(true)
      updateScore()
    } else {
      sprintResults[sprintResults.length - 1].push(false)
    }
    showWord(Math.floor(Math.random() * sprintWords.length));
  });

  falseBtn.addEventListener('click', () => {
    if(sprintResults[sprintResults.length-1][1] === false){
      sprintResults[sprintResults.length - 1].push(false)
      updateScore();
    } else {
      sprintResults[sprintResults.length - 1].push(true)
    }
    showWord(Math.floor(Math.random() * sprintWords.length));
  })

  const restartBtn: HTMLButtonElement = document.querySelector('#restart-sprint');

  function restartSprint(){
    console.log(sprintWords)
    sprintWords = sprintWords.splice(0,sprintWords.length - 1);
    console.log(sprintWords)
    console.log(sprintResults)
    sprintResults = sprintResults.splice(0,sprintResults.length - 1);
    console.log(sprintResults)
    sprintScore = 0;
    page = 1;
    const nodeCollection: any = resultsContainer.childNodes;
    for (let node of nodeCollection){
      console.log(node)
    }
    //resultsPage.classList.toggle('visually-hidden');
    //gamePlayPage.classList.toggle('visually-hidden');
  }
  restartBtn.addEventListener('click', restartSprint);
}

export { sprintGame }
