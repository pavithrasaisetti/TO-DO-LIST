document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        addTaskToDOM(task);
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = {
            text: taskInput.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value,
            completed: false
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        addTaskToDOM(task);
        taskInput.value = '';
        prioritySelect.value = 'Low';
        dueDateInput.value = '';
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <div class="task-details">
                <span>${task.text}</span>
                <small>Priority: ${task.priority} | Due: ${task.dueDate}</small>
            </div>
            <div class="task-actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;

        taskList.appendChild(li);

        const editBtn = li.querySelector('.edit');
        const deleteBtn = li.querySelector('.delete');
        const completeBtn = li.querySelector('.complete');

        editBtn.addEventListener('click', () => editTask(task, li));
        deleteBtn.addEventListener('click', () => deleteTask(task, li));
        completeBtn.addEventListener('click', () => toggleComplete(task, li));
    }

    function editTask(task, li) {
        taskInput.value = task.text;
        prioritySelect.value = task.priority;
        dueDateInput.value = task.dueDate;
        tasks.splice(tasks.indexOf(task), 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    }

    function deleteTask(task, li) {
        tasks.splice(tasks.indexOf(task), 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    }

    function toggleComplete(task, li) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.classList.toggle('completed');
        li.querySelector('.complete').textContent = task.completed ? 'Undo' : 'Complete';
    }
});
