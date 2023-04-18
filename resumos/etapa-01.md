# **CJRM** | Etapa 01 - Os Primeiros Passos

* ## O que é um servidor?

É um computador em outro lugar que contém os arquivos que são requisitados pelo usuário, ou seja, o usuário envia um request e o server devolve uma response.
A extensão do live server transforma seu próprio computador num servidor, onde o navegador irá buscar os requests dentro da sua própria máquina.    

* ## Declaração de variaveis

```js
let age = 31
```
"deixe o container/variavel age armazenar o número 31"

O símbolo de "=" no js deve ser visto como atribuição, não igualdade.

a variável declarada com let pode ter seu valor reatribuído, sendo referenciado apenas o nome e a atribuição:

```js
age = 32
```

variáveis declaradas como const, não podem ter seu valor reatribuído, ao tentar executar a operação, o seguinte erro aparece:
```js
const points = 100
points = 101
console.log(points)
'Uncaught TypeError: Assignment to constant variable.'
```
antigamente as variáveis eram declaradas apenas pela keyword var, qualquer variável poderia ter seu valor reatribuído.

existem algumas convenções para a criação de variáveis, como por exemplo camelCase.

* ## Métodos de strings

replace(), slice(), IndexOf(), lastIndexOf(), length()

```js
const name = 'Joao'
const lastName = 'Gabriel'
const email = 'joaogabriel@hotmail.com'

email[0] // retorna o primeiro caractere da string

email.indexOf('@') // retorna o index do caractere do argumento

email.slice(0, 11) // retorna a string até o caractere @

email.lastIndexOf('o') // retorna o index da ultima ocorrencia do argumento

email.length() // retorna o numero de caracteres da string

const fullName = name + lastName // forma de concatenar strings

name.toUpperCase() // transforma a strings em capslock

name.toLowerCase() // transforma a string em minuscula
```

### Template Strings

A fim de evitar sintaxe com má legibilidade, as templates strings são utilizadas para injetar variáveis dentro de strings, sem concatenação

```js
const postTitle = 'É bolacha ou biscoito?'
const postAuthor = 'Matheus Saad'
const postComments = 15
```

* Com concatenação:
```js
const postMessage = 'O post "' + postTitle + '", do ' + postAuthor + ', tem ' + postComments + ' comentários.'
```

* Com Template Strings
```js
const postMessage2 = `O post "${postTitle}" do "${postAuthor}, tem "${postComments}" comentários `
```

#### Criando template HTML com template strings

```js
const html = `
    <h2>${postTitle}</h2>
    <p>${postAuthor}</p>
    <span>Este post contém ${postComments} comentários</span>
`
```

* ## Arrays

Um array é declarado no JavaScript pela notação de "[ ]", os elementos inseridos nele podem ser acessados por meio de índices

```js
let heroes = ['Batman', 'Catwoman', 'Iron Man']

console.log(heroes[0]) // Retornará no console 'Batman'
```

É possível armazenar mais de um tipo de dado dentro de um array, porém não faz muito sentido termos isso, já que normalmente são inseridos dados que possuem relação dentro do array. Exemplo:

```js
let randomArray = ['Parker', 'Diana', 19, 18]
```

### Métodos de arrays

A propriedade length num array retorna a quantidade de itens dentro dele

```js
console.log(heroes.length) // Retornará no console 3, que é o número de itens dentro do array
```

O método join() faz com que os elementos do array sejam concatenados com vírgula

```js
const joinHeroes = heroes.join()

console.log(joinHeroes) // Retornará no console "Batman,Catwoman,Iron Man"
```

Este método pode receber um argumento opcional que é o separador que será utilizado, podendo substituir a vírgula por qualquer outra string, por exemplo: join('-').

O método indexOf(), assim como nas strings, retorna o índice do argumento que é passado, caso o valor não seja encontrado, retornará -1.

```js
let ages = [31, 25, 39, 40, 25]

console.log(ages.indexOf(25)) // Retornará no console 1
console.log(ages.indexOf('25')) // Retonará no console -1
```

O método concat() é utilizado para concatenar novos itens ao array, porém ele NÃO altera o array original. Ex:

```js
const moreHeroes = heroes.concat(['Superman', 'Wolverine'])

console.log(moreHeroes) // Retornará no console '"Batman", "Catwoman", "Iron Man", "Superman", "Wolverine"'
```

O método push() adiciona novos itens ao array, além disso, ele retorna a nova length do array e ALTERA o array original

```js
const pushToHeroes = heroes.push(['Cyclops', 'Hulk'])

