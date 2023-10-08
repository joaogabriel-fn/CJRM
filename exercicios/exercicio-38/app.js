/*
  01

  - Crie um objeto com um método getColor. Este método deve retornar o valor da
    propriedade 'color' dos objetos descritos abaixo;
  - Crie 2 novos objetos que representem dois carros. Na criação dos objetos, 
    faça o objeto com o método getColor ser prototype desses dois carros;
  - Após criar os carros, crie neles as propriedades 'color'. Atribua valores 
    diferentes para a propriedade color de cada carro;
  - Teste o método getColor do prototype dos carros.
*/

const newCar = {
  getColor () {
    return this.color
  }
}

let citroenC4 = Object.create(newCar)
let peugeot3008 = Object.create(newCar)

// console.log(citroenC4, peugeot3008)
// console.log(Object.getPrototypeOf(citroenC4) === Object.getPrototypeOf(peugeot3008))

citroenC4.color = 'black'
peugeot3008.color = 'white'

// console.log(citroenC4.getColor(), peugeot3008.getColor())
/*
OLOO = Objects linking to other objects

  - Criar os objetos com Object.create(), passando como argumento o obj com método getColor
  - Testar com o Object.getPrototypeOf() ou com obj.isPrototypeOf()
  - Setar as propriedades de cores
*/

/*
  02

  - No código abaixo, a invocação da função 'getSummary' está retornando 
    "undefined foi dirigido por undefined e tem undefined no papel principal.";
  - Faça a invocação da função retornar a string com os valores esperados 
    (ao invés de undefined's);
  - Não modifique o objeto 'movie' e a declaração da função 'getSummary';
  - Após fazer o código funcionar, você pode refatorar a declaração da função, 
    se necessário.
*/

const movie = {
  title: 'Forrest Gump',
  director: 'Robert Zemeckis',
  starringRole: 'Tom Hanks'
}

function getSummary () {
  const { title, director, starringRole } = this
  return `${title} foi dirigido por ${director} e tem ${starringRole} no papel principal.`
}

// console.log(getSummary.call(movie))

/*
  - O erro ocorre pelo this não estar referenciando o objeto
  - Runtime binding (conexao em tempo de execução), o valor do this é determinado dependendo de como a função é invocada
  - Utilizar o call para alterar o valor do this, passando como argumento o objeto que sera referenciado quando usar this
  - O método apply também pode ser utilizado no lugar do call. A única diferença entre o apply é o call é a forma que eles recebem argumento opcionais, enquanto o apply pode receber os argumentos em formato de array, o call recebe separadamente cada argumento.
  - declarar uma const com destructuring no this, removendo o this da template string
*/

/*
  03

  - A invocação da função abaixo deve retornar este objeto:
    {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3' 
    }
  - Descomente o código e crie a função.
*/

const arrayToObj = arrays => arrays.reduce((acc, [key, value]) => {
  acc[key] = value
  return acc
}, {})

// console.log(
//   arrayToObj([
//     ['prop1', 'value1'], 
//     ['prop2', 'value2'],
//     ['prop3', 'value3']
//   ])
// )

/*
  - Utilizar reduce
  - destructuring no item do array, com key e value
  - cada iteração do reduce, o accumulator irá criar uma nova propriedade com a key recebendo value e retornar acc
*/

/*
  04

  - Refatore as classes abaixo para factory functions.
*/

const concatenateZero = unit => unit < 10 ? `0${unit}` : unit

const formatTimeUnits = units => units
  .map(concatenateZero)

const getTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return [hours, minutes, seconds]
}

const getFormattedTime = template => {
  const [hours, minutes, seconds] = getTime()
  const formattedTime = formatTimeUnits([hours, minutes, seconds])
  const getTimeAsArray = (_, index) => formattedTime[index]

  return template
    .split(':')
    .map(getTimeAsArray)
    .join(':')
}

const makeClock = ({ template }) => ({
  template,

  render () {
    const formattedTime = getFormattedTime(this.template)
    console.log(formattedTime)
  },

  start () {
    const oneSecond = 1000

    this.render()
    this.timer = setInterval(() => this.render(), oneSecond)
  },

  stop () {
    clearInterval(this.timer)
  }
})

const extendedClock = ({ template, precision = 1000 }) => ({
  precision,

  ...makeClock({ template }),

  start () {
    this.render(),
    this.timer = setInterval(() => this.render(), this.precision)
  }
})

const newExtendedClock = extendedClock({ template: 'h:m:s', precision: 1000 })

