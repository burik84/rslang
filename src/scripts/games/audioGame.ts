import { urlAPI } from '../shared/api';
import { IWordAPI, IAudio, IStatisticsAG } from '../shared/interface';

const audioGame = () => {
  const audioChoiceLevelModal = document.querySelector('#audio-choice-level-modal');
  const audioChoiceLevelItems = document.querySelectorAll('.audio-choice-level-item');
  const audioStartGameBtn = document.querySelector('#audio-start-game-button');
  const audioRestartGgameBtn = document.querySelector('#audio-restart-game-button');

  const repeatVoiceButton = document.querySelector('#audio-repeat-voice-button');
  const answerButton1 = document.querySelector('#audio-answer-button-1');
  const answerButton2 = document.querySelector('#audio-answer-button-2');
  const answerButton3 = document.querySelector('#audio-answer-button-3');
  const answerButton4 = document.querySelector('#audio-answer-button-4');
  const nextQuestionButton = document.querySelector('#audio-next-question-button');

  const currentQuestionHTMLCounter = document.querySelector('#audio-current-question-number');
  const totalQuestionHTMLCounter = document.querySelector('#audio-total-question-number');

  const audioResultWrongCounter = document.querySelector('#audio-result-wrong-number');
  const audioResultRightCounter = document.querySelector('#audio-result-right-number');
  const audioResultPercentagesCounter = document.querySelector('#audio-result-percentages-counter');
  const audioResultDonutSegment = document.querySelector('#audio-result-donut-segment');
  const audioResultWrongWordsCont = document.querySelector('#audio-result-wrong-words');
  const audioResultRightWordsCont = document.querySelector('#audio-result-right-words');
  const audioResultModal = document.querySelector('#audio-game-result-container');

  let userSelectedLevel: number;
  // let userSelectedPage = 0;
  const userSelectedPage = 0;
  const wordsForAGarr: Array<IWordAPI> = [];
  let currentQuestionNumber = 1;
  let totalNumberOfQuestions: number;
  let correctAnswerNumber: number;
  let totalCorrectAnswers = 0;
  const rightWordsArr: Array<IWordAPI> = [];
  const wrongWordsArr: Array<IWordAPI> = [];
  let bufferWordBeforePush: IWordAPI;

  let currentWinStreak = 0;
  const winStreakArr: Array<number> = [];

  let statisticsAGNewWords: Array<string>;
  let statisticsAG: IStatisticsAG = {
    newWords: 0,
    winRate: 0,
    longestWinStreak: 0,
    numberOfGames: 0 
  }

  /*функции для получения аудио с сервера и последующего воспроизведения по клику*/

  const ctx = new AudioContext();
  let audio: IAudio;

  function getAudioFromApi(urlSound: string) {
    fetch(`${urlAPI}/${urlSound}`)
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        audio = decodedAudio;
      });
  }

  function playback() {
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  }

  /*забирает нужные слова с сервера, закидывает их в массив*/

  function getWordsFromAPI(page: number, group: number) {
    fetch(`${urlAPI}/words?page=${page}&group=${group}`)
      .then((response) => response.json())
      .then((data) => {
        wordsForAGarr.push(...data);
        totalNumberOfQuestions = wordsForAGarr.length / 4;
        totalQuestionHTMLCounter.innerHTML = String(totalNumberOfQuestions);
        // return wordsForAGarr;
      })
      .then(() => {
        setFirstQuestionAG();
      });
  }

  /*создает массив из 80 (или меньше) слов в зависимости от страницы*/

  function getWordsForAG(page: number, group: number) {
    const pageNumsArr: Array<number> = [];
    for (let i = 0; i < 4; i++) {
      if (page - i >= 0) {
        pageNumsArr.push(page - i);
      }
    }
    pageNumsArr.forEach((value) => getWordsFromAPI(value, group));
  }

  // getWordsForAG(0,4); 
  /*Это нужно будет выполнить когда пользователь выберет сложность для запуска*/

  /*генерируют вопросы*/

  function setFirstQuestionAG() {
    setQuestionAG(1);
  }

  function setQuestionAG(currentQuestionNumber: number) {
    currentQuestionHTMLCounter.innerHTML = String(currentQuestionNumber);
    disabledNextButton();

    answerButton1.innerHTML = wordsForAGarr[4 * (currentQuestionNumber - 1) + 0].wordTranslate;
    answerButton2.innerHTML = wordsForAGarr[4 * (currentQuestionNumber - 1) + 1].wordTranslate;
    answerButton3.innerHTML = wordsForAGarr[4 * (currentQuestionNumber - 1) + 2].wordTranslate;
    answerButton4.innerHTML = wordsForAGarr[4 * (currentQuestionNumber - 1) + 3].wordTranslate;

    correctAnswerNumber = Math.floor(Math.random() * 4);

    const voice = wordsForAGarr[4 * (currentQuestionNumber - 1) + correctAnswerNumber].audio;
    getAudioFromApi(voice);
    if (currentQuestionNumber > 1) {
      setTimeout(playback, 200);
      // playback();
    }
    bufferWordBeforePush = wordsForAGarr[4 * (currentQuestionNumber - 1) + correctAnswerNumber];
  }

  /*проверяет, правильный ли ответ и переходит к следующему*/

  function checkAnswerAG(userSelect: number) {
    if (userSelect == correctAnswerNumber) {
      totalCorrectAnswers += 1;
      rightWordsArr.push(bufferWordBeforePush);
      currentWinStreak += 1;
    } else {
      wrongWordsArr.push(bufferWordBeforePush);
      winStreakArr.push(currentWinStreak);
      currentWinStreak = 0;
    }

    currentQuestionNumber += 1;
  }

  /* 1я меняет цвета кнопок после ответа и блокирует их / 2я возращает как было */

  function fillButtonsInColor(correctAnswernumber: number) {
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach((value) =>
      value.classList.add('audio-answer-button-false')
    );
    [answerButton1, answerButton2, answerButton3, answerButton4][correctAnswernumber].classList.add(
      'audio-answer-button-true'
    );
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach((value) =>
      value.setAttribute('disabled', 'disabled')
    );
  }

  function clearButtonsColor() {
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach((value) =>
      value.classList.remove('audio-answer-button-false')
    );
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach((value) =>
      value.classList.remove('audio-answer-button-true')
    );
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach((value) =>
      value.removeAttribute('disabled')
    );
  }

  /*обработчики для кнопок*/

  audioChoiceLevelItems.forEach(value => value.addEventListener('click', ()=> {
    audioChoiceLevelItems.forEach(item => item.classList.remove('audio-choice-level-item-active'));
    value.classList.add('audio-choice-level-item-active');
    const num  = Number(value.innerHTML);
    userSelectedLevel = num - 1;
    audioStartGameBtn.removeAttribute('disabled');
  }))

  audioStartGameBtn.addEventListener('click', () => {
    audioChoiceLevelModal.classList.add('visually-hidden');
    getWordsForAG(userSelectedPage, userSelectedLevel);
  });

  function enableNextButton() {
    nextQuestionButton.classList.add('audio-button-enable');
  }

  function disabledNextButton() {
    nextQuestionButton.classList.remove('audio-button-enable');
  }

  function setSelectedButtonBorder(selectedAnswerNumber: number) {
    [answerButton1, answerButton2, answerButton3, answerButton4][
      selectedAnswerNumber
    ].classList.add('audio-answer-button-selected');
  }

  function clearSelectedButtonBorder() {
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach((value) =>
      value.classList.remove('audio-answer-button-selected')
    );
  }

  function answerButtonHandler(buttonNumber: number) {
    fillButtonsInColor(correctAnswerNumber);
    checkAnswerAG(buttonNumber);
    enableNextButton();
    setSelectedButtonBorder(buttonNumber);
  }

  repeatVoiceButton.addEventListener('click', () => {
    playback();
  });

  answerButton1.addEventListener('click', () => {
    answerButtonHandler(0);
  });

  answerButton2.addEventListener('click', () => {
    answerButtonHandler(1);
  });

  answerButton3.addEventListener('click', () => {
    answerButtonHandler(2);
  });

  answerButton4.addEventListener('click', () => {
    answerButtonHandler(3);
  });

  nextQuestionButton.addEventListener('click', () => {
    if (currentQuestionNumber < totalNumberOfQuestions + 1) {
      clearButtonsColor();
      clearSelectedButtonBorder();
      setQuestionAG(currentQuestionNumber);
    } else {
      winStreakArr.push(currentWinStreak);
      audioResultModal.classList.remove('visually-hidden');
      setAGResultWordsCont(rightWordsArr, wrongWordsArr);
      setAGResultStatistics(totalCorrectAnswers, totalNumberOfQuestions);
      disabledNextButton();
    }
  });

  /*заполняет счетчики правильных и неправильных ответов и соответствующую диаграмму*/
  
  function setAGResultStatistics(totalCorrectAnswers: number, totalNumberOfQuestions: number) {
    audioResultRightCounter.innerHTML = String(totalCorrectAnswers);
    audioResultWrongCounter.innerHTML = String(totalNumberOfQuestions - totalCorrectAnswers);
    const pers = Math.round(totalCorrectAnswers / totalNumberOfQuestions * 100);
    audioResultPercentagesCounter.innerHTML = `${String(pers)}%`;
    const donutValue = `${pers} ${100 - pers}`;
    audioResultDonutSegment.setAttribute('stroke-dasharray', donutValue);
    setStatisticsAG();
  }

  /*заполняет блоки правильно и неправильно отвеченных слов*/

  function setAGResultWordsCont(arrayRight: Array<IWordAPI>, arrayWrong: Array<IWordAPI>) {
    arrayRight.forEach(value => setAGResultWordsItem(value, 1));
    arrayWrong.forEach(value => setAGResultWordsItem(value, 0));
  }

  /*заполняет строку для одного слова, навешивает обработчик*/

  function setAGResultWordsItem(object: IWordAPI, arrNum: number) {
    const div = document.createElement('div');
    const html = `<div class="audio-result-word-item" data-audio="${object.audio}">
      <svg class="voice-small-svg" width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 10.9998V6.99983C1 6.73461 1.10536 6.48026 1.29289 6.29272C1.48043 6.10518 1.73478 5.99983 2 5.99983H4.697C4.89453 5.99987 5.08765 5.94141 5.252 5.83183L9.445 3.03583C9.59574 2.93525 9.77098 2.87753 9.95198 2.86883C10.133 2.86013 10.313 2.90077 10.4726 2.98642C10.6323 3.07207 10.7658 3.19951 10.8586 3.3551C10.9515 3.5107 11.0004 3.68861 11 3.86983V14.1298C11 14.3109 10.9509 14.4885 10.8579 14.6438C10.7648 14.7991 10.6314 14.9263 10.4718 15.0117C10.3121 15.0971 10.1323 15.1376 9.95148 15.1288C9.77065 15.12 9.5956 15.0623 9.445 14.9618L5.252 12.1668C5.08754 12.0576 4.89443 11.9995 4.697 11.9998H2C1.73478 11.9998 1.48043 11.8945 1.29289 11.7069C1.10536 11.5194 1 11.265 1 10.9998V10.9998Z" stroke="#41445C" stroke-width="1.5"/>
      <path d="M15.5 4.5C15.5 4.5 17 6 17 8.5C17 11 15.5 12.5 15.5 12.5" stroke="#41445C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.5 1.5C18.5 1.5 21 4 21 8.5C21 13 18.5 15.5 18.5 15.5" stroke="#41445C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="audio-result-word-text">${object.word}</p>
      <p class="audio-result-word-transcription">${object.transcription}</p>
      <p class="audio-result-word-translation">${object.wordTranslate}</p>
    </div>`;

    div.innerHTML = html;
    if (arrNum == 1) {
      audioResultRightWordsCont.appendChild(div);
    } else {
      audioResultWrongWordsCont.appendChild(div);
    }
    div.addEventListener('click', () => {
      getAudioFromApi(object.audio);
      setTimeout(playback, 100);
    })
  }

