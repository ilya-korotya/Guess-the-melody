import {getElementFromTemplate, getRandomMusic, randomValue} from '../utils.js';
import {renderInMain} from '../modules/ScreenManager.js';
import genre from './Genre.js';
import data from '../models/static.js';
import music from '../models/music.js';
import svg from '../models/svg.js';


export default () => {

  const SHOW_ANSWER = 3;

  const titleArtist = `<h2 class="title main-title">${data.artist.title}</h2>`;

  let randomMusic = getRandomMusic(music, SHOW_ANSWER);
  const rightAnswer = randomMusic[randomValue(0, SHOW_ANSWER)];

  const answerBlock = randomMusic.map((elem, index, arr) => {
    return `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${elem.trackID}" name="answer" value="val-${elem.trackID}" />
        <label class="main-answer" for="answer-${elem.trackID}">
          <img class="main-answer-preview" src="${elem.imgSrc}">
          ${elem.title}
        </label>
      </div>`;
  });

  const formArtist = `<form class="main-list">${answerBlock.join(``)}</form>`;

  const screenElem = getElementFromTemplate(`
    <section class="main main--level main--level-artist">
      ${svg}
    <div class="main-wrap">
      <div class="main-timer"></div>
      ${titleArtist}
      <div class="player-wrapper"></div>
      ${formArtist}
    </div>
  </section>
  `);

  window.initializeCountdown(screenElem);
  window.initializePlayer(screenElem, screenElem.querySelector(`.player-wrapper`), rightAnswer.resSrc);
  Array.from(screenElem.querySelectorAll(`.main-answer`)).forEach((elem, index, array) => {
    elem.addEventListener(`click`, (event)=>{
      renderInMain(genre());
    });
  });

  return screenElem;

};
