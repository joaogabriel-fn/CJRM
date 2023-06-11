/*
  01

  - Obtenha a ul do index.html e adicione em todos os elementos filhos dela,  
    uma classe 'video';
  - Exiba no console os elementos filhos da ul com a classe já inserida.
*/

const ul = document.querySelector('ul')
const lis = Array.from(ul.children)
const insertVideoClass = li => {
  li.classList.add('video')
}


lis.forEach(insertVideoClass)


/*
  02

  - Usando a propriedade adequada, descubra quem é o elemento pai do h2
    e exiba-o no console;
*/

const h2 = document.querySelector('h2')

// console.log(h2.parentElement)

/*
  03

  - Descubra quem é o próximo elemento irmão do h1 e exiba-o no console;
*/

const h1 = document.querySelector('h1')

// console.log(h1.nextElementSibling)

/*
  04

  - Descubra quem é o irmão anterior da ul e exiba-o no console;
*/

// console.log(ul.previousElementSibling)

/*
  05

  - Quando um clique acontecer em alguma das lis, faça com que a li clicada seja  
    exibida no console.
*/
const showClickedLi = e => {
  console.log(e.target)
}

const addClickEvent = li => {
  li.addEventListener('click', showClickedLi)}

lis.forEach(addClickEvent)

/*
  06

  - Quando o botão for clicado, adicione o nome dos vídeos abaixo dentro da ul;
  - Cada nome deve estar dentro de uma li.
*/

const videos = [{
  name: 'Como o promise all funciona | JavaScript',
  length: '00:01:52'
}, {
  name: 'Como refatorar um for loop | JavaScript',
  length: '00:04:18'
}, {
  name: 'Como fazer requisições HTTP com o método fetch | JavaScript',
  length: '00:02:55'
}]

const button = document.querySelector('button')

// button.addEventListener('click', () => {
//   videos.forEach(video => {
//     ul.innerHTML += `<li class="video">${video.name}</li>`
//   })
// })

const createAndInsertLi = ({ name }) => {
  const li = document.createElement('li')
  const videoName = name
  
  li.classList.add('videos')
  li.textContent += videoName
  ul.append(li)
}

const insertVideoName = () => {
  videos.forEach(createAndInsertLi)
}

button.addEventListener('click', insertVideoName)

/*
  07

  - Se um clique no h1 acontecer, faça com que todos os elementos dentro do body 
    sejam removidos.
*/

const body = document.body
const removeBodyContent = () => {
  body.remove()
}

h1.addEventListener('click', removeBodyContent)

// Ou

// h1.addEventListener('click', () => {
//   body.innerHTML = ''
// })

