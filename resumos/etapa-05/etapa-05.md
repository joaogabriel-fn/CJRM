# **CJRM** | Etapa 05 - O Document Object Model - DOM

## O que são os 3 escopos em JavaScript

Escopo pode ser definido como **visibilidade** de uma variável, ou seja, onde ela está visível para seu código

* ### Escopo de funções
Variáveis declaradas dentro de uma função

```js
function myFunc () {
  let cat = 'marcelo'
  const age = '1'
  var color = 'black and white'
}

console.log(cat)      // Retorna que a variável não está definida
console.log(age)      // Retorna que a variável não está definida
console.log(color)    // Retorna que a variável não está definida
```

* ### Escopo de blocos
Funciona da mesma forma que escopos de funções

* ### Escopo de léxico
São escopos dentro de blocos/funções aninhadas.

```js
const external = () => {
  const greet = 'Olá'

  const internal () => {
    const message = `${greet}. Tudo bem?`

    console.log(message)
  }

  internal()
}
```

Conforme o exemplo acima, podemos referenciar a variável greet (definida na função external) dentro da função internal, pois são blocos que estão aninhados.

As variáveis de escopo léxico possuem 1 característica princiapal, que é buscar sua definição num escopo acima, nunca o contrário, então sempre será um comportamento de dentro para fora. Se uma variável for declarada num escopo interno, não poderá ser utilizada no escopo externo, mas o contrário irá funcionar.

## Interagindo com o Browser/DOM

O DOM é criado automaticamente pelo navegador, e é através dele que podemos interagir com a página. Assim que o html é executado pelo browser, é criado um objeto **document**, que irá modelar o html

```js
document    // Irá retornar algo como o html da página
```

* ### Query Selector

A consulta de um elemento no DOM é nomeada de **query**

Podemos selecionar os elementos do html de diversas formas, porém sempre utilizando os mesmos seletores do css, como por exemplo:

```js
const paragraph = document.querySelector('p')
const paragraphClass = document.querySelector('.error')
const h1 = document.querySelector('body > h1')

console.log(paragraph)
console.log(paragraphClass)
console.log(h1)
```

É possível copiar o seletor de um elemento direto do DevTools, ao clicar com o botao direito e marcar "copy selector"

* ### Query Selector All

É utilizado para selecionar todas as ocorrencias do elemento selecionado, e não apenas a primeira, como no querySelector.

```js
const paragraphs = document.querySelectorAll('p')

console.log(paragraphs)     // Retornará uma node list com todos os paragrafos selecionados 
```

Node list é uma lista de nós similar a um array, entretanto, não é possível utilizar todos os métodos de arrays num node list. Um dos métodos que podemos utilizar é a notação de colchetes com o índice para acessarmos um elemento específico.

```js
const paragraphs = document.querySelectorAll('p')

console.log(paragraphs[0])     // Retornará o parágrafo de índice 0, ou seja, "Hello World" 
```

Pode também ser iterado pelo método forEach:

```js
const paragraphs = document.querySelectorAll('p')

paragraphs.forEach(paragraph => {
  console.log(paragraph)
})
```

* ### Outras maneiras de realizar queries no DOM

  * #### Utilizando ID
    É possível acessar um elemento utilizando o método getElementById(), onde é passado como argumento para o método o id do elemento que consta no html.

    ```js
    const title = document.getElementById('title')
    console.log(title)
    ```

  * #### Utilizando classe
    Para acessarmos um elemento por meio de sua classe, utilizamos o método getElementsByClassName()

    ```js
    const errors = document.getElementsByClassName('error')
    console.log(title)
    ```

    Este método irá retornar um HTMLCollection com os elementos idenfitifcados no html por esta classe. O HTMLCollection é como uma lista genérica de itens, similar ao node list retornado pelo querySelectorAll(). **Não é possível inserir um forEach junto ao HTMLCollection.**

  * #### Utilizando tags
    Outra forma de acessar elementos do html pelo js é utilizando o método getElementsByTagName(), assim podemos utilizar as tagNames como identificadores dos elementos.

    ```js
    const paragraphs = document.getElementsByTagName('p')

    console.log(paragraphs)
    ```

    O exemplo acima irá retornar uma HTMLCollection com todos os elementos identificados com a tag <p>

