# **CJRM** | Etapa 04 - Objetos

## O que são objetos?

Podemos traçar um paralelo sobre a definição de objetos com objetos do mundo real, onde os objetos possuem ações e propriedades, como por exemplo um celular. Um celular possui propriedades como tamanho, cor, modelo e ações como enviar mensagens, realizar ligações e navegar na internet. Já os objetos no JavaScript, como por exemplo um usuário, possui propriedades como nome, email e telefone, e pode realizar ações como login e logout.

De forma geral, objetos no JS possibilitam a criação de estruturas de dados que representam elementos do código ou da aplicação web.

* ### Criando um objeto literal:

Para criarmos um objeto literal, utilizamos a notação "{}", onde dentro das chaves serão inseridas propriedades/chaves como "name", que recebe um valor. As propriedades são separadas por ",".

```js
let user = {
    name: 'Joao',
    age: 22
    email: 'joaogabriel@hotmail.com',
    city: 'Curitiba'
    blogPosts: ['Dano ou CDR na matchup irelia x fiora', 'Slow fight ou hard engage?']
}

console.log(typeof user)    // Retorna object
```

Para acessar uma propriedade de um objeto, é utilizado o "." ou "[]".

```js
console.log(user.name)      // Retorna 'Joao'
console.log(user[name])     // Retorna 'Joao'
```

As propriedades podem ser modificadas atribuindo a elas um novo valor

```js
user['name'] = 'José'       // name passa a 'José'

user.age = 23               // age passa a ser 23

console.log(user['name'])   // Retorna 'Jose'
console.log(user.age)       // Retorna 23
```

Utilizando a notação de colchetes, é possível acessar as propriedades utilizando variáveis. Com a notação de ponto, não é possível realizar o mesmo procedimento

```js
const key = 'email'

console.log(user[key])      // Retorna o email
```

* ### Adicionando métodos ao objeto:

Os métodos são funções criadas dentro de um objeto. Adição de métodos a objetos funciona como adicionar ações a eles, como por exemplo uma ação de login

```js
let user = {
    name: 'Joao',
    age: 22
    email: 'joaogabriel@hotmail.com',
    city: 'Curitiba'
    blogPosts: ['Dano ou CDR na matchup irelia x fiora', 'Slow fight ou hard engage?']
    login: function () {
        console.log('Usuário logado')
    }
    logout: function () {
        console.log('Usuário deslogado')
    }
}
```

*Quando uma propriedade armazena uma função, ela é chamada de método*

```js
user.login()                // Retorna 'Usuário logado'
```

## Variáveis e escopo de bloco

* ### O que são escopos?
Escopos são a área em que uma variável está disponível para uso. Quando declaradas fora de blocos de códigos, elas são definidas para o escopo global, ou seja, pode ser acessada/usada em qualquer lugar do arquivo, tanto dentro quanto fora de blocos de códigos.

```js
let age = 31

if (true) {
    console.log(`dentro do 1° bloco de código: ${age}`)
}

console.log(`dentro do 1° bloco de código: ${age}`)
```

O código acima retornará no console tanto o console.log dentro do bloco do if, quanto do que está fora, pois a variável foi definida para o escopo global. Caso o valor da variável seja alterado dentro do bloco de código, ele será alterado para o escopo global também.

Entretanto, é possível declarar uma variável de mesmo nome dentro de um bloco de código, desta forma o console.log do bloco if retornará o valor que foi declarado dentro do bloco, já o outro, retornará o valor da variável de escopo global.

```js
let age = 31

if (true) {
    let age = 41
    console.log(`dentro do 1° bloco de código: ${age}`)
}

console.log(`dentro do 1° bloco de código: ${age}`)
```

O código acima irá retornar no console primeiro 41, valor definido dentro do bloco if, depois 31, valor definido no escopo global.

```js
let age = 31

if (true) {
    let age = 41
    console.log(`dentro do 1° bloco de código: ${age}`)

    if (true) {
        console.log(`dentro do 2° bloco de código: ${age}`)
    }
}

console.log(`dentro do 1° bloco de código: ${age}`)
```

Dentro do secundo bloco de código, a variável considerada será a declarada mais próxima, ou seja, irá retornar 41 no código acima. Porém, é possível declarar uma nova variável dentro deste bloco aninhado, assim este valor será considerado.

As variáveis declaradas com a keyword "var" **ignoram** escopo de blocos, sendo assim, variáveis declaradas dentro do escopo de bloco podem ser utilizadas no escopo global.

* ### Keyword this

```js
let user = {
    name: 'Joao',
    age: 22
    email: 'joaogabriel@hotmail.com',
    city: 'Curitiba'
    blogPosts: ['Dano ou CDR na matchup irelia x fiora', 'Slow fight ou hard engage?']
    login: function () {
        console.log('Usuário logado')
    }
    logout: function () {
        console.log('Usuário deslogado')
    }
}
```

Dado o código acima, imagine se quisessemos exibir a propriedade 'blogPosts', no console. Para isso, pensaríamos inicialmente em criar um método que exibiria essa informação no console, como no exemplo abaixo:

