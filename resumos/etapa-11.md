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

Quando inserimos uma url no navegador, estamos fazendo um request HTTP também, porém de forma manual. Para treinarmos um pouco sobre o assunto, a api JSONPlaceholder será utilizada, realizando um request em seu próprio site. No demonstrativo, vemos que o endpoint utilizado é a url "https://jsonplaceholder.typicode.com/todos/1", que retorna um arquivo json. Se colarmos esta mesma url em nosso navegador, é possível ver que o mesmo json será retornado. 