import { IWordAPI } from '../../../shared/interface';
import { BaseComponent, elementBaseComponent } from './base';
import { urlAPI } from '../../../shared/api';
const classButtonPlaySound = 'button button__icon button__icon-play';
class Word {
  body: IWordAPI;
  signIn: boolean;
  statistics: number[];
  card: BaseComponent;
  buttonPlayWord: BaseComponent;
  buttonPlaySentense: BaseComponent;
  buttonPlayExample: BaseComponent;
  buttonWordDifficult: BaseComponent;
  buttonWordLearned: BaseComponent;
  constructor(body: IWordAPI, signIn: boolean, statistics: number[]) {
    this.body = body;
    this.signIn = signIn;
    this.statistics = statistics;
    this.card = new BaseComponent('li');
    this.buttonPlayWord = new BaseComponent('button');
    this.buttonPlaySentense = new BaseComponent('button');
    this.buttonPlayExample = new BaseComponent('button');
    this.buttonWordDifficult = new BaseComponent('button');
    this.buttonWordLearned = new BaseComponent('button');
  }
  init() {
    const picture: HTMLElement = document.createElement('figure');
    const image: HTMLImageElement = document.createElement('img');
    const caption: HTMLElement = document.createElement('figcaption');
    const textHeader: HTMLParagraphElement = document.createElement('p');
    const textStatic: HTMLParagraphElement = document.createElement('p');
    const textSentenseEnglish: HTMLParagraphElement = document.createElement('p');
    const textSentenseTranslate: HTMLParagraphElement = document.createElement('p');
    const textExampleEnglish: HTMLParagraphElement = document.createElement('p');
    const textExampleTranslate: HTMLParagraphElement = document.createElement('p');

    image.alt = `picture association ${this.body.word}`;
    image.src = `${urlAPI}/${this.body.image}`;

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
    textStatic.className = 'word__static';
    textStatic.insertAdjacentHTML(
      'afterbegin',
      `верно <span class="word__static-true">${this.statistics[0]}</span> / <span class="word__static-true">${this.statistics[1]}</span> не верно`
    );
    textSentenseEnglish.insertAdjacentHTML('afterbegin', this.body.textMeaning);
    textSentenseTranslate.textContent = this.body.textMeaningTranslate;
    textExampleEnglish.insertAdjacentHTML('afterbegin', this.body.textExample);
    textExampleTranslate.textContent = this.body.textExampleTranslate;

    picture.append(image, caption);

    const blockImage = elementBaseComponent('div', ['word__image'], [picture]);
    const blockWordIcons = elementBaseComponent(
      'div',
      ['word__icons'],
      [this.buttonWordDifficult.element, this.buttonWordLearned.element]
    );
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

    this.card.element.className = 'word';
    this.card.element.append(blockImage.element, blockDescription.element);
    return this.card;
  }
}

export { Word };
