const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const taskCounter = document.getElementById("taskCounter");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

if (darkMode) {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

renderTasks();
updateCounter();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", JSON.stringify(isDark));
});

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  updateCounter();
  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    leftDiv.appendChild(span);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const doneBtn = document.createElement("button");
    doneBtn.className = "action-btn done-btn";
    doneBtn.textContent = "✔";
    doneBtn.onclick = function () {
      toggleTask(task.id);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "action-btn delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = function () {
      deleteTask(task.id);
    };

    actionsDiv.appendChild(doneBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(actionsDiv);

    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
  updateCounter();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
  updateCounter();
}

function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  taskCounter.textContent = `${completed}/${total} completed`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}