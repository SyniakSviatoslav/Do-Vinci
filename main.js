
const doForm = document.querySelector('.do-form');
const doInput = document.querySelector('.do-input');
const doItemsList = document.querySelector('.do-items');
const deleteEvery = document.querySelector('.delete-all-button');
const deleteDone = document.querySelector('.delete-done-button');
const itemTask = document.querySelector('.li-item');


let todos = [];

doForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addTodo(doInput.value);
});

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
      <input type="input" value="${item.name}" class="taskInput" maxlength = "35">
      <button class="delete-button">x</button>
    `;
    doItemsList.append(li);
  });

}


function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

function deleteAll(todos) {
  todos = todos.filter(function (item) {
    return item < 0;
  });
  addToLocalStorage(todos)
}

function deleteComplete(todos) {
  todos = todos.filter(function (item) {
    return !item.completed;
  });
  addToLocalStorage(todos);
}

getFromLocalStorage();


//edit

document.querySelectorAll('.taskInput').forEach(item => {
  item.addEventListener('input', event => {
    addToLocalStorageObject
  })
})


let addToLocalStorageObject = function (todos, name, input) {
	let existing = localStorage.getItem(name);
	existing = existing ? JSON.parse(existing) : {};
	existing[key] = value;
	localStorage.setItem(name, JSON.stringify(existing));
}






doItemsList.addEventListener('click', function (event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.type === 'input'){
    toggle(event.target.parentElement.getAttribute('data-key'));
    console.log('data-key')
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

deleteEvery.addEventListener('click', function () { deleteAll(todos) });
deleteDone.addEventListener('click', function () { deleteComplete(todos) });
// inputTask.addEventListener("click", function () {
//   inputTask.contentEditable = true;
// });
// doForm.addEventListener("click", function () {
//   doItemsList.contentEditable = false;
// });

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);