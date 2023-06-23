# **CJRM** | Etapa 08 - Métodos de Array

## Método map

  Map é um método de array usado para gerar um novo array com a mesma quantidade de itens do array original, porém com cada item transformado, ou seja, o método irá iterar por todos os itens do array e executar uma função passada como argumento para cada item, retornando então um novo array com os itens modificados pela função.

  A declaração do método é feita da seguinte forma:
  array.map((item, index, array) => {})

  ```js
  const numbers = [1, 2, 3]
  const doubleNumbers = numbers.map(item => item * 2) // Retorna o array [2, 4, 6]
  ```

  Este método não modifica o array original.

  Exemplo:
  Existe um array com preços de produtos que irá sofrer uma alteração devido a uma promoção

  ```js
  const prices = [20, 10, 30, 25, 15, 40, 80, 5]
  const salePrices = prices.map(price => price / 2)

  console.log(salePrices)
  ```

  Agora o array de produtos será composto por objetos com propriedades name e price, o desconto de 50% deverá ser aplicado apenas para os produtos com preço acima de 30 reais 

  ```js
  const products = [
    { name: 'Mouse Sem Fio', price: 30 },
    { name: 'Pen Drive', price: 25 },
    { name: 'Cartucho de Tinta', price: 50 },
    { name: 'Suporte Ergonômico para Notebook', price: 23 },
    { name: 'Repetidor de Sinal Wi-Fi', price: 44 }
  ]

  const saleProducts = products.map(product => {
    if (product.price >= 30) {
        return { name: product.name, price: product.price / 2 }
    }

    return product
  })
  ```

  Para que o código tenha um bom funcionamento e o método não modifique o array original, dentro do If utilizamos um return contendo um objeto com tanto o nome do produto, quanto o preço divido por 2, pois se for utilizado diretamente o product.price / 2, irá modificar o array original.

## Método filter

  Similar ao método map, o filter também executa uma função para cada item de um array, porém ele serve para obter um novo array de itens de acordo com alguma condição. Por exemplo, dentro de um array de números aleatórios, é desejado obter um array com apenas os números maiores que 37:

  ```js
  // array.filter((item, index, array) => {}) Declaração do método filter
  const randomNumbers = [36, 99, 37, 63]

  const numbersGreaterThan37 = randomNumbers.filter(item => item > 37)

  console.log(numbersGreaterThan37)  
  ```  

  O método filter sempre retorna um boolean, que é critério para o novo array que é gerado.

  Exemplo 2: 
  ```js
  const users = [
    { name: 'Ada Lovelace', premium: true },
    { name: 'Grace Hopper', premium: false },
    { name: 'Alan Turing', premium: true },
    { name: 'Linus Torvalds', premium: false },
    { name: 'Margaret Hamilton', premium: true }
  ]

  const premiumUsers = users.filter(user => user.premium)

  console.log(premiumUsers)
  ```

## Método reduce

  Assim como o map e o filter, o reduce também executa uma função para cada item do array, porém ele é utilizado quando é necessário reduzir o array original a outro tipo de dado, não retornando necessariamente um novo array.

  No exemplo abaixo, o array numbers irá ser reduzido a um número, que será a soma dos números do array.

  ```js
  // array.reduce((accumulator, item, index, array) => {}, 0) Declaração do método reduce
  const numbers = [1, 2, 3]
  const sumResult = numbers.reduce((accumulator, item) => accumulator + item, 0)

  console.log(sumResult)  // Retorna o número 6
  ```

  No segundo exemplo, o objetivo é obter a pontuação total atingida por um jogador, onde dentro do array é possível que exista mais de 1 jogada da mesma pessoa.

  ```js
    const phaseScores = [
    { name: 'Vinicius Costa', score: 337 },
    { name: 'Roger Melo', score: 43 },
    { name: 'Alfredo Braga', score: 234 },
    { name: 'Pedro H. Silva', score: 261 },
    { name: 'Ana Paula Rocha', score: 491 },
    { name: 'Vinicius Costa', score: 167 },
    { name: 'Roger Melo', score: 137 },
    { name: 'Alfredo Braga', score: 135 },
    { name: 'Ana Paula Rocha', score: 359 },
    { name: 'Pedro H. Silva', score: 133 }
  ]

  const rogerScore = phaseScores.reduce((accumulator, phaseScore) => {
    if (phaseScore.name === 'Roger Melo') {
      accumulator += phaseScore.score
    }

    return accumulator
  }, 0)

  console.log(rogerScore)
  ```