console.log(pushToHeroes) // Retornará no console 5, a nova length do array
console.log(heroes) // Retornará no console o array com os novos itens adicionados
```

O método pop() remove o último item do array, modificando o array original e funcionando também como um container para o item que será removido.

```js
const popHeroes = heroes.pop()

console.log(popHeroes) // Retornará no console 'Hulk'
console.log(heroes) // Retornará no console o array sem o item 'Hulk'
```

* ## Null e Undefined

    * #### Undefined
        * Retornado quando uma string não possuí valor
        * Não é atribuído propositalmente
        * Pode ser transformado em string
        * Não pode ser somado com um number (retorna NaN(Not a Number))

    ```js
    let undefinedVariable

    console.log(undefinedVariable)      // Retorna undefined
    console.log(undefinedVariable + 3)  // Retorna NaN
    console.log(`${undefinedVariable}`) // Retorna 'undefined'
    ```

    * #### Null
        * Atribuído a uma variável propositalmente para ter valor nulo
        * Pode ser transformado em string
        * Pode ser somado com um number
        * Quando interpretado como um number, assume o valor de 0

    ```js
    let nullVariable = null

    console.log(nullVariable)                            // Retorna null
    console.log(nullVariable + 3)                        // Retorna 3
    console.log(`O valor da variável é ${nullVariable}`) // Retorna 'null'
    ```

* ## Booleans

Retornam apenas true ou false, a fim de validar informações do código. Por exemplo:

```js
const email = 'brucewayne@rogermelo.com.br'
const includes = email.includes('@') // O método includes verifica se o argumento passado existe

console.log(includes) // O método includes retorna um boolean
```

O mesmo método pode ser aplicado a arrays, tendo o seguinte resultado:

```js
const names = ['dio', 'roger', 'robert']
const arrayIncludes = names.includes('roger')

console.log(arrayIncludes)
```

Além disso, os booleans são aplicados aos **operadores de comparação**, exemplo:

```js
const age = 31
const name = 'roger'

console.log(age == 31)          // true
console.log(age == 35)          // false
console.log(age != 35)          // true (!= significa diferente)
console.log(age > 30)           // true
console.log(age > 31)           // false
console.log(age < 32)           // true
console.log(age <= 31)          // true (<= significa menor ou igual)
console.log(age >= 31)          // true (<= significa maior ou igual)

console.log(name == 'roger')    // true
console.log(name == 'Roger')    // false (JS é case sensitive)
console.log(name > 'belinha')   // true (O JS considera como critério a primeira letra)
console.log(name > 'Roger')     // true (Para o JS, letras minúsculas possuem prioridade)
```

Os operadores "==" e "!=" ignoram o tipo de valor que estão comparando, pois é feita uma conversão para number "por baixo dos panos", causando alguns problemas, como:

```js
console.log(age == 31)          // true
console.log(age == '31')        // true, mesmo comparando com uma string
console.log(age != 31)          // false
console.log(age != '31')        // false, mesmo comparando com um number
```

Para evitar este problema, utilizamos os operadores "===" e ""

```js
console.log(age === 31)         // true
console.log(age === '31')       // false
console.log(age !== 31)         // false
console.log(age !== '31')       // true
```

## * Conversão de Tipos

É utilizado quando é necessário transformar o tipo de valor em uma variável, como no exemplo abaixo:

```js
let score = '100'

console.log(score + 1)
```

O resultado da operação não será o valor esperado, já que o valor 1 de tipo **number**, será somado ao valor 100 de tipo **string**, resultando em 1001. Para corrigir isto, podemos fazer a seguinte operação:

```js
score = Number(score)

console.log(score + 1)
console.log(typeof score)                   // Retorna o tipo de um valor
```

Ao tentar fazer a conversão de uma string alfabética com a **função construtora** Number(), será retornado NaN, já o contrário, ao converter um number para string, utilizando a **função construtora** String(), o number será convertido para string. Já para a conversão do tipo Boolean, utiliza-se a **função construtora** Boolean().

```js
const crazyConversion = 'Maçã'
const convertedNumber = 97
const booleanConversion = 10

console.log(Number(crazyConversion))        // Retornará NaN
console.log(String(convertedNumber))        // Retornará uma string 97
console.log(Boolean(booleanConversion))     // Retornará True
```

O critério que o JS utiliza para definir se um número convertido para Boolean será True ou False, é dado por:

* Valores falsy:
    * False
    * 0
    * "", '', ``
    * null
    * undefined
    * NaN

* Valores truthy:
    * Qualquer valor diferente dos listados acima
