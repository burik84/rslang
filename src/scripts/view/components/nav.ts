const nav = () => {

  const navList = document.querySelectorAll('.nav-item');
  const navMainPageBtn = document.querySelector('#nav-main-page');
  const navDictionaryBtn = document.querySelector('#nav-dictionary');
  const navSprintGameBtn = document.querySelector('#nav-sprint-game');
  const navAudioGameBtn = document.querySelector('#nav-audio-game');
  const navStatisticsBtn = document.querySelector('#nav-statistics');

  const startPage = document.querySelector('#start-page');
  const dictionaryPage = document.querySelector('#dictionary-page');
  const sprintGamePage = document.querySelector('#sprint-game-page');
  const audioGamePage = document.querySelector('#audio-game-page');
  const statisticsPage = document.querySelector('#statistics-page');
  const footer = document.querySelector('#footer');

  const pageList = [startPage, dictionaryPage, sprintGamePage, audioGamePage, statisticsPage];
  console.log(pageList)
  console.log(navList);
  
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



}

export {nav};