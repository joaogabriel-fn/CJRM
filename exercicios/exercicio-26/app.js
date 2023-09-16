/*
  01

  - Crie uma função que recebe uma data por parâmetro e retorna a data na 
    formatação "DD/MM/AAAA". Exemplo: 03/07/2021;
  - Não utilize a date-fns.
*/

/*
  02

  - Crie uma função que recebe uma data por parâmetro e retorna o horário e a 
    data na formatação: "03:07 - domingo, 7 de junho de 2020";
  - Não utilize a date-fns.
*/

/*
  03

  - Faça um destructuring nas propriedades "id" e "isVerified" do objeto abaixo;
  - Exiba os valores lado a lado, no console;
  - Não modifique a declaração da const user.
*/

const user = { id: 42, isVerified: true }
const {id, isVerified} = user

// console.log(`id: ${id}, isVerified: ${isVerified}`)
/*
  04

  - Faça um destructuring nas propriedades "name" dos objetos abaixo;
  - No destructuring, faça "Bender" ser armazenado por uma const "nameA" e 
    "HAL 9000" ser armazenado por uma const "nameB";
  - Exiba os valores das consts lado a lado, no console;
  - Não modifique a declaração das consts "robotA" e "robotB".
*/

const robotA = { name: 'Bender' }
const robotB = { name: 'HAL 9000' }

const {name: nameA}  = robotA
const {name: nameB} = robotB

// console.log(nameA, nameB)
/*
  05

  - Usando shorthand property names, crie um objeto com as propriedades "a", 
    "b" e "c";
  - O valor dessas propriedades deve ser o mesmo das consts "a", "b" e "c";
  - Exiba o objeto no console.
*/

const a = 'a'
const b = 'b'
const c = 'c'

/*
  06

  - Refatore o código abaixo.
*/

const useDataSomewhereElse = ({ target, property, willChange }) => console.log({target, property, willChange})

const updateSomething = ({ target, property, willChange }) => {
  willChange = willChange === 'valor indesejado' ? 'valor desejado' : 'valor indesejado'

  useDataSomewhereElse({
    target,
    property,
    willChange
  })
}

updateSomething({ target: '1', property: '2', willChange: 'valor indesejado' })

/*
  07

  - O código abaixo é o mesmo do relógio digital que implementamos na aula 
    passada. Refatore-o.
*/

const clockContainer = document.querySelector('.clock-container')

const isLengthOne = (time) => String(time).length === 1 ? `0${time}` : time

const getFormattedTime = (date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `
    <span>${isLengthOne(hours)}</span>
    <span>${isLengthOne(minutes)}</span>
    <span>${isLengthOne(seconds)}</span>
    `
}

const updateClock = () => {
  const present = new Date()

  formattedDate = getFormattedTime(present)
  clockContainer.innerHTML = formattedDate
}

setInterval(updateClock, 1000)
