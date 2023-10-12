NameSelector = document.querySelector("#Name");
DescriptionSelector = document.querySelector("#Desc");
submitBtn = document.querySelector("#Submit");
lowPriority = document.querySelector("#Low");
mediumPriority = document.querySelector("#Medium");
hightyPriority = document.querySelector("#High");
taskDiv = document.querySelector(".tasks");
addTaskBtn = document.querySelector("#addTask");
container = document.querySelector(".container");
addTaskForm = document.querySelector(".addTaskForm");
priorityCheck = document.querySelector("#priority");
Priority = [lowPriority, mediumPriority, hightyPriority];
removeBtn = document.querySelector("#removeBtn");
pointsDiv = document.querySelector(".points");
resetBtn = document.querySelector('#reset');
showCompletedButton = document.querySelector("#showCompleted")
//variables & Arrays
let priorityValue;
let taskID = 1;
instances = [];
CompletedTasksArray = [];
let points = 0;

//The Tasks object Constuctor
function Tasks(Name, Description, Priority, ID) {
  (this.Name = Name),
    (this.Description = Description),
    (this.Priority = Priority),
    (this.ID = ID);
}

// The Completed Tasks Object constructor
function completedTasks(Name, Description, Priority, ID) {
  (this.Name = Name),
    (this.Description = Description),
    (this.Priority = Priority),
    (this.ID = ID);
}

// Checking priority
Priority.forEach((element) => {
  element.addEventListener("change", () => {
    priorityValue = element.id;
  });
});

// updating the task object
createTask = function (Name, Description, Priority) {
  const task = new Tasks(Name, Description, Priority, taskID);
  instances.push(task); // to update the task as an object in the array
  console.log(instances);
  taskID++;
  updateDom();
   // To Update Local Storage
  let stringofTasks = JSON.stringify(instances);
  localStorage.setItem("tasks", stringofTasks);
};

//updating the completed tasks object
updateCompletedTask = function (Name, Description, Priority, ID) {
  const task = new completedTasks(Name, Description, Priority, taskID);
  CompletedTasksArray.push(task);
  updateDom();
};

//Update the DOM
function updateDom() {
  const tableBody = document.querySelector(".tasks-table");
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild); // to remove the existing tasks
  }
  instances.forEach((task, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${task.Name}</td>
    <td>${task.Description}</td>
    <td>${task.Priority}</td>
    <td><button id= '${task.ID}' class ='removeBtn'>Remove</button><button id= '${task.ID}' class ='completedBtn'>Completed</button></td>
  `;
    tableBody.appendChild(newRow); // adds the tasks from array
  });

  resetForm();

}

//submit form
submitBtn.addEventListener("click", () => {
  NameValue = NameSelector.value;
  DescValue = DescriptionSelector.value;
  createTask(NameValue, DescValue, priorityValue);
  NameSelector.value = "";
  DescriptionSelector.value = "";
  updateDom();
});

// Open Form on Add Task Click
addTaskBtn.addEventListener("click", () => {
  addTaskForm.style.display = "block";
  container.style.display = "none";
});

// Reset Form
resetForm = function () {
  container.style.display = "block";
  addTaskForm.style.display = "none";
};

// Function to Remove a Task
removeTask = function (taskIdtoRemove) {
  instances.splice(taskIdtoRemove, 1);
  updateDom();
   // To Update Local Storage
  let stringofTasks = JSON.stringify(instances);
  localStorage.setItem("tasks", stringofTasks);
};

// remove button event listener
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("removeBtn")) {
    const taskIDToRemove = Number(e.target.id);
    let indexToRemove = instances.findIndex(
      (task) => task.ID === parseInt(taskIDToRemove)
    );
    removeTask(indexToRemove);
  }
});

//Event Listener to update completed tasks
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("completedBtn")) {
    const taskIDCompleted = Number(e.target.id);
    let indexOfCompleted = instances.findIndex(
      (task) => task.ID === parseInt(taskIDCompleted)
    );
    const completeTask = instances.find(
      (task) => task.ID === parseInt(taskIDCompleted)
    );
    if (completeTask) {
      updateCompletedTask(
        completeTask.Name,
        completeTask.Description,
        completeTask.Priority,
        completeTask.ID
      );
      removeTask(indexOfCompleted);
      console.log(CompletedTasksArray);
      priorityForPoint = completeTask.Priority;
      switch (priorityForPoint) {
        case "Low":
          points += 10;
          break;
        case "Medium":
          points += 20;
          break;
        case "High":
          points += 30;
      }
      pointsDiv.setAttribute("id", "pointsStyle");
      pointsDiv.innerHTML = `<strong>   Points: ${points}</strong>`;
    }
  }
  // To Update Local Storage
  let stringOfCompletedTasks = JSON.stringify(CompletedTasksArray);
  localStorage.setItem("completedTasks", stringOfCompletedTasks);
  let pointsString = JSON.stringify(points);
localStorage.setItem("Points", pointsString);
});

// Local Storage
// let stringofTasks = JSON.stringify(instances);
// localStorage.setItem("tasks", stringofTasks);
// let stringOfCompletedTasks = JSON.stringify(CompletedTasksArray);
// localStorage.setItem("completedTasks", stringOfCompletedTasks);      UPDATED IN RESPECTIVE FUNTIONS
// let pointsString = JSON.stringify(points);
// localStorage.setItem("Points", pointsString);








// IIFE
(function () {
  const taskBalance = localStorage.getItem("tasks");
  if (taskBalance) {
    instances = JSON.parse(taskBalance);
  }
  const completedTasksBalance = localStorage.getItem("completedTasks");
  if (completedTasksBalance) {
    CompletedTasksArray = JSON.parse(completedTasksBalance);
  }
  const pointsBalance = localStorage.getItem("Points");
  if (pointsBalance) {
    points = parseInt(pointsBalance);
    if(points != 0){
      pointsDiv.setAttribute("id", "pointsStyle");
      pointsDiv.innerHTML = `<strong>   Points: ${points}</strong>`;
      }
  } else {
    points = 0;
  }
  updateDom();
})();


// Reset everything
resetBtn.addEventListener('click', () => {
  localStorage.removeItem('tasks');
  localStorage.removeItem('completedTasks');
  localStorage.removeItem('Points');
  points = 0;
  instances.splice(0, instances.length);
  CompletedTasksArray.splice(0, CompletedTasksArray.length)
  pointsDiv.removeAttribute("id", "pointsStyle");
  pointsDiv.innerHTML = ``;
  updateDom();
})



