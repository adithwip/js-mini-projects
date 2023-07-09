// Kumpulkan semua UI

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

/*
Kita akan membuat berbagai eventListner
yang akan kita koneksikan dengan DOM
*/

// Load begitu file JS ini dirun
immediateLoadEventListeners();

function immediateLoadEventListeners() {
  // Get todos from localStorage and render
  document.addEventListener("DOMContentLoaded", getTodos);

  // Add todo event
  todoForm.addEventListener("submit", addTodo);

  // Delete todo event
  todoList.addEventListener("click", deleteTodo);

  // Clear todo list
  clearButton.addEventListener("click", clearTodos);

  // Filtering todo list
  filterInput.addEventListener("keyup", filterTodos);
}

// --- Reusable codes

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function setItemToLocalStorage(item) {
  localStorage.setItem("todos", JSON.stringify(item));
}

function createTodoElement(value) {
  // Membuat element li
  const li = document.createElement("li");
  // Tambahkan class pada element li
  li.className =
    "list-group-item d-flex justify-content-between align-items-center mb-1 todo-item";
  // Tambahkan id pada element li
  li.id = "todo-item";
  // Memasukkan child ke dalam element li
  li.appendChild(document.createTextNode(value));

  // Membuat delete button
  const link = document.createElement("a");
  // Menambahkan class ke delete button
  link.className = "badge badge-danger delete-todo";
  link.href = "#";
  link.innerHTML = "Delete";

  // link of the complete button
  const link2 = document.createElement("a");
  link2.className = "badge badge-danger complete-todo";
  link2.href = "#";
  link2.innerHTML = "complete";

  // some style and functionality for complete button 😍
  link2.style.marginRight = "-75%";

  // Masukkan delete button ke dalam li
  li.appendChild(link2);
  li.appendChild(link);

  // Masukkan todo/li ke dalam todoList
  todoList.appendChild(li);
}


// Load data todos dan langsung trigger pembuatan element todo
function getTodos() {
  let todos = getItemFromLocalStorage();

  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

// --- DOM functions ⛔️
function addTodo(e) {
  e.preventDefault();

  if (todoInput.value) {
    createTodoElement(todoInput.value);

    // Tambahkan juga value ke dalam LocalStorage
    addTodoLocalStorage(todoInput.value);

    // Kosongkan taskInput setelah submit
    todoInput.value = "";
  } else {
    alert("Write a todo first!");
  }
}

function addTodoLocalStorage(todoInputValue) {
  let todos = getItemFromLocalStorage();

  todos.push(todoInputValue);

  setItemToLocalStorage(todos);
}

function deleteTodo(e) {
  e.preventDefault();
  // Console logging event delegation
  // for complete button
  if (e.target.classList.contains("complete-todo")) {
    const parent = e.target.parentElement;
    parent.innerHTML = `<span style="text-decoration : line-through">${parent.firstChild.textContent}</span><a class="badge badge-danger complete-todo" href="#" style="margin-right: -75%;">complete</a><a class="badge badge-danger delete-todo" href="#">Delete</a>`;
  }

  if (e.target.classList.contains("delete-todo")) {
    if (confirm("Apakah yaking akan menghapus?")) {
      const parent = e.target.parentElement;
      parent.remove();

      deleteTodoLocalStorage(parent);
    }
  }
}

function deleteTodoLocalStorage(deleteTodoValue) {
  let todos = getItemFromLocalStorage();

  todos.forEach((todo, idx) => {
    if (deleteTodoValue.firstChild.textContent === todo) {
      todos.splice(idx, 1);
    }
  });

  setItemToLocalStorage(todos);
}

function clearTodos() {
  todoList.innerHTML = "";

  // while (todoList.firstChild) {
  //   todoList.removeChild(todoList.firstChild);
  // }

  clearTodosLocalStorage();
}

function clearTodosLocalStorage() {
  localStorage.clear();
}

function filterTodos(e) {
  const text = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll("#todo-item");

  todoItems.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();

    if (itemText.indexOf(text) !== -1) {
      item.setAttribute("style", "display: block");
    } else {
      item.setAttribute("style", "display: none !important");
    }
  });
}
// --- DOM functions ⛔️
