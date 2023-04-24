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

As variáveis declaradas com a key word "var" *ignoram* escopo de blocos, sendo assim, variáveis declaradas dentro do escopo de bloco podem ser utilizadas no escopo global.

* ### Key word this
