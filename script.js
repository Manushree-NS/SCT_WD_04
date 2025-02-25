// Select DOM elements
const taskInput = document.getElementById('task-input');
const taskDatetime = document.getElementById('task-datetime');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// To store tasks
let tasks = [];

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = taskDatetime.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        datetime: taskDate || null
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = ''; // Reset input field
    taskDatetime.value = ''; // Reset datetime field
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear current list

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) taskElement.classList.add('completed');

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        const taskTime = document.createElement('span');
        taskTime.textContent = task.datetime ? `Due: ${new Date(task.datetime).toLocaleString()}` : '';
        taskInfo.appendChild(taskText);
        taskInfo.appendChild(taskTime);

        const taskButtons = document.createElement('div');
        taskButtons.classList.add('task-buttons');

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleComplete(task.id));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);

        taskElement.appendChild(taskInfo);
        taskElement.appendChild(taskButtons);

        taskList.appendChild(taskElement);
    });
}

// Function to toggle task completion
function toggleComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Function to edit a task
function editTask(taskId) {
    const newText = prompt('Edit task:', tasks.find(task => task.id === taskId).text);
    if (newText !== null && newText.trim() !== '') {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.text = newText.trim();
            }
            return task;
        });
        renderTasks();
    }
}

// Event listener to add task
addTaskButton.addEventListener('click', addTask);

// Allow pressing 'Enter' key to add task
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();
