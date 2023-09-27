# **CJRM** | Etapa 11 - JavaScript Assíncrono

## Código assíncrono em JavaScript

### O que é?

Entender o que é um código assíncrono, é entender a forma que as tarefas são executadas em JavaScript. Um bom exemplo de operação assíncrona é a busca de dados em uma API, onde é necessário aguardar uma resposta do servidor.

#### "*É um código que inicia um processo agora e finaliza esse processo posteriormente*"

Um código síncrono é algo que segue a "natureza" do js, pois a linguagem é desenhada para realizar a execução linha por linha e de cima para baixo. Uma prova rápida disto é escrevermos 3 linhas com um console.log(), assim veremos que a execução sempre acontecerá da mesma forma.

```js
console.log('Linha 1')
console.log('Linha 2')
console.log('Linha 3')
```

A execução de cada instrução só é realizada assim que a anterior é finalizada, o que caracteriza a linguagem como ***single thread***.

Voltando ao exemplo assíncrono de obtenção de dados via API, digamos que exista uma sequência de 3 instruções, onde a segunda é este *request* via API, a princípio a terceira instrução só será executada assim que o request for concluído, independente de quanto tempo isto leve, travando o nosso código na instrução 2 até que ela seja concluída. Para caracterizar este tipo de situação, é utilizado o termo "Blocking Code".

Para contornar o problema causado pelo Blocking Code, o js assíncrono é utilizado, onde será informado que a operação desejada será executada em "background", normalmente ativando uma callback function quando for finalizada, garantindo então um bom funcionamento da aplicação. 

## Código assíncrono na prática

Para ilustrar o exemplo que elaboramos, vamos utilizar a função já conhecida setTimeout(), que é uma função assíncrona.

```js
console.log(1)
console.log(2)

setTimeout(() => {
  console.log('função de callback executada')
}, 2000)

console.log(3)
console.log(4)
```

Com base no código acima, é possível ver que todos os console.log() foram executados sem que o código fosse blocado, para finalmente executar a callback function do setTimeout() após os 2 segundos estipulados. Para um próximo exercício, iremos começar a utilizar requests HTTP para trabalhar num ambiente mais realista.

## O que são requests HTTP
Durante o desenvolvimento de aplicações, é extremamente comum que surja a necessidade de obter dados de novas fontes, como servidores, bancos de dados e APIs, para obtenção destes dados, é preciso que uma **requisição HTTP** seja feita para nos conectarmos à fonte.

Uma **requisição** funciona como um tipo de "pedido", onde é solicitada a informação guardada na fonte que estamos buscando, já o **HTTP** significa *Hypertext Transfer Protocol*, que se traduz para protocolo de transferência de hipertexto, ele é o protocolo principal de comunicação entre computadores na internet.

Esta solicitação é feita para um *endpoint*, que é uma url disponibilizada pela API que armazena os dados desejados, onde então gera uma *response* com os dados que requisitamos, normalmente no formato de arquivo json.