* ### Adicionando e modificando conteúdo de uma página

  * #### Utilizando innerText

    O primeiro passo para aplicar uma modificação no html de uma página via JavaScript é selecionar o elemento, para isso, é necessário utilizar algum dos métodos apresentados anteriormente.

    Para adicionar um texto, é possível encadear o método **innerText**, este método serve para acessar o texto contido no html selecionado.

    ```js
    const paragraph = document.querySelector('p')

    console.log(paragraph.innerText)        // Retornará o texto contido no html selecionado

    paragraph.innerText = 'Texto inserido'  // Irá atribuir "Texto inserido" ao conteúdo do html selecionado

    /*
    Tamém é possível concatenar o texto desejado ao texto já existente no html, utilizando o addition assignament
    */

    paragraph.innerText += ' Texto inserido novamente'
    ```

    Para modificarmos mais de um elemento do HTML, podendo utilizado o método querySelectorAll, assim teremos uma node list onde será possível encadear o método forEach, como no exemplo abaixo:

    ```js
    const paragraphs = document.querySelectorAll('p')

    paragraphs.forEach(paragraph => {
      console.log(paragraph.innerText)
    })
    ```
    No exemplo acima, ao executarmos o código iremos observar no console o conteúdo de todas as tags P no nosso documento HTML.

    Já no exemplo abaixo, iremos modificar o conteúdo de todos os elementos de tag P para o texto 'Olá' junto ao índice do elemento no node list.

    ```js
    const paragraphs = document.querySelectorAll('p')

    paragraphs.forEach((paragraph, index) => {
      paragraph.innerText = `Olá, ${index}`
    })
    ```
  * #### Utilizando innerHTML

    Para modificarmos o HTML de um elemento dentro do documento, podemos utilizar o método innerHTML encadeado ao elemento selecionado.

    ```js
    const div = document.querySelector('.content')

    console.log(div.innerHTML)        // Retornará no console o HTML do elemento selecionado
    ```

    Para executarmos a modificação, utilizamos a mesma lógica do innerText, porém informando também as novas tags HTML, como por exemplo:

    ```js
    div.innerHTML = '<h2>Novo h2</h2>'
    ```

    Caso já exista dentro alguma tag dentro da div que selecionamos, então o método irá apenas sobrescrever a tag já existente, caso não exista, iremos criar a nova tag dentro da div.

    Utilizando o addition assignament, o comportamento vai ser de adicionar a nova tag dentro da div que selecionamos.

* ### Obtendo e setando atributos (getter e setter)

  * #### Método getAttribute
    Podemos encadear num elemento selecionado o método getAttribute(), onde irá ser retornado o valor do elemento que passarmos como argumento
    
    ```js
    const link = documento.querySelector('a')

    console.log(link.getAttribute('href'))    // Irá retornar o link contido no href do elemento
    ```  

  * #### Método setAttribute
    O método setAttribute serve como ferramenta para inserirmos um atributo ao elemento que selecionamos, como no exemplo abaixo, onde será inserido um link para o href da tag <a>
    ```js
    const link = document.querySelector('a')

    link.setAttribute('href', 'https://twitter.com/joojgabrieI')
    ```

  Podemos modificar diversos atributos do elemento com estes métodos, como por exemplo a classe:

  ```js
  const paragraph = document.querySelector('p') // Seleciona o elemento

  console.log(paragraph.getAttribute('class'))  // Retorna o valor da classe do elemento ("error")

  paragraph.setAttribute('class', 'success')    // Altera o valor da classe para "success"

  console.log(paragraph.getAttribute('class'))  // Retorna o valor da classe do elemento ("success) 
  ```

  É possível também adicionar atributos novos ao elemento selecionado, não apenas modificar atributos já existentes.

  ```js
  paragraph.setAttribute('style', 'color: green') // Irá adicionar ao elemento um estilo css inline, alterando a cor do elemento selecionado e mantendo os atributos já existentes.
  ```

* ### Modificando estilos CSS (inline)
  
  Quando utilizamos o método setAttribute() para adicionar estilos css no elemento, ele sobrescreve os atributos que já existiam anteriormente, ou seja, se tivessemos um h1 com definido com a cor azul e quisessemos adicionar uma borda de 50px, a cor azul seria sobrescrita.

  ```js
  const title = document.querySelector('h1')    // Seleciona o elemento de tag H1

  console.log(title)                            // Exibe o elemento selecionado

  title.setAttribute('style', 'margin: 50px')   // Altera seu atributo em styles para a margin, removendo o color já existente
  ```

  Para contornar esta situação, podemos utilizar a propriedade style
  
  ```js
  console.log(title.style)      // Retorna no console um objeto style com todas as propriedades css que podem ser utilizadas neste elemento
  ```

  Esta propriedade é utilizada para obter, adicionar e remover estilos do elemento desejado.

  ```js
  console.log(title.style.color)  // Retorna o valor que a propriedade color deste elemento possui
  ```

  Para adicionarmos um estilo utilizando esta propriedade, fazemos o seguinte procedimento:

  ```js
  title.style.margin = '50px'
  ```

  Desta forma, o estilo que preexistente não será sobrescrito.

  Para remover uma propriedade, é necessário atribuir um valor vazio para ela.

  ```js
  title.style.margin = ''
  ```