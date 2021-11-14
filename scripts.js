var todosAmount = document.getElementsByClassName('todos')
var userInput = document.querySelector('#userInput')

const dataBase = []

const createItem = (text) =>{

    if(text == ""){
        document.querySelector('#error').style.opacity = '1'
    }
    else if(text !== "" && todosAmount.length < 5){
        
        document.querySelector('#error').style.opacity = '0'
        
        const newElement = document.createElement('div')
        newElement.classList.add('todos')
        newElement.innerHTML = `
        <button type="button">v</button>
        <div>${text}</div>
        <button type="button" id="delete" onclick="del()">X</button>
        `
        document.querySelector('#todoList').appendChild(newElement)
}
}

function clearScreen(){
    var todoList = document.querySelector('#todoList')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

function sendToDb(){
    clearScreen()
    dataBase.push(userInput.value)
    dataBase.forEach(item => createItem(item))
}