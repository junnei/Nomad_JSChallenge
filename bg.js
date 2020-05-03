const body = document.querySelector("body"),
  view = body.querySelector("header").querySelector('.view');

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `./images/${imgNumber + 1}.jpg`;
  view.setAttribute("style",`background-image: url(${image.src});  background-repeat: no-repeat; background-size: cover; background-position: center center;`);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();