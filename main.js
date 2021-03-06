//declarations 

const doForm = document.querySelector('.do-form');
const doInput = document.querySelector('.do-input');
const doItemsList = document.querySelector('.do-items');
const deleteEvery = document.querySelector('.delete-all-button');
const deleteDone = document.querySelector('.delete-done-button');
const itemTask = document.querySelector('.li-item');
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

//tasks-arrays:

let todos = [];
let oldTodos = JSON.parse(localStorage.getItem("todos"))

//functions:

//creating task in js
function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos);
    doInput.value = '';
  }
}

//creating task in html
function renderTodos(todos) {
  doItemsList.innerHTML = '';

  todos.forEach(function (item) {
    const checked = item.completed ? 'checked' : null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      <input type="input" value="${item.name}" class="taskInput" id ="${item.id}" maxlength = "35">
      <button class="delete-button">x</button>
    `;
    doItemsList.append(li);
  });

}

//adding tasks to local Storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

//getting tasks from local Storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

//checking completed tasks
function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

//deleting one task
function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

//deleting all the tasks
function deleteAll(todos) {
  todos = todos.filter(function (item) {
    return item < 0;
  });
  addToLocalStorage(todos);
  getFromLocalStorage(todos);
}

//deleting completed tasks
function deleteComplete(todos) {
  todos = todos.filter(function (item) {
    return !item.completed;
  });
  addToLocalStorage(todos);
  getFromLocalStorage(todos);
}

//checking the current theme
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

//switching to different theme
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

getFromLocalStorage();

//event listeners:

//adding of task
doForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addTodo(doInput.value);
});

//editing the tasks
document.querySelectorAll('.taskInput').forEach(item => {
  item.addEventListener('input', event => {

    let updatedTodos = oldTodos.reduce((acc, todo) => {

      return [...acc, +event.target.id === todo.id ? {
        ...todo,
        name: event.target.value

      } : todo]

    }, [])
    todos = updatedTodos;

    localStorage.setItem("todos", JSON.stringify(updatedTodos));


  })
})

//checking the tasks
doItemsList.addEventListener('click', function (event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.type === 'input') {
    toggle(event.target.parentElement.getAttribute('data-key'));
    console.log('data-key')
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

//event listeners for delete and switch buttons
deleteEvery.addEventListener('click', function () { deleteAll(todos) });
deleteDone.addEventListener('click', function () { deleteComplete(todos) });
toggleSwitch.addEventListener('change', switchTheme, false);






