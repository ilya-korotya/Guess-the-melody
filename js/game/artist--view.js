import AbstractView from '../view.js';
import data from '../models/static.js';

export default class ArtistView extends AbstractView {
  constructor(dataSong) {
    super();
    this.dataSong = dataSong;
  }

  get template() {

    const titleArtist = `<h2 class="title main-title">${data.artist.title}</h2>`;

    const answer = this.dataSong.randomMusic.map((elem, index, arr) => {
      return `<div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${elem.trackID}" name="answer" value="${elem.trackID}" />
              <label class="main-answer" for="answer-${elem.trackID}" value="${elem.trackID}">
                <img class="main-answer-preview" src="${elem.imgSrc}">
                ${elem.title}
              </label>
            </div>`;
    });

    const formArtist = `<form class="main-list">${answer.join(``)}</form>`;

    return `<section class="main main--level main--level-artist">
    <div class="main-wrap">
      <div class="main-timer"></div>
      ${titleArtist}
      <div class="player-wrapper  player-wrapper--artist"></div>
      ${formArtist}
    </div>
  </section>`;
  }

  chekedAnswer(target) {
    if (+target.attributes.value.value === +this.dataSong.rightAnswer.trackID) {
      return true;
    }
    return false;
  }

  bind() {
    [...this.element.querySelectorAll(`.main-answer`)].forEach((elem, index, arr)=>{
      elem.addEventListener(`click`, (evt)=>{
        this.nextLevel(evt);
      });
    });
  }

  nextLevel(evt) {

  }

  initPlayer() {
    window.initializePlayer(document.querySelector(`.player-wrapper`), this.dataSong.rightAnswer.resSrc);
  }
}
