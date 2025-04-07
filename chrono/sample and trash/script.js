let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push(taskText);
    taskInput.value = ""; // clear input
    renderTasks();
  }
}

function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index]);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index] = newTask.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, i) => {
    taskList.innerHTML += `
      <li>
        ${task}
        <div>
          <button class="edit-btn" onclick="editTask(${i})">Edit</button>
          <button onclick="deleteTask(${i})">Delete</button>
        </div>
      </li>
    `;
  });
}