/*
  - Para refatorar a classe clock:
    - Manter o que já foi feito
  - Para refatorar a classe extendedClock:
    - extendedClock deve retornar diretamente um objeto
    - precision deve receber um destructuring direto no parametro da função, com um default de 1000 (atribuir com short hand property)
    - invocar dentro da função a makeClock junto ao spread operator, passando o template de argumento através do destructuring
  - Eliminar funções anonimas
    - formatTimeUnits: nomear callback do map
    - getFormattedTime: nomear callback do map
*/

/*
  05

  - No index.html, descomente: 
    - A div com a classe "container" que contém uma tabela e um botão;
    - A tag link (no head) que carrega os estilos CSS do Bootstrap.
  - Seu desafio neste exercício é exportar as células da tabela HTML para um 
    arquivo CSV que pode ser aberto no Excel ou Google Planilhas;
  
  Passo a passo para alcançar este resultado
    - Quando um click no botão "Exportar para CSV" acontecer, faça o seguinte:
      - Gere um array com todas as referências dos elementos <tr> da tabela;
      - À partir do array de referências das <tr>, gere uma string CSV:
        - Uma string CSV contém, em cada linha, separados por vírgula, o 
          conteúdo textual de uma célula da <tr> (seja a célula um <th> ou 
          <td>). Ou seja, a string CSV deve ter a formatação abaixo, incluindo 
          as quebras de linha:
          
          #,Jogo do Ano,Desenvolvedora,Data da premiação
          1,The Last of Us Part II,Naughty Dog,10 de dezembro de 2020
          2,Sekiro: Shadows Die Twice,FromSoftware,12 de dezembro de 2019
          3,God of War,SIE Santa Monica Studio,6 de dezembro de 2018
          4,The Legend of Zelda: Breath...,Nintendo...,7 de dezembro de 2017
          5,Overwatch,Blizzard Entertainment,1 de dezembro de 2016
        
        - Dicas:
          - O elemento <tr> contém uma propriedade 'cells'.
          - Para quebrar linha, você pode usar dentro da string o caractere 
            especial '\n';
          - É possível gerar a string usando o método reduce. Porém, neste caso,
            o código fica mais legível (e menos complicado) com o map.
      - Após gerar a string CSV, insira 2 atributos no botão:
        - href, com o valor 
          `data:text/csvcharset=utf-8,${encodeURIComponent(SUA_STRING_CSV)}`. 
          encodeURIComponent é um método do window que precisa receber a string 
          CSV que você criou;
        - download, com o valor 'table.csv'.
*/

// const table = [...document.querySelectorAll('tr')]
// const exportTableBtn = document.querySelector('[data-js="export-table-btn"]')

// const csvString = table
//   .map(tr => tr.cells)
//   .map(item => [...item]
//   .map(item => item.textContent))
//   .reduce((acc, item) => acc += `${item} \n`, '')

// exportTableBtn.addEventListener('click', e => {
//   e.target.setAttribute('href', `data:text/csvcharset=utf-8,${encodeURIComponent(csvString)}`)
//   e.target.setAttribute('download', 'table.csv')
// })

// const tableRows = document.querySelectorAll('tr')
// const exportTableBtn = document.querySelector('[data-js="export-table-btn"]')

// const getCellsText = ({ textContent }) => textContent

// const getStringWithCommas = ({ cells }) => Array.from(cells)
//   .map(getCellsText)
//   .join(',')


// const generateCSVString = () => Array.from(tableRows)
//   .map(getStringWithCommas)
//   .join('\n')

// const setCSVDownload = CSVString => {
//   const CSVURI = `data:text/csvcharset=utf-8,${encodeURIComponent(CSVString)}`

//   exportTableBtn.setAttribute('href', CSVURI)
//   exportTableBtn.setAttribute('download', 'table.csv')
// }

// const exportTable = () => {
//   const CSVString = generateCSVString()
//   setCSVDownload(CSVString)
// }

// exportTableBtn.addEventListener('click', exportTable)

/*
  - obter a referencia das tr's numa const tableRows
  - converter o node list obtido pela tablerows num array (spread operator ou Array.from())
  - a partir do table rows, encadear um map q retorna cada row.cells
  - converter cada row.cells em array e encadear outro map, que irá retornar cada célula da linha
  - encadear um join(',') no map para juntar a string csv
  - por fim, encadear um join na expressao toda passando como argumento o separador de linha '\n'
  - encapsular o callback do eventlistener numa nova const exportTable
  - separar a expressão que gera o CSV da exportTable
  - eliminar funções anonimais existentes dentro de cada map
*/

/*
  06
  
  - Na Weather Application, refatore para uma factory function o código que 
    executa os requests e obtém as informações do clima da cidade;
  - Se ao fazer o request, uma mensagem "Access to fetch at 'http://...' from 
    origin 'http://...'"... for exibida no console, crie uma nova app na 
    plataforma da accuweather e pegue uma nova chave: 
    https://developer.accuweather.com/;
  - O procedimento é o mesmo mostrado nas aulas da etapa em que construímos 
    essa aplicação.
*/

