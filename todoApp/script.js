// Get DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load existing todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to render todos
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", todo.completed);
    li.innerHTML = `
            <span>${todo.text}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
    // Toggle completion status when clicked
    li.addEventListener("click", () => toggleComplete(index));
    todoList.appendChild(li);
  });
}

// Function to add a new todo
function addTodo(text) {
  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Function to toggle the completion status of a todo
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listener for form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText) {
    addTodo(todoText);
    todoInput.value = "";
  }
});

// Event listener for delete buttons (event delegation)
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    deleteTodo(index);
    // delte
  }
});

// Initial render
renderTodos();
