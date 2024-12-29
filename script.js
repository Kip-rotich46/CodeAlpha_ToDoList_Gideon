// script.js

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach((li) => {
      tasks.push({
        text: li.querySelector('.task-content').textContent,
        expanded: li.querySelector('.task-content').classList.contains('expanded'),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Function to load tasks from local storage
  function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      // Load tasks in reverse order to maintain newest-to-oldest display
      savedTasks.reverse().forEach((task) => {
        addTaskToDOM(task.text, task.expanded);
      });
    }
  }
  
  // Function to add a task to the DOM
  function addTaskToDOM(taskText, isExpanded = false) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
  
    // Task content container
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContent.classList.add('task-content');
    if (isExpanded) {
      taskContent.classList.add('expanded');
    }
  
    // Icon container (for buttons)
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');
  
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
      li.remove();
      saveTasksToLocalStorage(); // Save changes to local storage
    });
  
    // Update button
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.classList.add('update-btn');
    updateBtn.addEventListener('click', function () {
      const taskInput = document.getElementById('task');
      taskInput.value = taskContent.textContent;
      li.remove();
      saveTasksToLocalStorage(); // Save changes to local storage
    });
  
    // Toggle button for showing/hiding full content
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = isExpanded ? '-' : '+';
    toggleBtn.classList.add('toggle-btn');
    toggleBtn.addEventListener('click', function () {
      if (taskContent.classList.contains('expanded')) {
        taskContent.classList.remove('expanded');
        toggleBtn.textContent = '+';
      } else {
        taskContent.classList.add('expanded');
        toggleBtn.textContent = '-';
      }
      saveTasksToLocalStorage(); // Save changes to local storage
    });
  
    // Append buttons to the icon container
    iconContainer.appendChild(toggleBtn);
    iconContainer.appendChild(updateBtn);
    iconContainer.appendChild(deleteBtn);
  
    // Append task content and icons to the list item
    li.appendChild(taskContent);
    li.appendChild(iconContainer);
  
    // Insert the new task at the top of the list
    taskList.prepend(li);
  }
  
  // Add event listener for adding tasks
  document.getElementById('addTask').addEventListener('click', function () {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();
  
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }
  
    addTaskToDOM(taskText); // Add task to the DOM
    saveTasksToLocalStorage(); // Save changes to local storage
    taskInput.value = ''; // Clear input field
  });
  
  // Load tasks from local storage when the page loads
  window.addEventListener('load', loadTasksFromLocalStorage);
  