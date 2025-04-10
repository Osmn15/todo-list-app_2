const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)


function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)

    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // Changed icon to trash
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append the full todo item to the list
    todoList.appendChild(todoDiv);

    // Clear input
    todoInput.value = '';
}
function deleteCheck(event){
    const item=event.target;
    if(item.classList[0]==="trash-btn"){
        const todo= item.parentElement;
        removelocalTodos(todo)
        todo.classList.add('fall');
        todo.addEventListener('transitioned',function(){
        })
        todo.remove()
    }
    //check mark
    if(item.classList[0]==="complete-btn"){
        const todo= item.parentElement;
        todo.classList.toggle('completed');
    }

}
function filterTodo(event){
    const todos=todoList.childNodes ;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display='flex';
                break
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                    
                }
                else{
                    todo.style.display='none'
                }
                break

                case "uncompleted":
                    if(!todo.classList.contains('completed')){
                        todo.style.display='flex';
                        
                    }
                    else{
                        todo.style.display='none'
                    }
                    break

        }
    })

}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[]
  }
  else{
    todos=JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos',JSON.stringify(todos))

}
function getTodos(){
  let todos;
  if(localStorage.getItem('todos'===null)){
    todos=[]
  }
  else{
    todos=JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerHTML = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
 
    // Check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // Changed icon to trash
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

  })
}
function removelocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[]
  }
  else{
    todos=JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex=todo.children[0].innerText;
  todos.splice(todos.indexOf[todoIndex],1)
  localStorage.setItem('todos',JSON.stringify(todos))
  
}