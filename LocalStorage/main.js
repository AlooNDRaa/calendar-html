const addTaskBtn = document.getElementById("addTaskBtn");
const taskDateInput = document.getElementById("taskDate");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskListContainer = document.getElementById("taskList");
const calendarContainer = document.getElementById("calendar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

function displayCalendar() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  calendarContainer.innerHTML = "";

  for (let i = 1; i <= lastDay; i++) {
    const day = document.createElement("div");
    day.classList.add("calendar-day");
    day.textContent = i;
    day.dataset.date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    day.addEventListener("click", loadTasksForDay);

    if (tasks[day.dataset.date] && tasks[day.dataset.date].length > 0) {
      day.classList.add("task-day");
    }

    calendarContainer.appendChild(day);
  }
}

function loadTasksForDay(event) {
  const date = event.target.dataset.date;
  const tasksForDay = tasks[date] || [];

  taskListContainer.innerHTML = `<h3>A la fecha de: ${date}</h3>`;
  const taskList = document.createElement("ul");

  if (tasksForDay.length > 0) {
    tasksForDay.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.textContent = task.description;

      if (task.completed) {
        taskItem.style.textDecoration = "line-through";
      }

      // Menú de tres puntos
      const menuButton = document.createElement("button");
      menuButton.classList.add("menu-button");
      menuButton.textContent = "⋮";

      const menu = document.createElement("div");
      menu.classList.add("task-menu");
      menu.innerHTML = `
        <button class="edit-task">Editar</button>
        <button class="toggle-complete">${task.completed ? "Desmarcar" : "Completar"}</button>
        <button class="delete-task">Eliminar</button>
      `;

      // Mostrar/ocultar el menú al hacer clic en el botón
      menuButton.addEventListener("click", () => {
        menu.classList.toggle("visible");
      });

      // Acciones del menú
      menu.querySelector(".edit-task").addEventListener("click", () => editTask(date, index));
      menu.querySelector(".toggle-complete").addEventListener("click", () => toggleComplete(date, index));
      menu.querySelector(".delete-task").addEventListener("click", () => deleteTask(date, index));

      taskItem.appendChild(menuButton);
      taskItem.appendChild(menu);

      taskList.appendChild(taskItem);
    });
  } else {
    taskList.innerHTML = "<p>No hay tareas para este día.</p>";
  }

  taskListContainer.appendChild(taskList);
}

function addTask() {
  const taskDate = taskDateInput.value;
  const taskDescription = taskDescriptionInput.value.trim();

  if (!taskDate || !taskDescription) {
    alert("Por favor, ingresa una fecha y una descripción.");
    return;
  }

  if (!tasks[taskDate]) {
    tasks[taskDate] = [];
  }

  tasks[taskDate].push({ description: taskDescription, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  alert(`Tarea agregada para el ${taskDate}`);
  loadTasksForDay({ target: { dataset: { date: taskDate } } });

  taskDateInput.value = "";
  taskDescriptionInput.value = "";

  displayCalendar();
}

function editTask(date, index) {
  const newDescription = prompt("Editar tarea:", tasks[date][index].description);
  if (newDescription) {
    tasks[date][index].description = newDescription.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasksForDay({ target: { dataset: { date } } });
    displayCalendar();
  }
}

function toggleComplete(date, index) {
  tasks[date][index].completed = !tasks[date][index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasksForDay({ target: { dataset: { date } } });
  displayCalendar();
}

function deleteTask(date, index) {
  tasks[date].splice(index, 1);
  if (tasks[date].length === 0) {
    delete tasks[date];
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasksForDay({ target: { dataset: { date } } });
  displayCalendar();
}

addTaskBtn.addEventListener("click", addTask);

document.addEventListener("DOMContentLoaded", () => {
  displayCalendar();
});
