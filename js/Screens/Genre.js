import {getElementFromTemplate} from '../utils.js';
import {randomValue, getRandomMusic} from '../utils.js';
import {renderInMain} from '../modules/ScreenManager.js';
import result from './Result.js';
import data from '../models/static.js';
import music from '../models/music.js';
import svg from '../models/svg.js';

export default () => {
  const SHOW_NOTES = 4;

  let randomMusic = getRandomMusic(music, SHOW_NOTES);

  const titleGenre = `<h2 class="title">${data.genre.title}</h2>`;

  let nextButton = `<button class="genre-answer-send" type="submit">${data.buttons.answerButton}</button>`;

  const options = randomMusic.map((elem, index, arr) => {
    return `<div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${elem.ganre}" id="${elem.trackID}">
        <label class="genre-answer-check" for="${elem.trackID}"></label>
      </div>`;
  });

  const formGenre = `<form class="genre">
    ${options.join(``)}
    ${nextButton}
    </form>`;

  const screenElem = getElementFromTemplate(`<section class="main main--level main--level-genre">
    ${svg}
    ${titleGenre}
    <form class="genre">
    ${formGenre}
    </form>
  </section>`);

  nextButton = screenElem.querySelector(`.genre-answer-send`);
  nextButton.disabled = true;

  const answers = Array.from(screenElem.querySelectorAll(`input[name='answer']`));
  answers.forEach((elem, index, array)=>{
    elem.addEventListener(`change`, (evt)=>{
      // Если чекнут хоть один chekbox отключаем disabled кнопки
      nextButton.disabled = !answers.find((answer) => answer.checked === true);
    });
  });

  nextButton.addEventListener(`click`, (evt) => {
    renderInMain(result(randomValue()));
  });

  window.initializeCountdown(screenElem);

  const allPlayers = screenElem.querySelectorAll(`.player-wrapper`);
  allPlayers.forEach((elem, index, array)=>{
    window.initializePlayer(screenElem, elem, randomMusic[index].resSrc);
  });

  return screenElem;
};
