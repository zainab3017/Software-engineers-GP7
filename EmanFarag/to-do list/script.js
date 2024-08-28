document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Add task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="remove">&times;</button>
        `;

        // Mark task as completed
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Remove task
        li.querySelector('.remove').addEventListener('click', (event) => {
            event.stopPropagation();
            li.remove();
        });

        taskList.appendChild(li);
        taskInput.value = '';
    });

    // Optional: Allow Enter key to add task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});