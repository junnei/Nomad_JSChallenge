const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function deleteName(event) {
  const btn = event.target;
  greeting.removeChild(btn);
  greeting.classList.remove(SHOWING_CN);
  greeting.style.display="none";
  const currentUser = localStorage.getItem(USER_LS);
  localStorage.removeItem(USER_LS, currentUser);
  loadName();
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.style.display="block";
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  form.style.display="none";
  greeting.classList.add(SHOWING_CN);
  greeting.style.display="block";
  greeting.innerText = `Hello ${text}`;
  const delBtn = document.createElement("button");
  delBtn.classList.add("btn");
  delBtn.classList.add("btn-outline-white");
  delBtn.classList.add("btn-round");
  delBtn.style.padding="3px";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteName);
  greeting.appendChild(delBtn);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
  form.addEventListener("submit", handleSubmit);
}

init();