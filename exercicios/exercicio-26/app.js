const formatTimeUnit = unit => String(unit).length === 1 ? `0${unit}` : unit

/*
  01

  - Crie uma função que recebe uma data por parâmetro e retorna a data na 
    formatação "DD/MM/AAAA". Exemplo: 03/07/2021;
  - Não utilize a date-fns.
*/

// const presentDate = new Date('April 24 2019 13:20:00')

// const formattedDate = (date) => {
//   dateYear = date.getFullYear()
//   dateMonth = date.getMonth() + 1 
//   dateDay = date.getDate()
  
//   return (
//     `${String(dateDay).length === 1 ? `0${dateDay}` : dateDay}/${String(dateMonth).length === 1 ? `0${dateMonth}` : dateMonth}/${dateYear}`)
// }

// console.log(formattedDate(presentDate))

const present = new Date()

const formatDate = date => {
  const day = formatTimeUnit(date.getDate())
  const month = formatTimeUnit(date.getMonth() + 1)
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

console.log(formatDate(present))

/*
  02

  - Crie uma função que recebe uma data por parâmetro e retorna o horário e a 
    data na formatação: "03:07 - domingo, 7 de junho de 2020";
  - Não utilize a date-fns.
*/

// const formattedDateWithTime = (date) => {
//   const weekDays = {
//     0: 'Domingo',
//     1: 'Segunda-Feira',
//     2: 'Terça-Feira',
//     3: 'Quarta-Feira',
//     4: 'Quinta-Feira',
//     5: 'Sexta-Feira',
//     6: 'Sábado'
//   }

  // const months = {
  //   0: 'Janeiro',
  //   1: 'Fevereiro',
  //   2: 'Março',
  //   3: 'Abril',
  //   4: 'Maio',
  //   5: 'Junho',
  //   6: 'Julho',
  //   7: 'Agosto',
  //   8: 'Setembro',
  //   9: 'Outubro',
  //   10: 'Novembro',
  //   11: 'Dezembro'
  // }

//   dateHours = date.getHours()
//   dateMinutes = date.getMinutes()
//   dateWeekDay = date.getDay()
//   dateDay = date.getDate()
//   dateMonth = date.getMonth()
//   dateYear = date.getFullYear()


//   return `${dateHours}:${dateMinutes} - ${weekDays[dateWeekDay]}, ${dateDay} de ${months[dateMonth]} de ${dateYear}`
// }

// console.log(formattedDateWithTime(present))
const weekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado'
]
const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const formatDateInfo = (date) => {
  const hours = formatTimeUnit(date.getHours())
  const minutes = formatTimeUnit(date.getMinutes())
  const weekDay = weekDays[date.getDay()]
  const monthDay = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()


  return `${hours}:${minutes} - ${weekDay}, ${monthDay} de ${month} de ${year}`
}

console.log(formatDateInfo(present))

/*
  03

  - Faça um destructuring nas propriedades "id" e "isVerified" do objeto abaixo;
  - Exiba os valores lado a lado, no console;
  - Não modifique a declaração da const user.
*/

const user = { id: 42, isVerified: true }

const { id, isVerified } = user

// console.log(id, isVerified)

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

const { name: nameA } = robotA
const { name: nameB } = robotB

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

const obj = {
  a,
  b,
  c
}

// console.log(obj)

/*
  06

  - Refatore o código abaixo.
*/

const useDataSomewhereElse = value => console.log(value)

const updateSomething = ({ target, property, willChange } = {}) => {
  if (willChange === 'valor indesejado') {
    willChange = 'valor desejado'
  }

  useDataSomewhereElse({ target, property, willChange })
}

updateSomething({ target: '1', property: '2', willChange: 'valor indesejado' })

// const useDataSomewhereElse = value => console.log(value)

// const updateSomething = ({ target, property, willChange }) => {

//   willChange = willChange === 'valor indesejado' ? willChange = 'valor desejado' : 'valor indesejado'

//   useDataSomewhereElse({
//     target,
//     property,
//     willChange
//   })
// }

// updateSomething({ target: '1', property: '2', willChange: 'valor indesejado' })

/*
  07

  - O código abaixo é o mesmo do relógio digital que implementamos na aula 
    passada. Refatore-o.
*/

const clockContainer = document.querySelector('.clock-container')

const getClockHTML = (hours, minutes, seconds) => `
<span>${hours}</span>
<span>${minutes}</span>
<span>${seconds}</span>
`

const updateClock = () => {
  const present = new Date()
  const hours = formatTimeUnit(present.getHours())
  const minutes = formatTimeUnit(present.getMinutes())
  const seconds = formatTimeUnit(present.getSeconds())

  clockContainer.innerHTML = getClockHTML(hours, minutes, seconds)
}

setInterval(updateClock, 1000)

// const insertDateIntoHTML = (hours, minutes, seconds) => {
//   const clockHTML = `
//     <span>${formatTimeUnit(hours)}</span> :
//     <span>${formatTimeUnit(minutes)}</span> :
//     <span>${formatTimeUnit(seconds)}</span>
//   `

//   clockContainer.innerHTML = clockHTML
// }

// const updateClock = () => {
//   const present = new Date()
//   const hours = present.getHours()
//   const minutes = present.getMinutes()
//   const seconds = present.getSeconds()

//   insertDateIntoHTML(hours, minutes, seconds)
// }

// setInterval(updateClock, 1000)