```js
let user = {
    name: 'Joao',
    age: 22
    email: 'joaogabriel@hotmail.com',
    city: 'Curitiba'
    blogPosts: ['Dano ou CDR na matchup irelia x fiora', 'Slow fight ou hard engage?']
    login: function () {
        console.log('Usuário logado')
    }
    logout: function () {
        console.log('Usuário deslogado')
    }
    logBlogPosts: function () {
        console.log(blogPosts)
    }
}
```

O código acima resultaria num erro, acusando que blogPosts não está definido. Para acessarmos uma propriedade que está dentro do obj, precismos utilizar a keyword **this**.

```js
  let user = {
  name: 'Joao',
  age: 22,
  email: 'joaogabriel@hotmail.com',
  city: 'Curitiba',
  blogPosts: ['Dano ou CDR na matchup irelia x fiora', 'Slow fight ou hard engage?'],
  login: function () {
    console.log('Usuário logado')
  },
  logout: function () {
    console.log('Usuário deslogado')
  },
  logBlogPosts () {
    console.log(`${this.name} escreveu os seguintes posts:`)
      
    console.log(this.blogPosts.forEach(post => {
        console.log(post)
    }))
  }
}
```

A keyword this é um **objeto de contexto**, ou seja, ele representa o contexto no qual o código atual está sendo executado. O valor dele pode ser alterado de acordo com o contexto que é referenciado.

Caso this seja referenciado no escopo global, irá retornar o objeto window.

Quando o this é declarado num método utilizando arrow function, ele não assume o contexto do bloco de código, por isso é necessário utilizar function declaration para que funcione corretamente.

* ### Objetos em arrays

É possível inserir objetos dentro de arrays, mesmo sendo dentro de outros objetos. Podemos exemplificar estes casos com o objeto user que definimos anteriormente.

```js
  let user = {
  name: 'Joao',
  age: 22,
  email: 'joaogabriel@hotmail.com',
  city: 'Curitiba',
  blogPosts: [
    {title: 'Dano ou CDR na matchup irelia x fiora', likes: 30},
    {title: 'Slow fight ou hard engage?', likes: 50}
  ],
  login () {
    console.log('Usuário logado')
  },
  logout () {
    console.log('Usuário deslogado')
  },
  logBlogPosts () {
    console.log(`${this.name} escreveu os seguintes posts:`)

    this.blogPosts.forEach(post => {
      console.log(post.title, post.likes)
    })
  }
}
```

* ### Objeto math

Em JavaSript, existe um objeto nativo chamado math, podemos exibi-lo no console para vermos os métodos que são possíveis invocarmos com ele.

```js
console.log(Math)
```

Um dos métodos que podemos utilizar é o round:

```js
const area = 7.7

console.log(Math.round(area))
```

Existem diversos métodos para arredondamento, como o round, floor, ceil e trunc.

É possível também gerar números aleatórios com um método do obj Math:

```js
const randomNumber = Math.random()
```

Este método irá retornar um número aleatório entre 0 e 1.

Podemos também gerar um número aleatório de 0 a 100 com o seguinte método

```js
console.log(Math.round(randomNumber * 100))
```

* ### Tipos primitivos e tipo de de referência

#### Tipos Primitivos

* Numbers
* Strings
* Booleans
* Null
* Undefined
* Symbol
* BigInt

#### Tipos de Referência

* Todos os Tipos de Objetos
  * Objetos literais
  * Arrays
  * Funções
  * Datas
  * Todos os outros objetos

A diferença entre estes 2 tipos, é a forma que eles são armazenados na memória pelo JavaScript. 

Quando definimos um tipo primitivo, ele é armazenado numa stack. A stack é como se fosse uma "pilha" de valores, onde podemos acessá-los de forma rápida, entretanto, o espaço dela é pequeno.

Quando definimos um tipo de referência, ele é armazenado no heap.

Para acessarmos os valores armazenados na **stack**, referenciamos o nome da variável declarada, já para acessarmos os valores armazenados no **heap**, referenciamos o nome da variável que irá ser atribuída a um **pointer** dentro da **stack**. Esse **pointer** irá apontar para o tipo de referência armazenado no **heap**.

Caso uma variável de tipo primitivo seja declarada, logo após seja feita um cópia dela referenciando em outra variável de outro nome, os valores continuam sendo armazenados separadamente.

```js
let scoreOne = 50           // Variável de tipo primitivo "number"
let scoreTwo = scoreOne     // scoreTwo recebe o valor de scoreOne e armazena separadamente na stack
scoreOne = 100              // Caso o valor da scoreOne seja alterado após a declaração de scoreTwo, o valor de scoreTwo continuará sendo 50
```

No caso dos tipos de referência, se uma variável for copiada para outra de nome diferente, os ponteiros armazenados na stack estarão apontando para o mesmo objeto, sendo assim, tudo que for modificado na em alguma das variáveis, será também modificado na outra. Portanto, quando copiamos um tipo de referência para outra variável, estamos apenas copiando o ponteiro armazenado na stack, fazendo com que todas as variáveis copiadas apontem para o mesmo objeto.

```js
let userOne = {name:'Joao', score:100}
let userTwo = userOne
UserOne.score = 50
// userTwo também irá replicar a alteração feita em userOne, ou seja, o valor do score será de 50 para as 2 variáveis
```
