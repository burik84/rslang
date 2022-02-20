const nav = () => {

  const navList = document.querySelectorAll('.nav-item');
  const navMainPageBtn = document.querySelector('#nav-main-page');
  const navDictionaryBtn = document.querySelector('#nav-dictionary');
  const navSprintGameBtn = document.querySelector('#nav-sprint-game');
  const navAudioGameBtn = document.querySelector('#nav-audio-game');
  const navStatisticsBtn = document.querySelector('#nav-statistics');

  const navMainPageBtnA = document.querySelector('#nav-main-page-adaptive');
  const navDictionaryBtnA = document.querySelector('#nav-dictionary-adaptive');
  const navSprintGameBtnA = document.querySelector('#nav-sprint-game-adaptive');
  const navAudioGameBtnA = document.querySelector('#nav-audio-game-adaptive');
  const navStatisticsBtnA = document.querySelector('#nav-statistics-adaptive');

  const startPage = document.querySelector('#start-page');
  const dictionaryPage = document.querySelector('#dictionary-page');
  const sprintGamePage = document.querySelector('#sprint-game-page');
  const audioGamePage = document.querySelector('#audio-game-page');
  const statisticsPage = document.querySelector('#statistics-page');
  const footer = document.querySelector('#footer');

  const pageList = [startPage, dictionaryPage, sprintGamePage, audioGamePage, statisticsPage];
  
  function switchActiveTab(currentTabsNum: number) {
    navList.forEach(value => value.classList.remove('nav-item-active'));
    navList[currentTabsNum].classList.add('nav-item-active');
  }
  
  function hideUnnecessaryBlocks(currentTabsNum: number) {
    pageList.forEach(value => value.classList.add('visually-hidden'));
    pageList[currentTabsNum].classList.remove('visually-hidden');
    if (currentTabsNum == 0) {
      footer.classList.remove('visually-hidden');
    } else {
      footer.classList.add('visually-hidden');
    }
  }

  function closeAdaptiveMenu() {
    document.querySelector('.menu__button').classList.remove('open');
    document.querySelector('.menu-adaptive').classList.remove('open');
  }

  navMainPageBtn.addEventListener('click', () => {
    switchActiveTab(0);
    hideUnnecessaryBlocks(0);
  })

  navDictionaryBtn.addEventListener('click', () => {
    switchActiveTab(1);
    hideUnnecessaryBlocks(1);
  })

  navSprintGameBtn.addEventListener('click', () => {
    switchActiveTab(2);
    hideUnnecessaryBlocks(2);
  })

  navAudioGameBtn.addEventListener('click', () => {
    switchActiveTab(3);
    hideUnnecessaryBlocks(3);
  })

  navStatisticsBtn.addEventListener('click', () => {
    switchActiveTab(4);
    hideUnnecessaryBlocks(4);
  })

  navMainPageBtnA.addEventListener('click', () => {
    closeAdaptiveMenu();
    hideUnnecessaryBlocks(0);
  })

  navDictionaryBtnA.addEventListener('click', () => {
    closeAdaptiveMenu();
    hideUnnecessaryBlocks(1);
  })

  navSprintGameBtnA.addEventListener('click', () => {
    closeAdaptiveMenu();
    hideUnnecessaryBlocks(2);
  })

  navAudioGameBtnA.addEventListener('click', () => {
    closeAdaptiveMenu();
    hideUnnecessaryBlocks(3);
  })

  navStatisticsBtnA.addEventListener('click', () => {
    closeAdaptiveMenu();
    hideUnnecessaryBlocks(4);
  })

  /*для перехода в аудиоигру из учебника*/
  document.querySelector('#dictionary-button-audio').addEventListener('click', () =>{
    closeAdaptiveMenu();
    switchActiveTab(3);
    hideUnnecessaryBlocks(3);
  })

}

export {nav};