import { IWordAPI } from '../../../shared/interface';
import { BaseComponent, elementBaseComponent } from './base';
import { urlAPI } from '../../../shared/api';
import { getSpinner } from '../elements';
import { loadImage, audioPlayWord } from '../../../shared/services';
import { svgDifficult, svgLearning } from '../../../shared/svg';
import { controllers } from '../../../controllers/controller';

const classButtonPlaySound = 'button button__icon button__icon-play';
class Word {
  body: IWordAPI;
  signIn: boolean;
  statistics: number[];
  isDifficult: boolean;
  isLearning: boolean;
  card: BaseComponent;
  buttonPlayWord: BaseComponent;
  buttonPlaySentense: BaseComponent;
  buttonPlayExample: BaseComponent;
  buttonWordDifficult: BaseComponent;
  buttonWordLearned: BaseComponent;

  constructor(
    body: IWordAPI,
    signIn: boolean,
    statistics: number[],
    isDifficult = false,
    isLearning = false
  ) {
    this.body = body;
    this.signIn = signIn;
    this.statistics = statistics;
    this.isDifficult = isDifficult;
    this.isLearning = isLearning;
    this.card = new BaseComponent('li');
    this.buttonPlayWord = new BaseComponent('button');
    this.buttonPlaySentense = new BaseComponent('button');
    this.buttonPlayExample = new BaseComponent('button');
    this.buttonWordDifficult = new BaseComponent('button');
    this.buttonWordLearned = new BaseComponent('button');
  }
  init() {
    const srcImage = `${urlAPI}/${this.body.image}`;
    const srcAudioWord = `${urlAPI}/${this.body.audio}`;
    const srcAudioExample = `${urlAPI}/${this.body.audioExample}`;
    const srcAudioSentense = `${urlAPI}/${this.body.audioMeaning}`;
    const picture: HTMLElement = document.createElement('figure');
    const image: HTMLImageElement = document.createElement('img');
    const caption: HTMLElement = document.createElement('figcaption');
    const textHeader: HTMLParagraphElement = document.createElement('p');
    const textStatic: HTMLParagraphElement = document.createElement('p');
    const textSentenseEnglish: HTMLParagraphElement = document.createElement('p');
    const textSentenseTranslate: HTMLParagraphElement = document.createElement('p');
    const textExampleEnglish: HTMLParagraphElement = document.createElement('p');
    const textExampleTranslate: HTMLParagraphElement = document.createElement('p');
    const spinner: HTMLDivElement = getSpinner.add();

    image.alt = `picture association ${this.body.word}`;

    loadImage(srcImage)
      .then((data: HTMLImageElement) => {
        image.src = srcImage;
        // picture.append(image)
        if (data) this.hideSpinner();
        return data;
      })
      .then((data) => {
        picture.classList.add('no-blur');
      })
      .catch((error) => {
        image.alt = "undefined picter's";
      });

    textHeader.className = 'word__header-text';
    this.buttonPlayWord.element.className = classButtonPlaySound;
    this.buttonPlaySentense.element.className = classButtonPlaySound;
    this.buttonPlayExample.element.className = classButtonPlaySound;
    this.buttonWordDifficult.element.className = 'button button__icon button__icon-difficult';
    this.buttonWordLearned.element.className = 'button button__icon button__icon-learned';
    textSentenseEnglish.className = 'sentense__english';
    textSentenseTranslate.className = 'sentense__translate';
    textExampleEnglish.className = 'example__english';
    textExampleTranslate.className = 'example__translate';

    caption.textContent = this.body.word;
    textHeader.insertAdjacentHTML(
      'afterbegin',
      `<span>${this.body.transcription}</span><span>${this.body.wordTranslate}</span>`
    );
    textStatic.className = this.signIn ? 'word__static open' : 'word__static';
    textStatic.insertAdjacentHTML(
      'afterbegin',
      `верно <span class="word__static-true">${this.statistics[0]}</span> / <span class="word__static-true">${this.statistics[1]}</span> не верно`
    );
    textSentenseEnglish.insertAdjacentHTML('afterbegin', this.body.textMeaning);
    textSentenseTranslate.textContent = this.body.textMeaningTranslate;
    textExampleEnglish.insertAdjacentHTML('afterbegin', this.body.textExample);
    textExampleTranslate.textContent = this.body.textExampleTranslate;

    picture.append(image, caption);

    this.buttonWordDifficult.element.insertAdjacentHTML('afterbegin', svgDifficult());
    this.buttonWordLearned.element.insertAdjacentHTML('afterbegin', svgLearning());

    const blockImage = elementBaseComponent('div', ['word__image'], [picture]);
    const blockWordIcons = this.signIn
      ? elementBaseComponent(
          'div',
          ['word__icons'],
          [this.buttonWordDifficult.element, this.buttonWordLearned.element]
        )
      : elementBaseComponent('div', ['word__icons'], []);
    const blockHeader = elementBaseComponent(
      'div',
      ['word__header'],
      [this.buttonPlayWord.element, textHeader, blockWordIcons.element, textStatic]
    );
    const blockSentense = elementBaseComponent(
      'div',
      ['word__sentense'],
      [this.buttonPlaySentense.element, textSentenseEnglish, textSentenseTranslate]
    );
    const blockExample = elementBaseComponent(
      'div',
      ['word__example'],
      [this.buttonPlayExample.element, textExampleEnglish, textExampleTranslate]
    );
    const blockDescription = elementBaseComponent(
      'div',
      ['word__description'],
      [blockHeader.element, blockSentense.element, blockExample.element]
    );
    this.buttonPlayWord.element.addEventListener('click', () => {
      audioPlayWord(srcAudioWord);
    });
    this.buttonPlaySentense.element.addEventListener('click', () => {
      audioPlayWord(srcAudioSentense);
    });
    this.buttonPlayExample.element.addEventListener('click', () => {
      audioPlayWord(srcAudioExample);
    });

    this.buttonWordDifficult.element.addEventListener('click', () => {
      if ((!this.isDifficult && !this.isLearning) || controllers.wordsGroup === '6') {
        this.isDifficult = !this.isDifficult;
      }
      if (this.isDifficult && !this.buttonWordDifficult.element.classList.contains('check'))
        this.buttonWordDifficult.element.classList.add('check');
      if (controllers.wordsGroup === '6') {
        if (this.buttonWordDifficult.element.classList.contains('check'))
          this.buttonWordDifficult.element.classList.remove('check');
      }
      this.renderIcon();
    });
    this.buttonWordLearned.element.addEventListener('click', () => {
      this.isLearning = !this.isLearning;
      this.isDifficult = false;
      if (!this.buttonWordDifficult.element.classList.contains('check'))
        this.buttonWordDifficult.element.classList.add('check');
      if (!this.isLearning && this.buttonWordDifficult.element.classList.contains('check'))
        this.buttonWordDifficult.element.classList.remove('check');
      this.renderIcon();
    });

    this.card.element.className = 'word';
    this.card.element.append(blockImage.element, blockDescription.element, spinner);

    return this.card;
  }
  showSpinner() {
    const spinnerElement = this.card.element.querySelector('.loading');
    if (!spinnerElement.classList.contains('active')) spinnerElement.classList.add('active');
  }
  hideSpinner() {
    const spinnerElement = this.card.element.querySelector('.loading');
    if (spinnerElement.classList.contains('active')) spinnerElement.classList.remove('active');
  }
  renderIcon() {
    const defaultColor = '#C4C4C4';
    const colorIconDifficult: string = this.isDifficult ? 'red' : defaultColor;
    const colorIconLearning: string = this.isLearning ? 'green' : defaultColor;

    while (this.buttonWordDifficult.element.firstChild) {
      this.buttonWordDifficult.element.removeChild(this.buttonWordDifficult.element.firstChild);
    }

    while (this.buttonWordLearned.element.firstChild) {
      this.buttonWordLearned.element.removeChild(this.buttonWordLearned.element.firstChild);
    }
    this.buttonWordDifficult.element.insertAdjacentHTML(
      'afterbegin',
      svgDifficult(colorIconDifficult)
    );
    this.buttonWordLearned.element.insertAdjacentHTML('afterbegin', svgLearning(colorIconLearning));
  }
}

export { Word };
