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

  taskListContainer.innerHTML = `<h3>Tareas para el ${date}</h3>`;
  const taskList = document.createElement("ul");

  if (tasksForDay.length > 0) {
    tasksForDay.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.textContent = task;
      taskList.appendChild(taskItem);
    });
  } else {
    taskList.innerHTML = "<p>No hay tareas para este día.</p>";
  }

  taskListContainer.appendChild(taskList);
}

addTaskBtn.addEventListener("click", () => {
  const taskDate = taskDateInput.value;
  const taskDescription = taskDescriptionInput.value.trim();

  if (!taskDate || !taskDescription) {
    alert("Por favor, ingresa una fecha y una descripción.");
    return;
  }

  if (!tasks[taskDate]) {
    tasks[taskDate] = [];
  }

  tasks[taskDate].push(taskDescription);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  alert(`Tarea agregada para el ${taskDate}`);
  loadTasksForDay({ target: { dataset: { date: taskDate } } });

  taskDateInput.value = ""; 
  taskDescriptionInput.value = ""; 

  displayCalendar();
});

document.addEventListener("DOMContentLoaded", () => {
  displayCalendar();
});
