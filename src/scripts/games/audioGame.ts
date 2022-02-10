import { urlAPI } from '../shared/api';
import { getExampleWords } from '../shared/exampleWords';
import { IWordAPI } from '../shared/interface';

const audioGame = () => {

    const repeatVoiceButton = document.querySelector('#audio-repeat-voice-button');
    const answerButton1 = document.querySelector('#audio-answer-button-1');
    const answerButton2 = document.querySelector('#audio-answer-button-2');
    const answerButton3 = document.querySelector('#audio-answer-button-3');
    const answerButton4 = document.querySelector('#audio-answer-button-4');
    const nextQuestionButton = document.querySelector('#audio-next-question-button');

    const currentQuestionHTMLCounter = document.querySelector('#audio-current-question-number');
    const totalQuestionHTMLCounter = document.querySelector('#audio-total-question-number');

    const wordsForAGarr: Array<IWordAPI> = [];

    /*функции для получения аудио с сервера и последующего воспроизведения по клику*/

    const ctx = new AudioContext();
    let audio: any;

    function getAudioFromApi(urlSound: string) {
        fetch(`${urlAPI}/${urlSound}`)
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
            .then(decodedAudio => {
                audio = decodedAudio;
            })
    }

    getAudioFromApi('files/02_0621.mp3')

    function playback() {
        const playSound = ctx.createBufferSource();
        playSound.buffer = audio;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
    }

    /*забирает нужные слова с сервера, закидывает их в массив*/

    function getWordsFromAPI(page: number, group: number) {
        const resp = fetch(`${urlAPI}/words?page=${page}&group=${group}`)
            .then(response => response.json())
            .then(((data) => {
                // return data
                wordsForAGarr.push(...data);
                totalQuestionHTMLCounter.innerHTML = String(wordsForAGarr.length / 4);
            }))
            // .then(((data) => console.log(data)))
    }

    /*создает массив из 80 (или меньше) слов в зависимости от страницы*/

    
    function getWordsForAG(page: number, group: number) {
        const pageNumsArr: Array<number> = [];
        for (let i = 0; i < 4; i++) {
            if (page - i >= 0) {
                pageNumsArr.push(page - i);
            } 
        }
        pageNumsArr.forEach(value => getWordsFromAPI(value, 1));
        // console.log(wordsForAGarr)
    }

    getWordsForAG(2, 1)

    /*создания массива с номерами вопросов, пока что заглушка, потом будет генерироваться исходя из условий*/

    const arrStartNumbers: Array<number> = Array(20).fill(0).map((x, idx) => idx);
    // let setNumbersWords: any = new Set(arrStartNumbers);

    let currentQuestionNumber;

    function setQuestionAG(arrStartNumbers: Array<number>, currentQuestionNumber: number) {
        answerButton1.innerHTML = getExampleWords[arrStartNumbers[currentQuestionNumber * 4 - 4 + 0]].word;
        answerButton2.innerHTML = getExampleWords[arrStartNumbers[currentQuestionNumber * 4 - 4 + 1]].word;
        answerButton3.innerHTML = getExampleWords[arrStartNumbers[currentQuestionNumber * 4 - 4 + 2]].word;
        answerButton4.innerHTML = getExampleWords[arrStartNumbers[currentQuestionNumber * 4 - 4 + 3]].word; 
    }

    setQuestionAG(arrStartNumbers, 1)

    /* 1я меняет цвета кнопок после ответа и блокирует их / 2я возращает как было */
    
    function fillButtonsInColor (correctAnswernumber: number) {
        [answerButton1, answerButton2, answerButton3, answerButton4].forEach(value => value.classList.add('audio-answer-button-false'));
        [answerButton1, answerButton2, answerButton3, answerButton4][correctAnswernumber - 1].classList.add('audio-answer-button-true');
        [answerButton1, answerButton2, answerButton3, answerButton4].forEach(value => value.setAttribute('disabled', 'disabled'));
    }

    function clearButtonsColor() {
        [answerButton1, answerButton2, answerButton3, answerButton4].forEach(value => value.classList.remove('audio-answer-button-false'));
        [answerButton1, answerButton2, answerButton3, answerButton4].forEach(value => value.classList.remove('audio-answer-button-true'));
        [answerButton1, answerButton2, answerButton3, answerButton4].forEach(value => value.removeAttribute('disabled'));
    }

    // fillButtonsInColor(2)

    /*обработчики для кнопок*/

    repeatVoiceButton.addEventListener('click', () => {
        console.log('voice click');
        playback();
    })

    answerButton1.addEventListener('click', () => {
        console.log('answerButton1 click')
        fillButtonsInColor(1)
    })

    answerButton2.addEventListener('click', () => {
        console.log('answerButton2 click')
        fillButtonsInColor(2)
    })

    answerButton3.addEventListener('click', () => {
        console.log('answerButton3 click')
        fillButtonsInColor(3)
    })

    answerButton4.addEventListener('click', () => {
        console.log('answerButton4 click')
        fillButtonsInColor(4)
    })

    nextQuestionButton.addEventListener('click', () => {
        console.log('nextQuestionButton click')
        clearButtonsColor()
    })


}

export { audioGame };
