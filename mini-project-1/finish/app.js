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
  // Add todo event
  todoForm.addEventListener("submit", addTodo);

  // Delete todo event
  todoList.addEventListener("click", deleteTodo);

  // Clear todo list
  clearButton.addEventListener("click", clearTodos);

  // Filtering todo list
  filterInput.addEventListener("keyup", filterTodos);
}

function addTodo(e) {
  e.preventDefault();

  if (todoInput.value) {
    // Membuat element li
    const li = document.createElement("li");
    // Tambahkan class pada element li
    li.className =
      "list-group-item d-flex justify-content-between align-items-center mb-1 todo-item";
    // Tambahkan id pada element li
    li.id = "todo-item";
    // Memasukkan child ke dalam element li
    li.appendChild(document.createTextNode(todoInput.value));

    // Membuat delete button
    const link = document.createElement("a");
    // Menambahkan class ke delete button
    link.className = "badge badge-danger delete-todo";
    link.href = "#";
    link.innerHTML = "Delete";

    // Masukkan delete button ke dalam li
    li.appendChild(link);

    // Masukkan todo/li ke dalam todoList
    todoList.appendChild(li);

    // Kosongkan taskInput setelah submit
    todoInput.value = "";
  } else {
    alert("Write a todo first!");
  }
}

function deleteTodo(e) {
  e.preventDefault();
  // Console logging event delegation
  console.log(e.target.classList.contains("delete-todo"));

  if (e.target.classList.contains("delete-todo")) {
    if (confirm("Apakah yaking akan menghapus?")) {
      e.target.parentElement.remove();
    }
  }
}

function clearTodos() {
  // console.log(todoList.childNodes);
  todoList.innerHTML = "";

  // while (todoList.firstChild) {
  //   todoList.removeChild(todoList.firstChild);
  // }
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
