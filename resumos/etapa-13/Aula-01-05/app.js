localStorage.setItem('name', 'Joao')
localStorage.setItem('age', 22)

let name = localStorage.getItem('name')
let age = localStorage.getItem('age')

console.log(name, age)

localStorage.removeItem('name')

name = localStorage.getItem('name')

localStorage.clear()

name = localStorage.getItem('name')
age = localStorage.getItem('age')
debugger