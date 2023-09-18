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

