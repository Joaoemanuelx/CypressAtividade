const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const errorMessage = document.querySelector('#error-message');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.setAttribute('data-cy', 'remove-button');
        removeButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        listItem.appendChild(taskText);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    });
    taskCount.textContent = tasks.length;
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = input.value.trim();
    if (task === '') {
        errorMessage.textContent = 'Digite uma tarefa antes de adicionar.';
        return;
    }
    errorMessage.textContent = '';
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
    input.focus();
});
renderTasks();