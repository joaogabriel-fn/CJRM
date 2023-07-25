const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addTodo = inputValue => {
  const checkInputValueLength = inputValue.length
  const todoTemplate = `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
    </li>
  `
  
  if (checkInputValueLength) {
    todosContainer.innerHTML += todoTemplate
  }
}

const handleFormAddTodo = event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()

  addTodo(inputValue)

  event.target.reset()
}

const deleteTodo = clickedElement => {

  if (clickedElement.dataset.trash) {
    document.querySelector(`[data-todo="${clickedElement.dataset.trash}"]`).remove()
  }
}

const handleFormRemoveTodo = event => {
  const clickedElement = event.target

  deleteTodo(clickedElement)
}

const filterTodoList = inputValue => {
  const todoList = Array.from(todosContainer.children)
  
  const todosThatIncludesInput = todo => todo.textContent.toLowerCase().includes(inputValue)
  
  const todosThatDoesntIncludesInput = todo => !todo.textContent.toLowerCase().includes(inputValue)

  const hideTodos = todo => {
    todo.classList.remove('d-flex')
    todo.classList.add('hidden')
  }
  const showTodos = todo => {
    todo.classList.remove('hidden')
    todo.classList.add('d-flex')
  }


  todoList
    .filter(todosThatDoesntIncludesInput)
    .forEach(hideTodos)
  todoList
    .filter(todosThatIncludesInput)
    .forEach(showTodos)
}

const handleSearchTodo = event => {
  const inputValue = event.target.value.trim().toLowerCase()

  filterTodoList(inputValue)
}

formAddTodo.addEventListener('submit', handleFormAddTodo)

todosContainer.addEventListener('click', handleFormRemoveTodo)

inputSearchTodo.addEventListener('input', handleSearchTodo)
