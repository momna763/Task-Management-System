// Retrieve tasks from Local Storage
function getTasks() {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}

// Save tasks to Local Storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Handle form submission to add a task
document.getElementById('addTaskForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    const newTask = {
        title: taskTitle,
        description: taskDescription,
        dueDate: dueDate,
        completed: false,
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    // Clear form inputs
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('dueDate').value = '';

    // Refresh the task list
    displayTasks();
});
// Handle task item click to show details
document.getElementById('taskList').addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('task-item')) {
        const taskId = target.getAttribute('data-task-id');
        const tasks = getTasks();
        const task = tasks[taskId];

        // Display task details
        document.getElementById('detailsTitle').textContent = task.title;
        document.getElementById('detailsDescription').textContent = task.description;
        document.getElementById('detailsDueDate').textContent = task.dueDate;

        // Enable edit mode
        document.getElementById('detailsTitle').contentEditable = true;
        document.getElementById('detailsDescription').contentEditable = true;
        document.getElementById('detailsDueDate').contentEditable = true;
    }
});

// Handle save button click to update task details
document.getElementById('saveTaskDetails').addEventListener('click', function () {
    // Get the edited details
    const editedTitle = document.getElementById('detailsTitle').textContent;
    const editedDescription = document.getElementById('detailsDescription').textContent;
    const editedDueDate = document.getElementById('detailsDueDate').textContent;

    // Get the task ID
    const taskId = document.getElementById('taskDetails').getAttribute('data-task-id');

    // Update the task in the list
    const tasks = getTasks();
    tasks[taskId].title = editedTitle;
    tasks[taskId].description = editedDescription;
    tasks[taskId].dueDate = editedDueDate;
    saveTasks(tasks);

    // Refresh the task list
    displayTasks();
});
// Handle delete button click to remove a task
document.getElementById('taskList').addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('delete-task')) {
        const taskId = target.getAttribute('data-task-id');
        const tasks = getTasks();
        tasks.splice(taskId, 1);
        saveTasks(tasks);

        // Refresh the task list
        displayTasks();
    }
});
// Handle sort and filter options change
document.getElementById('sortOption').addEventListener('change', function () {
    displayTasks();
});

document.getElementById('filterOption').addEventListener('change', function () {
    displayTasks();
});

// Function to display tasks based on sort and filter options
function displayTasks() {
    const tasks = getTasks();
    const sortOption = document.getElementById('sortOption').value;
    const filterOption = document.getElementById('filterOption').value;

    // Sort tasks based on the selected sort option
    tasks.sort((a, b) => {
        if (sortOption === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortOption === 'completionStatus') {
            return a.completed - b.completed;
        }
    });

    // Filter tasks based on the selected filter option
    const filteredTasks = tasks.filter(task => {
        if (filterOption === 'completed') {
            return task.completed;
        } else if (filterOption === 'active') {
            return !task.completed;
        } else {
            return true; // Show all tasks
        }
    });

    // Display the sorted and filtered tasks
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item task-item';
        taskItem.setAttribute('data-task-id', index);
        taskItem.innerHTML = `
            ${task.title}
            <button class="btn btn-sm btn-danger delete-task float-right" data-task-id="${index}">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to populate task details when a task is clicked
function displayTaskDetails(taskId) {
    const tasks = getTasks();
    const task = tasks[taskId];

    // Display task details
    document.getElementById('detailsTitle').textContent = task.title;
    document.getElementById('detailsDescription').textContent = task.description;
    document.getElementById('detailsDueDate').textContent = task.dueDate;

    // Enable edit mode
    document.getElementById('detailsTitle').contentEditable = true;
    document.getElementById('detailsDescription').contentEditable = true;
    document.getElementById('detailsDueDate').contentEditable = true;

    // Save the task ID in a data attribute for reference
    document.getElementById('taskDetails').setAttribute('data-task-id', taskId);
}

// Handle task item click to show details
document.getElementById('taskList').addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('task-item')) {
        const taskId = parseInt(target.getAttribute('data-task-id'));
        displayTaskDetails(taskId);
    }
});

// Handle save button click to update task details
document.getElementById('saveTaskDetails').addEventListener('click', function () {
    // Get the edited details
    const editedTitle = document.getElementById('detailsTitle').textContent;
    const editedDescription = document.getElementById('detailsDescription').textContent;
    const editedDueDate = document.getElementById('detailsDueDate').textContent;

    // Get the task ID
    const taskId = parseInt(document.getElementById('taskDetails').getAttribute('data-task-id'));

    // Update the task in the list
    const tasks = getTasks();
    tasks[taskId].title = editedTitle;
    tasks[taskId].description = editedDescription;
    tasks[taskId].dueDate = editedDueDate;
    saveTasks(tasks);

    // Refresh the task list
    displayTasks();
});
