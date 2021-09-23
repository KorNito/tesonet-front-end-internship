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

  if (toDoInput.value.trim() === "") {
    showErrorMessage();
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

function showErrorMessage() {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-container");

  const errorParagraph = document.createElement("p");
  errorParagraph.classList.add("error-message");
  errorParagraph.innerText = "Input field must not be empty";
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
