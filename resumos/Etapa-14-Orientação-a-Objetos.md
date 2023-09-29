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

## O que é orientação a objetos

***A orientação a objetos é uma forma de programar, onde os dados são encapsulados em objetos que serão trabalhados posteriormente na aplicação.***

Em javascript existem dois tipos de dados, os primitivos(number, string, bigInt, boolean) e os de refências (arrays, funções e todos aqueles que não são primitivos). Todo tipo de referência é na verdade um objeto, e podemos confirmar isto quando exibimos, por exemplo, um array no console, que será retornado a mesma sintaxe de um objeto, porém as propriedades são os índices do array.

Até aqui, estávamos acostumados a criar arrays e objetos com a notação de colchetes e chaves, porém é possível criá-los de uma forma alternativa, utilizando construtores embutidos da linguagem. Os construtores são objetos ou funções que constroem novos objetos. Vamos exemplificar a criação de um array a partir de um construtor: 

```js
const numbers = [1, 2, 3]           // Sintaxe utilizada até aqui para arrays
const numbers2 = new Array(1, 2, 3) // Sintaxe utilizando construtores
```

Neste exemplo acima, temos 2 pontos importantes a se observar, o primeiro é a palavra chave new, que é responsável por sinalizar a criação de um novo objeto, e o segundo é o nosso construtor, que sinaliza o tipo de dado que está sendo criado. Os contrutores existentens no javascript podem ser encontrados na [documentação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).

Apesar da existência dessa sintaxe para criação de tipos de referência, é interessante sempre optar pela forma funcional (sintaxe que foi utilizada até aqui). Um caso comum em que é necessário o uso dos construtores é em conversão de tipos, quando queremos transformar uma string em número por exemplo.

```js
Number('7') // Retorna um number
```

Os construtores são utilizados pela linguagem por baixos dos panos, onde funcionam como ***wrapper objects***. Um exemplo disto na prática é quando usamos métodos em tipos primitivos, como por exemplo o .length numa string, teoricamente não seria possível utilizar um método em algo que não seja um objeto, entretanto, por baixo dos panos o javascript envolve o tipo primitivo num ***wrapper***, transformando ele num objeto e possibilitando o uso de métodos. Assim que o método é executado, o javascript apaga o objeto da memória e o tipo primitivo não sofre nenhuma mutação.

O que acontece na prática, será exemplificado abaixo:

```js
const name1 = 'João'
const name2 = new String('João')
```

A diferença existente entre a declaração do name1 e name2, é que no name1 estamos declarando uma string em sua forma funcional, encadear normalmente seus métodos que serão executados conforme explicado no parágrafo anterior, entretanto, quando criamos a mesma string através de seu construtor, vemos que na verdade é criado um objeto do tipo string, e é isso que o javascript faz por baixo dos panos. Se exibirmos o name2 no console, veremos um objeto com todos os métodos que uma string pode receber, e toda string em sua forma funcional é convertida através de seu construtor temporariamente.

## Introdução a Classes
Quando precisamos criar objetos que não serão reutilizados no código, ou que serão declarados poucas vezes, utilizamos a forma literal de criação dos objetos, mas se quisermos por exemplo, numa aplicação criar um objeto "user", que será replicado centenas de vezes, é necessário encontrar formas melhores de fazer isso sem ser modificar manualmente cada declaração.

Vamos exemplificar a situação de objetos user abaixo:

```js
const user = {
  name: 'João',
  email: 'joao@gmail.com',
  login: () => 'O usuário logou',
  logout: () => 'O usuário deslogou'
}

const user2 = {
  ...user,
  name: 'Paulo Henrique',
  email: 'ph@gmail.com'
}
```

Neste cenário, seria desejável que pudessemos apenas declarar um novo usuário passando como argumento seu nome e email, já que estas são as propriedades que estamos modificando, e isso é possível através da criação de um novo **construtor**, ou seja, não precisamos ficar presos aos construtores embutidos da linguagem.

Antigamente, a forma mais comum para criação de objetos parecidos era utilizar *prototypes*, porém atualmente as **classes** são utilizados, que é uma forma de abstração dos prototypes. As classes funcionam como uma "planta" de um objeto, onde será arquitetado como ele irá se comportar.

Abaixo, iremos criar uma classe User, responsável por criar novos objetos de acordo nossas necessidades.

```js
class User {
  constructor (name, email) {
    this.name: name,
    this.email: email
  }
}

const user = new User('Joao', 'joao@gmail.com')
const user2 = new User('Giulia', 'giulia@gmail.com')
```

