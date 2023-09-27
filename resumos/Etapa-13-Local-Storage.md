# **CJRM** | Etapa 13 - Local Storage

## Introdução ao localStorage
O localStorage é um mecanismo interno da API storage que salva dados no próprio browser, através de pares de chave e valor. Ele não é a única forma de salvar dados numa aplicação, já que podemos armazenar os dados da aplicação num banco, ou até mesmo num mecanismo também da API storage chamado sessionStorage.

A principai diferenças entre o localStorage e o sessionStorage, é que o primeiro é capaz de armazenar os dados mesmo se o usuário fechar o browser ou a aba de navegação, já o sessionStorage, armazena os dados enquanto o usuário estiver com o browser/aba de navegação abertos.

Alguns dos mecanismos utilizados são os seguintes:

1. Cookies: eram amplamente utilizados no passado para o armazenamento de dados na web, entretanto, cairam em desuso, apesar de ainda serem utilizados.
2. WEB Storage API: é um dos principais mecanismos utilizados, principalmente para armazenar tipos de dados mais simples, como strings, numbers, username, etc.
3. IndexedDB API: também é um dos principais mecanismos utilizados atualmente, porém sua principal função é armazenar dados mais complexos e de tamanhos mais extensos, como fotos, vídeos, etc.
4. Cache API: é usada para armazenar dados que possibilitam o funcionamento da aplicação offline.

Por enquanto, iremos abordar apenas o WEB Storage API.

## Armazenando e obtendo dados
A localStorage é um objeto do tipo *Storage*, que quando invocado no console, retorna uma interface da WEB Storage API. Uma interface é um objeto que proporciona a ligação do código ao WEB Storage API. Nesta interface, podemos ver todas as propriedades e métodos que podemos encadear.

Analisando a interface, vemos que diversos métodos são referentes a itens, como getItem, setItem, removeItem, etc. Mas afinal, o que é um item? Um item é um par de chave e valor que é armazenado na localStorage, similar a um objeto javascript.

Para armazenarmos um item na localStorage, é utilizado o método setItem(), que possui a sintaxe de ('chave', 'valor'). Caso seja passado um numéro como argumento, por exemplo, no parâmetro de valor, por baixo dos panos o javascript irá realizar a conversão para string.

```js
localStorage.setItem('name', 'João')
localStorage.setItem('age', 23)
```

Agora se visualizarmos novamente a localStorage no console, veremos que a interface Storage armazena os itens que acabamos de inserir. Podemos visualizar também esses itens inseridos pela aba application no DevTools.

Para obtermos os dados dos itens e poder utiliza-los na aplicação, usamoso o método getItem(), que recebe como argumento o nome da chave que desejamos obter o valor.

```js
const name = localStorage.getItem('name')
const age = localStorage.getItem('age')

console.log(name, age) // Retornará no console o valor dos itens que buscamos no localStorage
```

Agora se comentarmos no código as linhas que estão inserindo no localStorage os itens e executarmos, veremos no console que ainda são exibidos os valores que inserimos, pois agora eles estão armazenados na memória do navegador.

Para modificarmos os itens da localStorage, basta reatribuir utilizando o método setItem().

```js
const name = localStorage.setItem('name', 'Giulia')
const age = localStorage.setItem('age', 20)
```

## Removendo dados
Para remoção dos dados, podemos ou remover um item específico, ou remover todos os itens. Para remover um item específico, utilizamos o método removeItem('chave'), já para remover todos os itens armazenados, utilizamos o método .clear()

## Stringficando e parseando dados
Dados mais complexos como arrays de objetos também podem ser armazenados na localStorage, entretanto, devemos lembrar que os valores do item devem sempre ser uma string. Sendo assim, devemos primeiro converter o array que devemos armazenar, utilizando o método stringfy() do objeto global JSON, que recebe como argumento um objeto ou um array, que também é um objeto.

```js
const myArray = [
  {a: 1, b: 2},
  {c: 3, d: 4},
  {e: 5, d: 4}
]

localStorage.setItem('myArray', JSON.stringify(myArray))
```

Ao executarmos o código acima, vemos que agora a chave "myArray" que armazena o array criado convertido em JSON.

Agora para obtermos este array armazenado na memória, precisamos parsear ele para JSON novamente. 

```js
const myArray = [
  {a: 1, b: 2},
  {c: 3, d: 4},
  {e: 5, d: 4}
]

localStorage.setItem('myArray', JSON.stringify(myArray))

const JSONFromLocalStorage = localStorage.getItem('myArray')
const myConvertedArray = JSON.parse(JSONFromLocalStorage)

console.log(myConvertedArray)
```

Executando o bloco acima, veremos o array de objetos que criamos inicialmente, mas agora obtido através do localStorage.