/*

*/

/*
  07

  - No index.html, comente a div com a classe "container" que contém a tabela;
  - Descomente: 
    - A <div> com a classe "container" abaixo da div que você acabou de 
      comentar;
    - A <link> que importa o style.css;
  - Construa uma aplicação de conversão de moedas. O HTML e CSS são os que 
    você está vendo no browser (após salvar os arquivos);
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento, 
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada: 
      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para 
        dollar dos Estados Unidos, etc. Use os dados da API para popular 
        os selects.
      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL";
      - O parágrafo com data-js="converted-value" deve exibir o resultado da 
        conversão de 1 USD para 1 BRL;
      - Quando um novo número for inserido no input com 
        data-js="currency-one-times", o parágrafo do item acima deve atualizar 
        seu valor;
      - O parágrafo com data-js="conversion-precision" deve conter a conversão 
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;
      - O conteúdo do parágrafo do item acima deve ser atualizado à cada 
        mudança nos selects;
      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de 
        dois dígitos após o ponto, você pode usar o método toFixed: 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    - Para obter as moedas com os valores já convertidos, use a Exchange rate 
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
  
  PS: o desafio aqui é você implementar essa aplicação sozinho(a), antes 
  de ver as próximas aulas, ok? =)
*/
// const firstCurrency = document.querySelector('[data-js="currency-one"]')
// const secondCurrency = document.querySelector('[data-js="currency-two"]')
// const valueInput = document.querySelector('[data-js="currency-one-times"]')
// const valueOutput = document.querySelector('[data-js="converted-value"]')
// const conversionPrecision = document.querySelector('[data-js="conversion-precision"]')

// const key = 'a74dcf76a089efb012856f5e'
// const url = `https://v6.exchangerate-api.com/v6/${key}/latest/USD`

// const fetchCurrencyAPI = async url => {
//   try {
//     const response = await fetch(url)

//     if (!response.ok) {
//       throw Error('Não foi possível obter os dados')
//     }
    
//     const { conversion_rates } = await response.json()

//     return conversion_rates
//   } catch ({ name, message }) {
//     alert(`${name}: ${message}`)
//   }
// }

// const insertCurrencyList = async () => {
//   const currencyObj = await fetchCurrencyAPI(url)
//   const currencies = Object.keys(currencyObj)

//   currencies.forEach(currency => {
//     currency === 'USD'
//       ? firstCurrency.innerHTML += 
//           `<option value="${currency}" selected>${currency}</option>`
//       : firstCurrency.innerHTML += 
//           `<option value="${currency}">${currency}</option>`
//     currency === 'BRL'
//       ? secondCurrency.innerHTML += 
//           `<option value="${currency}" selected>${currency}</option>`
//       : secondCurrency.innerHTML += 
//           `<option value="${currency}">${currency}</option>`
//   })
// }

// const convertCurrency = async (firstCurrency, secondCurrency, inputValue) => {
//   const currencyObj = await fetchCurrencyAPI(url)
//   const currencyMultiplier = 
//   currencyObj[secondCurrency] / currencyObj[firstCurrency]

//   return (currencyMultiplier * inputValue).toFixed(2)
// }

// const getCurrencyPrecision = async (firstCurrency, secondCurrency) => {
//   const currencyObj = await fetchCurrencyAPI(url)
//   return `1 ${firstCurrency} = ${(currencyObj[secondCurrency] / currencyObj[firstCurrency]).toFixed(2)} ${secondCurrency}`
// }

// firstCurrency.addEventListener('change', async e => {
//   const currentCurrency = e.target.value

//   valueOutput.textContent = await convertCurrency(currentCurrency, secondCurrency.value, valueInput.value)
//   conversionPrecision.textContent = await getCurrencyPrecision(currentCurrency, secondCurrency.value)
// })
// secondCurrency.addEventListener('change', async e => {
//   const currentCurrency = e.target.value

//   valueOutput.textContent = await convertCurrency(firstCurrency.value, currentCurrency, valueInput.value)
//   conversionPrecision.textContent = await getCurrencyPrecision(firstCurrency.value, currentCurrency)
// })

// valueInput.addEventListener('input', async e => {
//   const inputValue = e.target.value

//   valueOutput.textContent = await convertCurrency(firstCurrency.value, secondCurrency.value, inputValue)
//   conversionPrecision.textContent = await getCurrencyPrecision(firstCurrency.value, secondCurrency.value)
// })

// insertCurrencyList()

