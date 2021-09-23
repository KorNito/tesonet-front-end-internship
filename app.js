const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");

toDoButton.addEventListener("click", addTodo);
toDoList.addEventListener("click", handleToDoAction);

function addTodo(event) {
  event.preventDefault();

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
