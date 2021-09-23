const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const inputErrorMessage = document.querySelector(".error");

document.addEventListener("DOMContentLoaded", displayToDos);
toDoButton.addEventListener("click", submitForm);
toDoList.addEventListener("click", handleToDoAction);

function displayToDos() {
  const toDos = getToDosFromLocalStorage();

  toDos.forEach((toDo) => addToDoToList(toDo));
}

function submitForm(event) {
  event.preventDefault();

  const toDoExistInLocalStorage = checkIfIExistsInLocalStorage(toDoInput.value);

  if (toDoInput.value.trim() === "") {
    showErrorMessage("Input field must not be empty");
  } else if (toDoExistInLocalStorage) {
    showErrorMessage("To do already exists");
  } else {
    let toDo = {
      name: toDoInput.value,
    };

    addToDoToList(toDo);

    addToDosToLocalStorage(toDo);

    toDoInput.value = "";
  }
}

function addToDoToList(toDo) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  const newTodo = document.createElement("li");
  newTodo.innerText = toDo.name;
  newTodo.classList.add("todo-li");
  todoDiv.appendChild(newTodo);

  const markButton = document.createElement("button");
  markButton.innerText = "Mark";
  markButton.classList.add("mark-button");
  todoDiv.appendChild(markButton);

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("remove-button");
  todoDiv.appendChild(removeButton);

  toDoList.appendChild(todoDiv);
}

function handleToDoAction(event) {
  const toDo = event.target;

  if (toDo.classList.contains("remove-button")) {
    toDo.parentElement.remove();
    removeToDoFromLocalStorage(toDo.parentElement.children[0].textContent);
  }

  if (toDo.classList.contains("mark-button")) {
    toDo.parentElement.firstElementChild.classList.toggle("marked");
  }
}

function showErrorMessage(message) {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-container");

  const errorParagraph = document.createElement("p");
  errorParagraph.classList.add("error-message");
  errorParagraph.innerText = message;
  errorDiv.appendChild(errorParagraph);

  const form = document.querySelector(".form");
  form.insertAdjacentElement("beforebegin", errorDiv);

  setTimeout(() => document.querySelector(".error-container").remove(), 1000);
}

function getToDosFromLocalStorage() {
  let toDos;

  if (localStorage.getItem("toDos") == null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }

  return toDos;
}

function addToDosToLocalStorage(toDo) {
  const toDos = getToDosFromLocalStorage();

  toDos.push(toDo);

  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function removeToDoFromLocalStorage(toDoName) {
  const toDos = getToDosFromLocalStorage();

  toDos.forEach((toDo, index) => {
    if (toDo.name === toDoName) {
      toDos.splice(index, 1);
    }
  });

  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function checkIfIExistsInLocalStorage(toDoName) {
  const items = localStorage.getItem("toDos");

  let itemExists = false;

  if (items) {
    const itemsData = JSON.parse(items);
    itemExists = itemsData.find((item) => item.name === toDoName);
  }

  return itemExists;
}
