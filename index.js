// Initialize an empty array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');

        const taskHTML = `
            <span>${task.name}</span>
            <p>${task.description}</p>
            <button class="update-btn" data-index="${index}">Update</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        taskElement.innerHTML = taskHTML;
        taskList.appendChild(taskElement);
    });
}

// Event listener for creating new tasks
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-description').value;

    if (taskName && taskDescription) {
        tasks.push({ name: taskName, description: taskDescription });
        renderTasks();

        // Clear form fields
        document.getElementById('task-name').value = '';
        document.getElementById('task-description').value = '';
    }
});

// Event listener for deleting tasks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskIndex = e.target.dataset.index;
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
});

// Event listener for updating tasks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('update-btn')) {
        const taskIndex = e.target.dataset.index;
        const task = tasks[taskIndex];

        // Prompt user for new task details
        const newTaskName = prompt('Enter new task name:', task.name);
        const newTaskDescription = prompt('Enter new task description:', task.description);

        if (newTaskName && newTaskDescription) {
            tasks[taskIndex] = { name: newTaskName, description: newTaskDescription };
            renderTasks();
        }
    }
});
