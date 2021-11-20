var todoList = document.querySelector('#todoList');
var input = document.querySelector('#userInput');
var todosAmount = document.getElementsByClassName('todos');
var error = document.querySelector('#error');

const setItem = (db) => localStorage.setItem('todoList', JSON.stringify(db));
const getItem = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

addEventListener("load", function() {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})

function createTodo(text, status, index) {
    var newElement = document.createElement('label');
    newElement.classList.add('todos');
    newElement.innerHTML = `
        <input type="checkbox" class='checkBox' data-index=${index} ${status}>
        <div>${text}</div>
        <button type="button" data-index=${index} onclick="removeTodo(this)">X</button>
    `
    todoList.appendChild(newElement);

    requestAnimationFrame(() =>
        setTimeout(() => {
            newElement.style.opacity = '1';
        }))
}

// Send item userInput and checkbox status to de DB
function sendToDb() {
    const dB = getItem()

    if(todosAmount.length == 5){
        error.textContent = 'You can only create up to 5 todo´s';
        error.style.opacity = '1';
    }
    else if(input.value == ''){
        error.style.opacity = '1';
        error.innerHTML = 'Please create a todo';
    }
    else if(input.value !== '' && todosAmount.length < 5){
        error.style.opacity = '0';
        dB.push({ 'text': input.value, 'status': '' });
        setItem(dB);
    }
    showOnScreen()

}

// Send item.text and item.status to createElement() in order to create HTML elements
function showOnScreen() {
    clearScreen()

    const dB = getItem()
    dB.forEach((item, index) => createTodo(item.text, item.status, index));
}

function clearScreen() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

// Will locate the button index and remove it from the DB
function removeTodo(d) {
    const dB = getItem()

    var index = d.getAttribute('data-index');
    dB.splice(index, 1);
    setItem(dB)

    showOnScreen()
}

// Locate specific checkbox that was checked
function clickItem(event) {
    if (event.target.type === 'checkbox') {
        var checkBoxIndex = event.target.dataset.index;
        saveCheckStatus(checkBoxIndex)
    }
}

// Change checkbox status
function saveCheckStatus(index) {
    const dB = getItem()

    dB[index].status = dB[index].status === '' ? 'checked' : '';
    setItem(dB)

}

todoList.addEventListener('click', clickItem);
showOnScreen()