Quando inserimos uma url no navegador, estamos fazendo um request HTTP também, porém de forma manual. Para treinarmos um pouco sobre o assunto, a api [JSONPlaceholder](https://jsonplaceholder.typicode.com/) será utilizada, realizando um request em seu próprio site. No demonstrativo, vemos que o endpoint utilizado é a url "https://jsonplaceholder.typicode.com/todos/1", que retorna um arquivo json. Se colarmos esta mesma url em nosso navegador, é possível ver que o mesmo json será retornado. 

## Fazendo requests HTTP
O primeiro passo para realizar um request HTTP é criar um objeto de request, utilizando a keyword *new* junto à função XMLHttpRequest(), função que inicialmente foi desenvolvida para trabalhar com arquivos XML, porém hoje em dia é capaz de lidar com arquivos JSON, plaintext, entre outros formatos.

```js
const request = new XMLHttpRequest()
console.log(request)
```

Ao realizarmos um console.log com o objeto criado, podemos visualizar todas as propriedades que podemos utilizar, a primeira que iremos estudar é a .open(). Dentro desta propriedade, passamos como primeiro argumento o método de request que será utilizado, como desejamos obter dados, usaremos o "GET". O segundo argumento passado, será o endpoint, que conforme o exemplo anterior, será a url do jsonplaceholder.

Já a segunda propriedade que iremos estudar é a .send(), que será a responsável por enviar ao servidor o request feito.



```js
const request = new XMLHttpRequest()

request.open('GET', 'https://jsonplaceholder.typicode.com/todos')
request.send()
console.log(request)
```

Ao rodar o script acima, podemos conferir na aba network o processo do request, onde é possível visualizar pela aba *headers* o endpoint, e pela aba *response* o que foi retornado.

Como forma de *trackear* o request, é necessário utilizar um EventListener chamado *readystatechange*, que monitora cada etapa da requisição, é possível verificar o que cada etapa significa através da [documentação](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState). A etapa 4 significa que a request foi bem sucedida, portanto, vamos fazer uma verificação simples que irá retornar no console o json recebido assim que chegarmos nesta etapa.

```js
const request = new XMLHttpRequest()

request.addEventListener('readystatechange', () => {
  if (request.readyState === 4) {
    console.log(request.responseText)
  }
})

request.open('GET', 'https://jsonplaceholder.typicode.com/todos')
request.send()
```

## Status de respostas HTTP
Apesar desta verificação simples de estados da requisição ser uma boa forma de exemplificar, ela não é o suficiente, já que mesmo se inserirmos um endpoint com uma url quebrada, o request irá cumprir as 4 etapas padrões, porém será retornado apenas um objeto vazio.

Uma forma eficiente de verificar a resposta de um request é através de seu status, que irá receber o valor 404 caso ocorra algum erro e normalmente 200 caso a requisição funcione. É possível conferir os status codes através da [documentação](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

Sabendo disso, vamos agora incrementar ao if statement a verificação de status e criar outro if verificando o ready state. Se o status e ready state estiverem ok, será retornado o json no console, caso apenas o ready state seja atendido, será retornado no console a seguinte mensagem: "Não foi possível obter os dados da API" 

```js
const request = new XMLHttpRequest()

request.addEventListener('readystatechange', () => {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText)
    return
  }

  if (request.readyState === 4) {
    console.log('Não foi possível obter os dados da API')
  }
})

request.open('GET', 'https://jsonplaceholder.typicode.com/todos')
request.send()
```

## Funções de callback
A partir do momento que temos o código do request funcionando de forma correta, vamos inseri-lo numa função para que sejá possível reutilizá-lo, e além disso, poder reagir de maneiras diferentes quando invocarmos o request através de funções de callback, não só exibindo ele no console.

```js
const getTodos = () => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      console.log(request.responseText)
      return
    }

    if (isRequestNotOK) {
      console.log('Não foi possível obter os dados da API')
    }
  })

  request.open('GET', 'https://jsonplaceholder.typicode.com/todos')
  request.send()
}

getTodos()
```
Agora que a requisição foi encapsulada numa função, podemos criar um parâmetro para ela que seja uma função de callback, dando mais liberdade de trabalhar com os dados do request.

```js
const getTodos = callback => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      callback(null, request.responseText)
      return
    }

    if (isRequestNotOK) {
      callback('Não foi possível obter os dados da API', null)
    }
  })

  request.open('GET', 'https://jsonplaceholder.typicode.com/todos')
  request.send()
}

getTodos((error, data) => {
  if (error) {
    console.log(error)
    return
  }

  console.log(data)
})
```

O que fizemos no código acima foi criar um request que executa uma callback function, esta é uma ação assíncrona e não "blockante", portanto, se executarmos um console.log() acima da invocação da função getTodos() e outro abaixo, vemos que ambos são executados antes da função retornar no console o erro ou o dado obtido.

```js
const getTodos = callback => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      callback(null, request.responseText)
      return
    }

    if (isRequestNotOK) {
      callback('Não foi possível obter os dados da API', null)
    }
  })

  request.open('GET', 'https://jsonplaceholder.typicode.com/todos')
  request.send()
}

console.log(1)
console.log(2)

getTodos((error, data) => {
  if (error) {
    console.log(error)
    return
  }

  console.log(data)
})

console.log(3)
console.log(4)
```

## Trabalhando com JSON
A sigla json é um acrônimo para JavaScript Object Notation, que é um formato de arquivo amplamente utilizado para troca de dados. Quando realizamos um request, normalmente o dado que obtemos está nesse formato.

Este formato é caracterizado por ser extremamente similar a notação de objetos do JS, porém ele **não** é um objeto, e sim uma string com notação de objeto, pois quando o browser troca informações com o servidor, é necessário que elas estejam em formato de string.

Para convertermos um arquivo json para um objeto javascript, com finalidade de acessarmos as propriedades contidas nele, para isso, precisamos invocar de um **objeto embutido** JSON a propriedade .parse(), que é responsável pela conversão.

Dentro da propriedade .parse(), passamos como argumento o arquivo json que desejamos converter, que nesse caso iremos obter por meio da propriedade .responseText() do request.

### Criando um arquivo JSON
Criar um arquivo JSON é tão simples quanto qualquer outro formato, basta apenas criarmos um arquivo e darmos a ele a extensão .json. Aqui no vscode podemos começar a editá-lo, onde abrimos um array com colchetes e colocamos dentro dele as propriedades (chamadas de chaves no json) que desejamos. É importante frisar que as chaves no json precisam sempre estar entre aspas duplas.

```json
[
  {
    "myKey": "My key value",
    "myKey2": 7
  },
  {
    "myKey": "Other value",
    "myKey2": true
  },
  {
    "myKey": "Another value",
    "myKey2": null
  }
]
```

Agora que criamos um arquivo JSON do zero, vamos obter ele da mesma forma que fizemos com o request do JSON placeholder, só que agora o arquivo será obtido localmente.

```js
const getTodos = callback => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      const data = JSON.parse(request.responseText)
      callback(null, data)
      return
    }

    if (isRequestNotOK) {
      callback('Não foi possível obter os dados da API', null)
    }
  })

  request.open('GET', './todos.json')
  request.send()
}

getTodos((error, data) => {
  if (error) {
    console.log(error)
    return
  }

  console.log(data)
})
```

## Callback Hell (Pyramid of Doom)
A situação conhecida como "Callback hell" ocorre normalmente quando precisamos puxar dados baseados no resultado de um request, onde é inicado um ciclo de aninhamento de requests no código, formando uma espécie de triângulo na identação. Para exemplificar este cenário, vamos simular a obtenção de dados de 3 endpoints diferentes, que só serão executados assim que o anterior for finalizado.

```js
const getTodos = (url, callback) => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      const data = JSON.parse(request.responseText)
      callback(null, data)
      return
    }

    if (isRequestNotOK) {
      callback('Não foi possível obter os dados da API', null)
    }
  })

  request.open('GET', url)
  request.send()
}

getTodos('./json/todos.json', (error, data) => {
  console.log(data)
  getTodos('./json/todos-02.json', (error, data) => {
    console.log(data)
    getTodos('./json/todos-03.json', (error, data) => {
      console.log(data)
    })
  })
})
```

Ao observar o final do código, podemos ver que o aninhamento de fato criou o formato triangular, o que torna o nosso código pouco legível e dificulta a manutenção.

## Introdução a promises
Uma boa maneira de evitar casos de *Callback Hell*, é a utilização de *promises*, mas afinal, o que são promises?
### Uma *Promise* é um objeto JavaScript que representa o sucesso ou a falha de uma operação **assíncrona**.

Como parâmetros do construtor da Promise, é necessário passar como argumento 2 funções, uma resolve e outra reject, quando a operação for bem sucedida resolve será executada, já quando falhar, será executada a reject.

Quando uma ação assíncrona "monitorada" pela promise é executada com sucesso, ela ira retornar no console, de forma encapsulada, seu estado. Para acessarmos isto, é necessário utilizar o método .then(), que é responsável por receber a resposta da promise.

Já quando desejamos obter os dados retornados em caso de erro da operação assíncrona, precisamos encadear no método then o método .catch(). Abaixo temos o exemplo de como funciona a criação e consumo de uma promise.

```js
const getData = () => {
  return new Promise((resolve, reject) => {
     resolve('Dados aqui')
     reject('Erro aqui')
  })
}

getData()
  .then(value => console.log(value))
  .catch(error => console.log(error))
```

Vamos agora aplicar este conceito ao request feito no exercício anterior, fazendo que seja retornado uma promise.

```js
const getTodos = url => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      const data = JSON.parse(request.responseText)
      resolve(data)
    }

    if (isRequestNotOK) {
      reject('Não foi possível obter os dados da API')
    }
  })

  request.open('GET', url)
  request.send()
})

getTodos('https://pokeapi.co/api/v2/pokemon/1')
  .then(pokemon => console.log(pokemon))
  .catch(error => console.log(error))
```

Agora que entendemos o funcionamento básico de promises, vamos voltar ao exemplo de encadeamento que nos causou um Callback Hell e resolver isto utilizando o conceito que aprendemos. Para isso, na invocação da getTodos, que será agora renomeada para getPokemons, vamos encadear os demais requests dentro do método .then(), assim sempre que a operação for bem sucedida o próximo request será executado.

```js
const getPokemon = url => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      const data = JSON.parse(request.responseText)
      resolve(data)
    }

    if (isRequestNotOK) {
      reject('Não foi possível obter os dados da API')
    }
  })

  request.open('GET', url)
  request.send()
})

getPokemon('https://pokeapi.co/api/v2/pokemon/1')
  .then(bulbasaur => {
    console.log(bulbasaur)
    return getPokemon('https://pokeapi.co/api/v2/pokemon/4')
  })
  .then(charmander => {
    console.log(charmander)
    return getPokemon('https://pokeapi.co/api/v2/pokemon/7')
  })
  .then(squirtle => console.log(squirtle))
  .catch(error => console.log(error))
```

## A fetch API
Com o conhecimento sobre requests via objeto XMLHttpRequest(), podemos começar a estudar a fetch API, uma interface moderna nativa do JavaScript que permite a realização de requests com menos linhas de código do que a forma que vimos.

Os requests via XMLHttpRequest são normalmente encontrados em códigos legado, atualmente a melhor prática é a utilização da fetch API.

A fetch API trabalha com promises por baixo dos panos, ou seja, podemos encadear diretamente nela os métodos then e catch, porém, o catch só irá ser retornado no console caso exista um problema de conexão, caso contrário, um erro como endpoint incorre retornará o objeto do response normalmente, porém com o status 404.

Para realizar requests via a fetch, é importante lembrar de 3 passos:
1. Passar como argumento o endpoint.
2. Retornar através do método .then() a response com o método .json(), que funcionará como o JSON.parse().
3. Encadear um segundo then() que é responsável por finalmente fazer algo com os dados obtidos. 

```js
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    console.log('Response', response)
    return response.json()
  })
  .then(users => console.log(users))
  .catch(error => console.log(error))
```

## Async/await
Da mesma forma que a fetch API abstrai a forma de realizar requests, a async/await também é uma forma de abstrair as promises, permitindo a escrita de um código que é lido como se fosse síncrono.

Quando realizamos requests com a fetch API, ocorre um encadeamento de .then() que pode tornar o código extremamente ilegível e dificultando a manutenção, portanto, a utilização do await torna a manipulação das promises muito mais fácil.

A palavra-chave async, utilizada na criação de uma função, a transforma numa função assíncrona que sempre retornará uma promise.

```js
const getUsers = async () => {}
//Retorna Promise {<fulfilled>: undefined}
```

Já a palavra-chave await, que só pode ser utilizada dentro de uma função async, é declarada antes da fetch, e serve para que o restante da função só seja executado quando obtiver uma resposta. 

```js
const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
}
```

Para que seja retornado o objeto obtido, existem 2 opções, fazer com que a função retorne diretamente um await com a response encadeada pelo método .json(), ou atribuir a uma nova const a response com o método .json e retornar esta const.

Já se quisermos utilizar os dados que são obtidos por esta função async, podemos encadear nela o método .then(), já que ela sempre irá retornar uma promise, ou podemos criar uma nova função que recebe a invocação da getUsers() dentro de uma const.

```js
const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()
  return users
  // Ou retornar diretamente o objeto
  // return await response.json()
}

const logUsers = async () => {
  const users = await getUsers()
  console.log(users)
}

// ou encadear diretamente o .then
getUsers()
  .then(console.log)
```

## Requests paralelos vs. Sequenciais
Da forma que aprendemos os requests via fetch, utilizando o async/await, estamos realizando requests sequenciais, algo que pode ser extremamente útil quando um request depende da resposta de outro, já que o código só é executado a partir da resposta que a promise recebe. Se quisermos fazer requests paralelos, que não dependem da resposta do anterior para serem executados, é necessário remover o await do código e usar o construtor Promise encadeado pelo método .all(),
que recebe um array de promises como argumento.

Quando as promises do array passado para o método all() forem resolvidas, ele irá retornar um array com todos os valores das promises resolvidas.

```js
const getPokemons = async () => {
  const bulbasaur = fetch('https://pokeapi.co/api/v2/pokemon/1')
  const charmander = fetch('https://pokeapi.co/api/v2/pokemon/4')
  const squirtle = fetch('https://pokeapi.co/api/v2/pokemon/7')

  const results = await Promise.all([bulbasaur, charmander, squirtle])
  console.log(results)
}

getPokemons()
```
Ao executar a função getPokemons(), será exibido no console um array com as 3 responses dos requests feitos. Se quisermos visualizar os dados de cada request feito, precisamos encadear um método forEach() no array de results, passando como argumento uma função de callback assíncrona, que retorna um console.log() com a response.json(). É necessário utilizar a palavra chave await, pois desejamos obter o valor apenas quando a promise for resolvida.

```js
const getPokemons = async () => {
  const bulbasaur = fetch('https://pokeapi.co/api/v2/pokemon/1')
  const charmander = fetch('https://pokeapi.co/api/v2/pokemon/4')
  const squirtle = fetch('https://pokeapi.co/api/v2/pokemon/7')

  const results = await Promise.all([bulbasaur, charmander, squirtle])
  results.forEach(async response => console.log(await response.json()))
}

getPokemons()
```

## Tratando erros com try/catch
As cláusulas try/catch são utilizadas em casos de erros, para ser possível manter a aplicação rodando mesmo se algo não ocorrer como esperado. Vamos exemplificar isto num cenário abaixo.

Para o exemplo, iremos executar um console.log() com uma const não definida, isto obviamente lançará um erro no console, porém como isto é um erro conhecido, podemos dar instruções para a linguagem rodar algo quando este erro ocorrer.

```js
console.log(oi)
console.log('oi')
```

Neste primeiro cenário, a aplicação irá lançar um erro no console e nada será executado abaixo disso.

```js
try {
  console.log(oi)
} catch (error) {
  if (error.name === 'ReferenceError' && error.message === 'oi is not defined') {
    const oi = 'const oi criada'
    console.log(oi)
  }
}

console.log('oi')
```

Já neste segundo cenário, o erro será lançado dentro do bloco try, onde o catch receberá o erro lançado como argumento e a partir disso podemos manipular o código.

## Try/catch em requests e erros personalizados
Para tratamento de erros em requests, vamos inserir a estrutura do try/catch dentro da função responsável pelo request.

```js
const getUsers = async () => {
  try{
    return await
      (await fetch('https://jsonplaceholder.typicode.com/users'))
      .json()
  } catch(error) {
    console.log(error.message)
  }
}

const logUsers = async () => {
  const users = await getUsers()
  console.log(users)
}

logUsers()
```

Desta forma, quando ocorrer algum erro no request, apenas a mensagem de erro será retornada, entretanto, fetch APIs só retornam um erro na promise quando existe algum problema de conexão, fazendo com que o erro aconteça apenas no parseamento do json num caso de erro de endpoint, por exemplo. Para isso, podemos realizar verificações antes do retorno para o catch, lançando um erro personalizado com a cláusula throw.

```js
const getUsers = async () => {
  try{
    const response = await fetch('./json/todoss.json')

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

    return await
      (await fetch('./json/todoss.json'))
      .json()
  } catch(error) {
    console.log(error)
  }
}

const logUsers = async () => {
  const users = await getUsers()
  console.log(users)
}

logUsers()```
