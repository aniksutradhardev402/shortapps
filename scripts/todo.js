const inputBox = document.getElementById("input-box");

const listcontainer = document.getElementById("list-container");

// Storage key constant
const STORAGE_KEY = 'todoApp_tasks';

function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const listItem = document.createElement("li");
  listItem.textContent = taskText;

  listcontainer.appendChild(listItem);

  let span = document.createElement("span");
  span.textContent = "\u00d7"; // Unicode for multiplication sign (×)
  listItem.appendChild(span);

    saveData();
    inputBox.value = "";
} 

listcontainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked"); // Toggle the "checked" class on the clicked list item
    saveData(); // Save data after toggling
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove(); // Remove the parent list item of the clicked span
    saveData();
  }
}, false); // Add event listener to the list container
    

function addTaskOnEnter(event) {
  if (event.key === "Enter") {
    addTask();
  }
   }

inputBox.addEventListener("keypress", addTaskOnEnter); // Add event listener to the input box

function saveData() {
    try {
        const tasks = listcontainer.innerHTML;
        localStorage.setItem(STORAGE_KEY, tasks);
        console.log('Tasks saved successfully');
    } catch (error) {
        console.error('Error saving tasks:', error);
        alert('Failed to save tasks. Please check your browser storage settings.');
    }
}

function loadData() {
    try {
        const tasks = localStorage.getItem(STORAGE_KEY);
        if (tasks) {
            listcontainer.innerHTML = tasks;
            console.log('Tasks loaded successfully');
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        alert('Failed to load tasks. Please refresh the page.');
    }
}
  
    
loadData();

 