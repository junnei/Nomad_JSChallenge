const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");


function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = 
  `${hours < 12 ? `오전` : `오후`} ${hours%12 === 0 ? `12` : hours%12 < 10 ? `0${hours%12}` : hours%12}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();