const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const currenciesEl = document.querySelector('[data-js="currencies-container"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const valuePrecisionEl = document.querySelector('[data-js="conversion-precision"]')
const timesCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]')

const showAlert = err => {
  const div = document.createElement('div')
  const button = document.createElement('button')

  div.textContent = err.message
  div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
  button.classList.add('btn-close')
  div.setAttribute('role', 'alert')
  button.setAttribute('type', 'button')
  button.setAttribute('aria-label', 'Close')

  const removeAlert = () => div.remove()
  button.addEventListener('click', removeAlert)

  div.appendChild(button)
  currenciesEl.insertAdjacentElement('afterend', div)
}

const state = (() => {
  let exchangeRate = {}

  return {
    getExchangeRate: () => exchangeRate,
    setExchangeRate: newExchangeRate => {
      if (!newExchangeRate.conversion_rates) {
        showAlert({
           message: 'O objeto precisa ter uma propriedade convertion_rates' 
        })
        return
      }

      exchangeRate = newExchangeRate
      return exchangeRate
    }
  }
})()


const APIKey = 'a74dcf76a089efb012856f5e'
const getUrl = currency => 
  `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${currency}`

const getErrorMessage = errorType => ({
  'unsupported-code': 'A moeda não existe em nosso banco de dados.',
  'base-code-only-on-pro': 'O plano atual suporta informações apenas das moedas EUR e USD.',
  'malformed-request': 'O endpoint deve seguir a seguinte estrutura: https://v6.exchangerate-api.com/v6/[API_KEY]/latest/USD.',
  'invalid-key': 'A chave da API é inválida.',
  'quota-reached': 'O limite de requests do plano foi atingido.',
  'not-available-on-plan': 'O plano atual não permite esta operação.',
})[errorType] || 'Não foi possível obter as informações.'

const fetchExchangeRate = async url => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Sua conexão falhou. Não foi possível obter as informações')
    }

    const exchangeRateData = await response.json()

    if (exchangeRateData.result === 'error') {
      const errorMessage = getErrorMessage(exchangeRateData['error-type'])
      throw new Error(errorMessage)
    }

    return state.setExchangeRate(exchangeRateData)
  }catch (err) {
    showAlert(err)
  }
}

const getOptions = (selectedCurrency, conversion_rates) => {
  const setSelectedAttribute = currency => 
    currency === selectedCurrency ? 'selected' : ''
  const getOptionsAsArray = currency => 
    `<option ${setSelectedAttribute(currency)}>${currency}</option>`

  return Object.keys(conversion_rates)
    .map(getOptionsAsArray) 
    .join('')
}

const getMultipledExchangeRate = conversion_rates => {
  const currencyTwo = conversion_rates[currencyTwoEl.value]
  return (timesCurrencyOneEl.value * currencyTwo).toFixed(2)
}

const getNotRoundedExchangeRate = conversion_rates => {
  const currencyTwo = conversion_rates[currencyTwoEl.value]
  return `1 ${currencyOneEl.value} = ${1 * currencyTwo} ${currencyTwoEl.value}`
}

const showInitialInfo = ({ conversion_rates }) => {
  currencyOneEl.innerHTML = getOptions('USD', conversion_rates)
  currencyTwoEl.innerHTML = getOptions('BRL', conversion_rates)

  showUpdatedRates({ conversion_rates })
}

const init = async () => {
  const url = getUrl('USD')
  const exchangeRate = await fetchExchangeRate(url)

  if (exchangeRate && exchangeRate.conversion_rates) {
    showInitialInfo(exchangeRate)
  }
}

const showUpdatedRates = ({ conversion_rates }) => {
  convertedValueEl.textContent = getMultipledExchangeRate(conversion_rates)
  valuePrecisionEl.textContent = getNotRoundedExchangeRate(conversion_rates)
}

const handleTimesCurrencyOneElInput = () => {
  const { conversion_rates } = state.getExchangeRate()
  const multipliedExchangeRate = getMultipledExchangeRate(conversion_rates) 

  convertedValueEl.textContent = multipliedExchangeRate
}

const handleCurrencyTwoElInput = () => {
  const exchangeRate = state.getExchangeRate()
  showUpdatedRates(exchangeRate)
}

const handleCurrencyOneElInput = async e => {
  const url = getUrl(e.target.value)
  const exchangeRate = await fetchExchangeRate(url)

  showUpdatedRates(exchangeRate)
}

timesCurrencyOneEl.addEventListener('input', handleTimesCurrencyOneElInput)
currencyTwoEl.addEventListener('input', handleCurrencyTwoElInput)
currencyOneEl.addEventListener('input', handleCurrencyOneElInput)

init()
