import { urlAPI } from '../shared/api';
import { IWordAPI, IDictinaryData } from '../shared/interface';

function sprintGame(){
  const lvla1: HTMLUListElement = document.querySelector('#lvla1');
  const lvla2: HTMLUListElement = document.querySelector('#lvla2');
  const lvlb1: HTMLUListElement = document.querySelector('#lvlb1');
  const lvlb2: HTMLUListElement = document.querySelector('#lvlb2');
  const lvlc1: HTMLUListElement = document.querySelector('#lvlc1');
  const lvlc2: HTMLUListElement = document.querySelector('#lvlc2');

  const dictStorage:IDictinaryData = JSON.parse(localStorage.getItem('rsteam17-dictionary'));

  let sprintWords: Array<IWordAPI> = [];
  let sprintResults: any = [];
  let sprintScore: number = 0;
  let setPage:number = dictStorage.page || 1;

  async function getWordsGroup(group:number, page: number){
    const pageNum: number = page + 5;
    for (page; page < pageNum; page++){
      const words = await fetch(`${urlAPI}/words?group=${group}&page=${page - 1}`)
      .then((res:any) => res.json())
      .then((data:any) => {
        sprintWords.push(...data);
      })
      .catch((error) => {
        console.log('Something went wrong', error.message);
      })
    }
  }


  const gameStartPage: HTMLElement = document.querySelector('.sprint-game-start');
  const gamePlayPage: HTMLElement = document.querySelector('.sprint-game-play');
  const lvlBtn: HTMLButtonElement = document.querySelector('#lvl-btn');



  const time: HTMLParagraphElement = document.querySelector('.sprint-game-timer');
  const resultsPage: Element = document.querySelector('.sprint-results-section');
  const timer = function(){
    time.innerHTML = '60';
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
        console.log(`функция showWord, перевод неверный, записываем false в sprintResults`, sprintResults);
        isTrue = false;
      } else {
        console.log(`функция showWord, перевод верный, записываем true в sprintResults`, sprintResults);
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
    } else if(sprintResults[sprintResults.length - 1][1] === sprintResults[sprintResults.length - 1][2]){
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


  async function startGameOnLvlBtn(group: number, page: number){
    sprintWords = sprintWords.filter(el => typeof el === 'boolean')
    await  getWordsGroup(group, page)
    .then((data: any) => {
      if(lvlBtn.classList.contains('visually-hidden')){
        lvlBtn.classList.toggle('visually-hidden');
      }
      //console.log('group', group, 'page ', page);
    })
  }

  lvla1.addEventListener('click', (event) => {
    const n:number = 0;
    startGameOnLvlBtn(n, setPage);
  });

  lvla2.addEventListener('click', (event) => {
    const n: number = 1;
    startGameOnLvlBtn(n, setPage);
  });

  lvlb1.addEventListener('click', (event) => {
    const n: number = 2;
    startGameOnLvlBtn(n, setPage);
  });

  lvlb2.addEventListener('click', (event) => {
    const n: number = 3;
    startGameOnLvlBtn(n, setPage);
  });

  lvlc1.addEventListener('click', (event) => {
    const n: number = 4;
    startGameOnLvlBtn(n, setPage);
  });
  lvlc2.addEventListener('click', (event) => {
    const n: number = 5;
    startGameOnLvlBtn(n, setPage);
  });

  lvlBtn.addEventListener('click',async function(){
    //sprintWords = sprintWords.filter((el) => typeof el === 'boolean');
    if(sprintWords.length === 0){
      await getWordsGroup(+dictStorage.group, setPage)
      .then((res: any) => {
        timer();
        showWord(0);
        gamePlayPage.classList.toggle('visually-hidden');
        gameStartPage.classList.toggle('visually-hidden');
      })
    } else {
      gamePlayPage.classList.toggle('visually-hidden');
      gameStartPage.classList.toggle('visually-hidden');
      timer();
      showWord(0);
    }
  });

  trueBtn.addEventListener('click', () => {
    sprintResults[sprintResults.length - 1].push(true);
    updateScore();
    showWord(Math.floor(Math.random() * sprintWords.length));
  });

  falseBtn.addEventListener('click', () => {
    sprintResults[sprintResults.length - 1].push(false);
    updateScore();
    showWord(Math.floor(Math.random() * sprintWords.length));
  })

  const restartBtn: HTMLButtonElement = document.querySelector('#restart-sprint');

  function restartSprint(){
    sprintWords = sprintWords.filter((el) => typeof el === 'boolean');
    sprintResults = sprintResults.filter((el: any) => typeof el === 'boolean');
    sprintScore = 0;
    setPage = 1;
    time.innerHTML = '60';
    scoreBlock.innerHTML = `${sprintScore}`;
    while(resultsContainer.firstChild){
      resultsContainer.removeChild(resultsContainer.firstChild);
    }
    document.querySelector('.choose-level').classList.remove('visually-hidden')
    resultsPage.classList.toggle('visually-hidden');
    gameStartPage.classList.toggle('visually-hidden')
    if(!lvlBtn.classList.contains('visually-hidden')){
      lvlBtn.classList.toggle('visually-hidden');
    }
  }

  restartBtn.addEventListener('click', restartSprint);
}

export { sprintGame }
