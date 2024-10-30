const listContainer = document.querySelector(".list-container");
const clearAllButton = document.querySelector(".clear");
const inputBox = document.getElementById("input-box");
const LS = localStorage;

let tasks = [
    { 
        id: 1, 
        title: "Birinshi default task", 
        isComplete: false
},

    { 
        id: 2,
        title: "Ekinshi default task",
        isComplete: true
},
    { 
        id: 3,
        title: "Ushinshi default task", 
        isComplete: true
}
];

if (LS.getItem('tasks')) {
    tasks = JSON.parse(LS.getItem('tasks'));
}

function render() {
    listContainer.innerHTML = ''; 
    tasks.forEach((task, index) => {
        listContainer.innerHTML += `
            <li class="task">
                <input type="checkbox" ${task.isComplete ? 'checked' : ''} data-index="${index}" class="task-checkbox">
                <input type="text" value="${task.title}" class="task-title" data-index="${index}" disabled>
                <i class="ri-pencil-fill" data-index="${index}" style="cursor: pointer;"></i>
                <i class="ri-delete-bin-fill" data-index="${index}" style="cursor: pointer;"></i>
            </li>
        `;
    });

    document.querySelectorAll('.ri-delete-bin-fill').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskIndex = e.target.getAttribute('data-index');
            tasks.splice(taskIndex, 1); 
            saveTasks(); 
            render(); 
        });
    });

    document.querySelectorAll('.ri-pencil-fill').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskIndex = e.target.getAttribute('data-index');
            const taskInput = document.querySelector(`input.task-title[data-index="${taskIndex}"]`);
            const isEditing = taskInput.disabled === false;

            if (isEditing) {
                updateTaskTitle(taskIndex, taskInput.value); 
                taskInput.disabled = true;
                button.classList.replace('ri-folder-6-fill', 'ri-pencil-fill');
            } else {
                taskInput.disabled = false;
                taskInput.focus();
                button.classList.replace('ri-pencil-fill', 'ri-folder-6-fill');
            }
        });
    });

    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskIndex = e.target.getAttribute('data-index');
            tasks[taskIndex].isComplete = e.target.checked;
            saveTasks();
        });
    });
}

function saveTasks() {
    LS.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskTitle = inputBox.value.trim();
    if (!taskTitle) {
        alert('You must write something');
        return;
    }

    tasks.push({
        id: tasks.length + 1,
        title: taskTitle,
        isComplete: false,
    });

    inputBox.value = ''; 
    saveTasks(); 
    render();   
}

function updateTaskTitle(index, newTitle) {
    tasks[index].title = newTitle;
    saveTasks();
    render();
}

function clearAllTasks() {
    tasks.length = 0; 
    saveTasks();      
    render();         
}

clearAllButton.addEventListener('click', clearAllTasks);


render();
