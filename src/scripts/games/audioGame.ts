import { urlAPI } from '../shared/api';
import { IWordAPI } from '../shared/interface';

const audioGame = () => {
  const repeatVoiceButton = document.querySelector(
    '#audio-repeat-voice-button'
  );
  const answerButton1 = document.querySelector('#audio-answer-button-1');
  const answerButton2 = document.querySelector('#audio-answer-button-2');
  const answerButton3 = document.querySelector('#audio-answer-button-3');
  const answerButton4 = document.querySelector('#audio-answer-button-4');
  const nextQuestionButton = document.querySelector(
    '#audio-next-question-button'
  );

  const currentQuestionHTMLCounter = document.querySelector(
    '#audio-current-question-number'
  );
  const totalQuestionHTMLCounter = document.querySelector(
    '#audio-total-question-number'
  );

  const wordsForAGarr: Array<IWordAPI> = [];
  let currentQuestionNumber = 1;
  let totalNumberOfQuestions: number;
  let correctAnswerNumber: number;
  let totalCorrectAnswers = 0;

  /*функции для получения аудио с сервера и последующего воспроизведения по клику*/

  const ctx = new AudioContext();
  let audio: any;

  function getAudioFromApi(urlSound: string) {
    fetch(`${urlAPI}/${urlSound}`)
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((decodedAudio) => {
        audio = decodedAudio;
      });
  }

  getAudioFromApi('files/02_0621.mp3');

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
        // console.log(wordsForAGarr)
        console.log('слов в массиве: ' + wordsForAGarr.length);
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

  getWordsForAG(
    3,
    3
  ); /*Это нужно будет выполнить когда пользователь выберет сложность для запуска*/

  /*генерируют вопросы*/

  function setFirstQuestionAG() {
    setQuestionAG(1);
  }

  function setQuestionAG(currentQuestionNumber: number) {
    currentQuestionHTMLCounter.innerHTML = String(currentQuestionNumber);
    disabledNextButton();

    answerButton1.innerHTML =
      wordsForAGarr[4 * (currentQuestionNumber - 1) + 0].word;
    answerButton2.innerHTML =
      wordsForAGarr[4 * (currentQuestionNumber - 1) + 1].word;
    answerButton3.innerHTML =
      wordsForAGarr[4 * (currentQuestionNumber - 1) + 2].word;
    answerButton4.innerHTML =
      wordsForAGarr[4 * (currentQuestionNumber - 1) + 3].word;

    correctAnswerNumber = Math.floor(Math.random() * 4);
    // console.log(correctAnswerNumber)

    const voice =
      wordsForAGarr[4 * (currentQuestionNumber - 1) + correctAnswerNumber]
        .audio;
    console.log(
      'ответ: ' +
        wordsForAGarr[4 * (currentQuestionNumber - 1) + correctAnswerNumber]
          .word
    );
    console.log('--------------------');
    getAudioFromApi(voice);
    // if (currentQuestionNumber > 1) {
    //     playback()
    // }
  }

  /*проверяет, правильный ли ответ и переходит к следующему*/

  function checkAnswerAG(userSelect: number) {
    if (userSelect == correctAnswerNumber) {
      totalCorrectAnswers += 1;
      console.log('правильно!');
    } else {
      console.log('неправильно!');
    }
    console.log('всего правильных ответов: ' + totalCorrectAnswers);

    currentQuestionNumber += 1;
  }

  /* 1я меняет цвета кнопок после ответа и блокирует их / 2я возращает как было */

  function fillButtonsInColor(correctAnswernumber: number) {
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach(
      (value) => value.classList.add('audio-answer-button-false')
    );
    [answerButton1, answerButton2, answerButton3, answerButton4][
      correctAnswernumber
    ].classList.add('audio-answer-button-true');
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach(
      (value) => value.setAttribute('disabled', 'disabled')
    );
  }

  function clearButtonsColor() {
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach(
      (value) => value.classList.remove('audio-answer-button-false')
    );
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach(
      (value) => value.classList.remove('audio-answer-button-true')
    );
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach(
      (value) => value.removeAttribute('disabled')
    );
  }

  /*обработчики для кнопок*/

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
    [answerButton1, answerButton2, answerButton3, answerButton4].forEach(
      (value) => value.classList.remove('audio-answer-button-selected')
    );
  }

  function answerButtonHandler(buttonNumber: number) {
    fillButtonsInColor(correctAnswerNumber);
    checkAnswerAG(buttonNumber);
    enableNextButton();
    setSelectedButtonBorder(buttonNumber);
  }

  repeatVoiceButton.addEventListener('click', () => {
    console.log('voice click');
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
      console.log('Игра закончена! Ваш результат: ' + totalCorrectAnswers);
    }
  });
};

export { audioGame };
