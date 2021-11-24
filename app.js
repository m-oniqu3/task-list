// Define ui variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //dom load event listener to get the tasks from localstorage if there are any
  document.addEventListener("DOMContentLoaded", getTasks);

  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from local storage
function getTasks() {
  let tasks;
  // check Local storage to see if there are any tasks in there
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //localstorage can only store strings so we have to parse
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");

    //add class
    li.className = "collection-item";

    // Create text node and add to the ui
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement("a");

    //Add class
    link.className = "delete-item secondary-content";

    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to the li
    li.appendChild(link);

    //Append the li to the ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    // Create li element
    const li = document.createElement("li");

    //add class
    li.className = "collection-item";

    // Create text node and add to the ui
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link = document.createElement("a");

    //Add class
    link.className = "delete-item secondary-content";

    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to the li
    li.appendChild(link);

    //Append the li to the ul
    taskList.appendChild(li);

    //Store in lS

    storeTask(taskInput.value);

    //Clear Input
    taskInput.value = "";

    e.preventDefault();
  }
}

//Store task
function storeTask(task) {
  let tasks;
  // check Local storage to see if there are any tasks in there
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //localstorage can only store strings so we have to parse
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //push the parameter tasks in to the arry
  tasks.push(task);

  //has to be stored as a string so we have to wrap it in json function by using stringify

  // setItem takes in a key, value pair like an object so tasks is the key and the rest is the array (the value)
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to delete this item")) {
      e.target.parentElement.parentElement.remove();
      taskDel = e.target.parentElement.parentElement;
      //Remove from local storage
      removeTaskFromStorage(taskDel);
    }
  }
}

//Remove Task from localstorage

function removeTaskFromStorage(taskItem) {
  let tasks;
  // check Local storage to see if there are any tasks in there
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    //localstorage can only store strings so we have to parse
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Clear all Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //clear all from  Local storage
  clearFromLS();
}

//Clear Task from local storage
function clearFromLS() {
  localStorage.clear();
}

//Filter Tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

/*
let tasks = [];
if (localStorage.getItem('tasks') !== null) {  
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
*/
