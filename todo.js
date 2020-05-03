const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
const TODOS_ID = "id";
const FINISHED_LS = "finishedToDo";

let toDosID = 0;
let toDos = [];
let finishedToDos = [];

function paintToDo(obj) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", removeToDo);
  finishBtn.innerText = "✅";
  finishBtn.addEventListener("click", finishToDo);
  span.innerText = obj.text;
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  li.appendChild(span);
  li.id = obj.id;
  toDoList.appendChild(li);
  const toDoObj = {
    text: obj.text,
    id: obj.id
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintFinished(obj) {
  const li = document.createElement("li");
  const restoreBtn = document.createElement("button");
  const span = document.createElement("span");
  restoreBtn.innerText = "⟲";
  restoreBtn.addEventListener("click", restoreToDo);
  span.innerText = obj.text;
  li.appendChild(restoreBtn);
  li.appendChild(span);
  li.id = obj.id;
  finishedList.appendChild(li);
  const finishObj = {
    text: obj.text,
    id: obj.id
  };
  finishedToDos.push(finishObj);
  saveFinish();
}

function removeToDo(event) {
  const btn = event.target;
  const parent = btn.parentNode;
  toDoList.removeChild(parent);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(parent.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function finishToDo(event) {
  const btn = event.target;
  const parent = btn.parentNode;
  toDoList.removeChild(parent);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(parent.id, 10);
  });

  const addToDos = toDos.find(function(toDo) {
    return toDo.id === parseInt(parent.id, 10);
  });

  const li = document.createElement("li");
  const finishBtn = document.createElement("button");
  const span = document.createElement("span");
  finishBtn.innerText = "⟲";
  finishBtn.addEventListener("click", restoreToDo);
  span.innerText = addToDos.text;
  li.appendChild(finishBtn);
  li.appendChild(span);
  li.id = addToDos.id;
  finishedList.appendChild(li);

  toDos = cleanToDos;
  saveToDos();
  finishedToDos = finishedToDos.concat(addToDos);
  saveFinish();
}

function restoreToDo(event) {
  const btn = event.target;
  const parent = btn.parentNode;
  finishedList.removeChild(parent);

  const cleanToDos = finishedToDos.filter(function(toDo) {
    return toDo.id !== parseInt(parent.id, 10);
  });
  const addToDo = finishedToDos.find(function(toDo) {
    return toDo.id === parseInt(parent.id, 10);
  });

  finishedToDos = cleanToDos;

  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", removeToDo);
  finishBtn.innerText = "✅";
  finishBtn.addEventListener("click", finishToDo);
  span.innerText = addToDo.text;
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  li.appendChild(span);
  li.id = addToDo.id;
  toDoList.appendChild(li);

  toDos = toDos.concat(addToDo);
  saveToDos();
  saveFinish();
}

function saveFinish() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDos));
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(TODOS_ID, toDosID);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const newID = toDosID + 1;
  const toDoObj = {
    id: newID,
    text: currentValue
  };
  toDosID = newID;
  paintToDo(toDoObj);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (localStorage.getItem(TODOS_ID) !== null) {
    toDosID = parseInt(localStorage.getItem(TODOS_ID), 10);
  }
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo);
    });
  }
}

function loadRestore() {
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedFinished !== null) {
    const parsedToDos = JSON.parse(loadedFinished);
    parsedToDos.forEach(function(toDo) {
      paintFinished(toDo);
    });
  }
}

function init() {
  loadToDos();
  loadRestore();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();