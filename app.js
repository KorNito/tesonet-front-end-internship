const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const inputErrorMessage = document.querySelector(".error");

toDoButton.addEventListener("click", submitForm);
toDoList.addEventListener("click", handleToDoAction);

function submitForm(event) {
  event.preventDefault();

  if (toDoInput.value.trim() === "") {
    showErrorMessage();
  } else {
    addToDo();
  }
}

function addToDo() {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  const newTodo = document.createElement("li");
  newTodo.innerText = toDoInput.value;
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

  toDoInput.value = "";
}

function handleToDoAction(event) {
  const toDo = event.target;

  if (toDo.classList.contains("remove-button")) {
    toDo.parentElement.remove();
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
