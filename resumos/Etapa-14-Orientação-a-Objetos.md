# **CJRM** | Etapa 14 - Orientação a Objetos

## Mais sobre o Spread Operator: Unindo objetos e arrays
Um dos usos do spread operator é a possibilidade de unir objetos e arrays, porém, é importante lembrar que tanto o spread operator, quando o método .concat(), fazem cópias rasas (shallow copy). Vamos conferir um exemplo abaixo de como podemos juntar 2 arrays usando o spread operator:

```js
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

const newArray = [...arr1, ...arr2]
// const newArray = [0, ...arr1, 3.5, ...arr2, 7] É possível inserir novos itens junto array que será criado.

console.log(newArray)
```

Já para unir dois objetos, podemos ou usar o Object.assign(), que recebe como argumento um objeto target, e segundo argumento os objetos que serão inseridos no target, ou utilizar o spread operator. Vamos ver primeiro como seria realizar essa cópia com o Object.assign().

```js
const obj1 = { prop1: 1, prop2: 2 }
const obj2 = { prop3: 3, prop4: 4 }
const obj3 = Object.assign({}, obj1, obj2)
```

Já com o spread operator, a mesma operação seria da seguinte maneira:

```js
const obj1 = { prop1: 1, prop2: 2 }
const obj2 = { prop3: 3, prop4: 4 }
const obj3 = { ...obj1, ...obj2}
```

## Mais sobre o Spread Operator: Casos de uso em strings e funções
No caso de strings, quando usamos o spread operator ele realiza uma função similar ao .split(), onde a string passada é separada em cada caracter, e se envolvermos a expressão num array, iremos obter o mesmo resultado do .split().

```js
const str = 'abc'

const splittedStrBySplit = splittedString.split('')   // Retorna um array com os caracteres da string
const splittedStrBySpread = [...str]                  // Retorna um array com os caracteres da string
```

O spread operator também pode ser utilizado em funções, para exemplificar isso vamos imaginar um cenário onde precisamos obter o menor e o maior número de um array.

```js
const numbers = [7, 3, 5, 3.1, 9]

console.log(Math.min(numbers))
console.log(Math.max(numbers))
```

Ao executar o código acima, vemos que o console retornou NaN, pois os métodos min e max só recebem números como argumentos. Este é um caso claro de uso do spread operator, para assim "espalharmos" os números contidos no array dentro do argumento do método.

```js
const numbers = [7, 3, 5, 3.1, 9]

console.log(Math.min(...numbers))
console.log(Math.max(...numbers))
```

Agora, vemos que foi retornado no console o menor e o maior número do array.