/*для перезапуска игры*/

audioRestartGgameBtn.addEventListener('click', () => {
  clearAllBeforeRestart();
})

function clearAllBeforeRestart() {
  wordsForAGarr.length = 0;
  currentQuestionNumber = 1;
  totalCorrectAnswers = 0;
  rightWordsArr.length = 0;
  wrongWordsArr.length = 0;
  currentWinStreak = 0;
  winStreakArr.length = 0;

  audioResultRightWordsCont.innerHTML = '';
  audioResultWrongWordsCont.innerHTML = '';
  audioResultModal.classList.add('visually-hidden');

  clearButtonsColor();
  clearSelectedButtonBorder();

  audioChoiceLevelModal.classList.remove('visually-hidden');
  audioChoiceLevelItems.forEach(item => item.classList.remove('audio-choice-level-item-active'));
  audioStartGameBtn.setAttribute('disabled', 'disabled');
}

/*для статистики*/

function setStatisticsAG() {
  if (localStorage.getItem('statisticsAG')) {
    statisticsAG = JSON.parse(localStorage.getItem('statisticsAG'));
  } else {
    statisticsAG = {
      newWords: 0,
      winRate: 0,
      longestWinStreak: 0,
      numberOfGames: 0 
    }
  }

  const pers = Math.round(totalCorrectAnswers / totalNumberOfQuestions * 100);
  statisticsAG.winRate = Math.round((statisticsAG.winRate * statisticsAG.numberOfGames + pers) / (statisticsAG.numberOfGames + 1));

  if (Math.max(...winStreakArr) > statisticsAG.longestWinStreak) {
    statisticsAG.longestWinStreak = Math.max(...winStreakArr);
  }

  statisticsAG.numberOfGames += 1;

  localStorage.setItem('statisticsAG', JSON.stringify(statisticsAG));

  // console.log('процент побед текущий: ' + statisticsAG.winRate);
  // console.log(winStreakArr);
  // console.log('лучшая серия: ' + Math.max(...winStreakArr))
}


};


export { audioGame };
