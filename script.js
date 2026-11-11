let addButton = document.querySelector("#button");
let input = document.querySelector("#input1");
let tasks = document.getElementById("tasks");

let compTasks = document.getElementById("complited-task");
let uncompTasks = document.getElementById("uncomplited-task");

let counter_complited = 0;
let counter_uncomplited = 0;

function showText() {
    if (input.value.trim() === '') return; // Защита от пустых задач

    let task = document.createElement('div');
    task.classList.add('task-item');
    tasks.append(task);

    let checkMark = document.createElement('input');
    checkMark.type = 'checkbox';
    task.append(checkMark);

    let taskText = document.createElement('p');
    taskText.innerText = input.value;
    task.append(taskText);
    
    // Изначально задача не выполнена
    counter_uncomplited++;
    uncompTasks.innerText = counter_uncomplited;
    compTasks.innerText = counter_complited;

    // ЛОГИКА ЧЕКБОКСА
    checkMark.addEventListener('click', function () {
        taskText.classList.toggle('checked');
        
        if (checkMark.checked) {
            // Задачу выполнили
            counter_complited++;
            counter_uncomplited--;
        } else {
            // Задачу вернули в работу
            counter_complited--;
            counter_uncomplited++;
        }
        // Обновляем текст счетчиков
        compTasks.innerText = counter_complited;
        uncompTasks.innerText = counter_uncomplited;
    });

    let delButton = document.createElement('button');
    delButton.innerText = 'Delete';
    task.append(delButton);

    // ЛОГИКА УДАЛЕНИЯ
    delButton.addEventListener('click', function () {
        task.style.display = 'none'; 
        
        // Корректируем счетчики при удалении
        if (checkMark.checked) {
            counter_complited--;
            compTasks.innerText = counter_complited;
        } else {
            counter_uncomplited--;
            uncompTasks.innerText = counter_uncomplited;
        }
    });

    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    task.append(editButton);

    // ЛОГИКА РЕДАКТИРОВАНИЯ
    editButton.addEventListener('click', function () {
        checkMark.style.display = 'none';
        editButton.style.display = 'none';
        delButton.style.display = 'none';

        let inputEdit = document.createElement('input');
        inputEdit.value = taskText.innerText;
        task.append(inputEdit);

        let buttonSave = document.createElement('button');
        buttonSave.innerText = "Save";
        task.append(buttonSave);

        buttonSave.addEventListener('click', function () {
            taskText.innerText = inputEdit.value;
            checkMark.style.display = 'inline';
            editButton.style.display = 'inline';
            delButton.style.display = 'inline';
            buttonSave.remove(); // Удаляем кнопку сохранения
            inputEdit.remove();  // Удаляем поле ввода
        });
    });

    input.value = ''; // Очищаем поле
}

addButton.addEventListener("click", showText);


input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        showText();
    }
});