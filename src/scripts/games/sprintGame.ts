import { urlAPI } from '../shared/api';
import { IWordAPI, IDictinaryData, IAudio } from '../shared/interface';

function sprintGame(){
  const dictStorage:IDictinaryData = JSON.parse(localStorage.getItem('rsteam17-dictionary'));
  const chooseLevelBtns: HTMLCollection = document.querySelector('.choose-level').children;

  let sprintWords: Array<IWordAPI> = [];
  let sprintResults: any = [];
  let sprintScore: number = 0;
  let setPage:number = 1;
  let aContext = new AudioContext();
  let audio: IAudio;
  let showWordInitlVal = 0;
  let chooseLvlGroup: number;
  let startFromVocabulary = false;
  let timerId: any;

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
    time.innerHTML = '60';
    let curTime:number = +time.innerHTML;
    timerId = setInterval(() => {
      if(curTime === 1){
        showResults();
        clearInterval(timerId);
      }
      curTime--;
      time.innerHTML = '' + curTime;
    }, 1000);
  }

  const showWord = (idx: number) => {
    console.log('showWordInitlVal', showWordInitlVal)
    if(idx >= sprintWords.length){
      if(startFromVocabulary){
        setPage--;
        if(setPage < 1){
          clearInterval(timerId);
          showResults();
        } else {
          getWordsGroup(chooseLvlGroup, setPage);
        }
      } else {
        setPage++;
        getWordsGroup(chooseLvlGroup, setPage);
      }
    }
    const sprintWordPlace: HTMLSpanElement = document.querySelector('.word-question');
    const answerPlace: HTMLSpanElement = document.querySelector('.sprint-translation');
    sprintWordPlace.innerHTML = sprintWords[idx].word;
    const randomAnswer: number = Math.floor(Math.random() * 2);
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
    showWordInitlVal++;
  }

  const trueBtn: HTMLButtonElement = document.querySelector('#trueBtn');
  const falseBtn: HTMLButtonElement = document.querySelector('#falseBtn');
  const scoreBlock: HTMLSpanElement = document.querySelector('.score');

  resultsPage.addEventListener('keypress', (e:KeyboardEvent) => console.log(true))

  function updateScore(){
    const lastFourAnswers: Array<boolean> = sprintResults.map((el:Array<any>) => [el[1], el[2]]).slice(-4);
    if(lastFourAnswers.length === 4 && lastFourAnswers.every((arr: any) => arr[0] === arr[1])){
      sprintScore +=20;
    } else if(sprintResults[sprintResults.length - 1][1] === sprintResults[sprintResults.length - 1][2]){
      sprintScore += 10;
    }
    scoreBlock.innerHTML = `${sprintScore}`;
  }

  function getAudioAndPlay(urlSound: any) {
    fetch(`${urlAPI}/${urlSound}`)
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => aContext.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        audio = decodedAudio;
        const playSound = aContext.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(aContext.destination);
        playSound.start(aContext.currentTime);
      });
  }


  const showResults = function(){
    resultsPage.classList.toggle('visually-hidden');
    gamePlayPage.classList.toggle('visually-hidden');
    sprintResults.forEach((arr: any) => {
      createRow(arr[0], arr[1], arr[2]);
    });
    const resultWords: HTMLCollection = resultsContainer.children;
    for(let i:number = 0; i < resultWords.length; i++){
      resultWords[i].firstChild.addEventListener('click', () => {
        const src: any = sprintWords.filter((el) => {
          if (el.word === resultWords[i].children[1].innerHTML) return el;
        }).map(el => el.audio);
        getAudioAndPlay(src);
        });
      }
    restartBtn.addEventListener('click', restartSprint);
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
    })
  }

  function listenLvlBtns(){
    for(let i: number = 0; i < chooseLevelBtns.length; i++){
      chooseLevelBtns[i].addEventListener('click', () => {
        chooseLvlGroup = i;
        console.log('выбрана группа ', i, 'страница ', setPage)
        startGameOnLvlBtn(i, setPage);
      });
    }
  }

  lvlBtn.addEventListener('click', startPageBtnFn);

  async function startPageBtnFn(){
    if(sprintWords.length === 0 || startFromVocabulary){
      setPage = dictStorage.page;
      startFromVocabulary = true;
      console.log('игра запущена из словаря, страница ', setPage, 'группа ', dictStorage.group)
      await getWordsGroup(+dictStorage.group, setPage)
      .then((res: any) => {
        timer();
        showWord(showWordInitlVal);
        gamePlayPage.classList.toggle('visually-hidden');
        gameStartPage.classList.toggle('visually-hidden');
      })
    } else {
      gamePlayPage.classList.toggle('visually-hidden');
      gameStartPage.classList.toggle('visually-hidden');
      timer();
      showWord(showWordInitlVal);
      console.log('игра запущена со стартовой страницы, страница ',setPage, 'группа ', chooseLvlGroup )
    }
  }

  trueBtn.addEventListener('click', () => {
    sprintResults[sprintResults.length - 1].push(true);
    updateScore();
    showWord(showWordInitlVal);
  });

  falseBtn.addEventListener('click', () => {
    sprintResults[sprintResults.length - 1].push(false);
    updateScore();
    showWord(showWordInitlVal);
  })

  const restartBtn: HTMLButtonElement = document.querySelector('#restart-sprint');

  function restartSprint(){
    sprintWords = [];
    sprintResults = [];
    sprintScore = 0;
    setPage = 1;
    time.innerHTML = '10';
    showWordInitlVal = 0;
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

  document.addEventListener('keydown', (e) => {
    if(!gameStartPage.classList.contains('visually-hidden')){
      if(e.code === '1'){
        chooseLvlGroup = 0;
        console.log('выбрана группа ', 0, 'страница ', setPage)
        startGameOnLvlBtn(0, setPage);
      } else if(e.code === '2'){
        chooseLvlGroup = 1;
        console.log('выбрана группа ', 1, 'страница ', setPage)
        startGameOnLvlBtn(1, setPage);
      } else if(e.code === '3'){
        chooseLvlGroup = 2;
        console.log('выбрана группа ', 2, 'страница ', setPage)
        startGameOnLvlBtn(2, setPage);
      } else if(e.code === '4'){
        chooseLvlGroup = 3;
        console.log('выбрана группа ', 3, 'страница ', setPage)
        startGameOnLvlBtn(3, setPage);
      } else if(e.code === '5'){
        chooseLvlGroup = 4;
        console.log('выбрана группа ', 4, 'страница ', setPage)
        startGameOnLvlBtn(4, setPage);
      } else if(e.code === '6'){
          chooseLvlGroup = 5;
          console.log('выбрана группа ', 5, 'страница ', setPage)
          startGameOnLvlBtn(5, setPage);
      } else if(e.code === 'Enter'){
        startPageBtnFn();
      }
    }
    if(!gamePlayPage.classList.contains('visually-hidden')){
      if(e.code === 'ArrowLeft'){
        sprintResults[sprintResults.length - 1].push(true);
        updateScore();
        showWord(showWordInitlVal);
      } else if(e.code === 'ArrowRight'){
        sprintResults[sprintResults.length - 1].push(false);
        updateScore();
        showWord(showWordInitlVal);
      }
    }
    if(!resultsPage.classList.contains('visually-hidden')){
      if(e.code === 'Enter'){
        restartSprint();
      }
    }
  })
  listenLvlBtns();
}

export { sprintGame }