Agora iremos explicar passo a passo do que o código acima faz:

1. Uma classe utilizando a palavra-chave class foi criada, onde o nome dela sempre irá iniciar com letras maiúsculas, para diferenciar de funções normais.
2. A partir da criação da classe e sua abertura de chaves, precisamos utilizar a palavra constructor, que será responsável por construir o objeto que estamos criando.
3. Dentro do constructor, referenciamos com o this a propriedade que iremos criar, ela irá receber o valor recebido no parâmetro do constructor.
4. Agora com a classe criada, vamos criar uma instância, que nada mais é do que um objeto que é gerado pelo construtor.
5. Na declaração, é importante frisar que o new é responsável por fazer com que o this referencie o objeto que está sendo criado, e não o window, além disso, é ele que invoca o constructor da nossa classe.
6. Finalmente, chamamos o classe criada e passamos como argumento os valores que serão recebidos no parâmetro do constructor, gerando então o objeto que desejamos.

## Métodos em classes
Para que os objetos criados pela classe tenham métodos, não podemos criar ele dentro do constructor, pois ele é responsável somente por definir quais propriedades o objeto criado terá, portanto, a declaração do método deve ser feita fora do bloco do constructor. Assim como a declaração do constructor, os métodos não precisam da palavra-chave function para serem declarados.

Abaixo iremos exemplificar a implementação dos métodos de login e logout dentro da classe.

```js
class User {
  constructor (name, email) {
    this.name = name
    this.email = email
  }

  login () {
    return `${this.name} logou na aplicação.`
  }

  logout () {
    return `${this.name} deslogou da aplicação.`
  }
}
```

Se quisermos encadear métodos dentro do nosso novo objeto, como uma situação onde quando o usuário realiza login ele receba um ponto, precisamos que o método que será encadeado retorne o this, que é o objeto que será criado.

```js
class User {
  constructor (name, email) {
    this.name = name
    this.email = email
    this.points = 0
  }

  login () {
    `${this.name} logou na aplicação.`
    return this
  }

  logout () {
    return `${this.name} deslogou da aplicação.`
  }

  addPoints () {
    this.points++
    return `${this.name} agora tem ${this.points > 1 ? 'pontos' : 'ponto'}`
  }
}

const user = new User('Joao', 'joao@gmail.com')
user.login().addPoints()
```

## Herança entre classes
A herança entre classes é fazer com que uma subclasse receba propriedades e métodos de uma outra classe, para isso, é utilizada a palavra chave extends, conforme o exemplo abaixo:

```js
class Mammal {
  constructor (species, name, age) {
    this.species = species
    this.name = name
    this.age = age
    this.mammaryGland = true
  }

  incrementAge () {
    this.age++
  }
}

class Lion extends Mammal {

}

const zeca = new Mammal('zebra', 'Zeca', 6)
const pompeu = new Mammal('gnu', 'Pompeu', 5)
const angus = new Mammal('cavalo', 'Angus', 3)
const mufasa = new Lion('leão', 'Mufasa', 7)


mufasa.incrementAge()
console.log(mufasa)
```

Neste caso, estamos criando uma nova classe leão que recebe uma coṕia de todas os métodos e propriedades da classe de mamíferos, e se prestarmos atenção, vemos que a classe Lion não possui um constructor, pois quando trabalhamos com herança, se a classe que herdar as propriedades não tiver um constructor, ela herdará também o constructor.

Agora vamos adicionar a nova classe Lion um método único dela, que não deve estar dentro da classe de mamíferos.

```js
class Mammal {
  constructor (species, name, age) {
    this.species = species
    this.name = name
    this.age = age
    this.mammaryGland = true
  }

  incrementAge () {
    this.age++
  }
}

class Lion extends Mammal {
  eatZebras (animals) {
    return animals.filter(animal => animal.species !== 'zebra')
  }
}

const zeca = new Mammal('zebra', 'Zeca', 6)
const pompeu = new Mammal('gnu', 'Pompeu', 5)
const angus = new Mammal('cavalo', 'Angus', 3)
const mufasa = new Lion('leão', 'Mufasa', 7)

const animals = [zeca, pompeu, angus]

mufasa.incrementAge()
console.log(mufasa.eatZebras(animals))
```

Agora, os objetos criados com a classe Lion possuem o método eatZebras(), e os animais criados com a classe Mammal não irão possuir esse método. Abaixo será exemplificado como adicionar propriedades únicas à classe herdada.
