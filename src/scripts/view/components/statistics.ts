import { controllers } from "../../controllers/controller";

const statistics = () => {

  const statisticsNonAuthorisedModal = document.querySelector('#statistics-non-authorised-modal');

  function showStatisticsModal() {
    if (controllers.isUserSignIn == true) {
        statisticsNonAuthorisedModal.classList.add('visually-hidden');
    } else {
        statisticsNonAuthorisedModal.classList.remove('visually-hidden');
    }
  }

  document.querySelector('#nav-statistics').addEventListener('click', showStatisticsModal)

  document.querySelector('#nav-statistics-adaptive').addEventListener('click', showStatisticsModal)


}

export { statistics };