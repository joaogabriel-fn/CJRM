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

  console.log(paragraph.getAttribute('class'))  // Retorna o valor da classe do elemento ("success") 
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

* ### Obtendo, adicionando, removendo e alternando classes CSS

  Para obtermos um "lista" de classes que o elemento HTML que selecionamos, utilizamos a propriedade classList, assim é retornado um DOMTokenList com o índice de cada classe do elemento e seu nome.

  A partir do momento que acessamos a classList do elemento, podemos encadear o método .add(), onde o argumento dele será o nome da classe que desejamos adicionar

  ```js
  const paragraph = document.querySelector('p')

  paragraph.classList.add('teste')   // Será adicionado ao elemento que selecionamos a classe "teste"

  ```

  Para a remoção desta classe, encadeamos o método .remove()

  ```js
  paragraph.classList.remove('teste')
  ```

  No exemplo abaixo, vamos verificar numa série de elemento de tag <p> se eles contém o texto "error" ou "success", a partir disto, iremos adicionar classes aos elementos.

  ```js
  const paragraphs = document.querySelectorAll('p')
  const addClass = paragraph => {
      const paragraphIncludesError = paragraph.innerText.includes('error')
      const paragraphIncludesSuccess = paragraph.innerText.includes('success')

      if (paragraphIncludesError) {
          paragraph.classList.add('error')
      } else if (paragraphIncludesSuccess) {
          paragraph.classList.add('success')
      }
  }

  paragraphs.forEach(paragraph => {
      addClass(paragraph)
  })
  ```

  Para alternarmos as classes de um elemento, utilizamos a propriedade .toggle() da classList. Esta propriedade irá criar a classe passada como argumento caso o elemento não tenha a classe, mas caso o elemento já tenha, irá remove-la.


* ### Parents, children e siblings

  A relação dos elementos dentro do DOM é análoga ao de uma árvore, onde existem elementos pais que originam filhos, e estes filhos quando estão dentro da mesma hierarquia são irmãos. Por exemplo, quando temos um root node HTML que ramifica entre head e body, que originam respectivamente um title e um H1, estes elementos serão serão irmãos, mesmo com "pais" diferentes.

  Esta relação entre os elementos facilita a forma que podemos selecionar elementos dentro do DOM, utilizando por exemplo a propriedade .children, que retornará uma HTML Collection com todos os elementos filhos.

  Como uma HTML Collection não é iterável por meio de forEach(), podemos converte-lo num array através da função construtora Array.from(), assim será possível iterar pelos elementos. (Esta função não é destrutiva)

  No exemplo abaixo, iremos adicionar aos elementos filhos do article a classe "article-element" através do forEach():

  ```js
  const article = document.querySelector('article')

  console.log(article.children)               //Retorna uma HTMLCollection
  console.log(Array.from(article.children))   //Retorna o array com os elementos da HTML collection

  Array.from(article.children).forEach(element => {
  element.classList.add('article-element')
  })
  ```

  Para descobrirmos o pai de um elemento, podemos utilizar a propriedade .parentElement, onde será retornado no console o elemento HTML pai.

  Podemos também encadear outras vezes a propriedade .parentElement, afim de descobrir o "avô" do elemento.

  É possível percorrer entre os elementos irmãos através das propriedades .nextElementSibling e .previousElementSibling

  ```js
  const title = document.querySelector('h2')

  console.log(title.parentElement)        // Retorna o <article>
  console.log(title.parentElement.parentElement)  // Retorna <body>
  console.log(title.nextElementSibling)   // Retorna o primeiro <p>
  console.log(title.previousElementSibling)       // Retorna o null
  ```

* ### Eventos de clique

  Para interagirmos com ações do usuário dentro da página, precisamos de 3 passos principais.
    * 1º Passo
      Realizar uma query no DOM e obter a referência de onde irá ocorrer o evento

    * 2º Passo
      Adicionar no elemento um Event Listener

    * 3º Passo
      Implementar uma função de callback que é executada quando a ação acontecer

  Para o exemplo da aula 03-03, temos:

  ```js
  const button = document.querySelector('button') // Primeiro passo

  button.addEventListener('click')                // Segundo passo

  button.addEventListener('click', () => {
  console.log('Clicou no botão')
  })                                              // Terceiro passo
  ```

  Agora iremos adicionar Event Listeners para todas as Li's do HTML, modificando o css inline ao clicarmos num elemento da li:

  ```js
  const lis = document.querySelectorAll('li')

  lis.forEach(li => {
    li.addEventListener('click', event => {
      const clickedElement = event.target

      clickedElement.style.textDecoration = 'line-through'
    })
  })
  ```

  Neste próximo passo, iremos ver como adicionar e remover elementos do DOM.
  
  Para removermos, utilizamos o método .remove()

  ```js
  lis.forEach(li => {
    li.addEventListener('click', event => {
      const clickedElement = event.target

      clickedElement.remove()
    })
  })
  ```

  Para adicionarmos, iremos utilizar a propriedade já conhecida innerHTML

  ```js
  const button = document.querySelector('button')
  const ul = document.querySelector('ul')

  button.addEventListener('click', () => {
  ul.innerHTML += '<li>Novo item</li>'
  })
  ```

  Outra maneira de executarmos esta operação de adicionar um elemento ao DOM, é utilizando o método createElement(), onde é passado como argumento a estrutura que desejamos criar

  ```js
  button.addEventListener('click', () => {
    const li = document.createElement('li')
    console.log(li)     // Retornará <li></li> no console
  })
  ```

  A partir da criação deste novo elemento, é possível adicionar o conteúdo que desejamos através da propriedade textContent.

  ```js
  button.addEventListener('click', () => {
    const li = document.createElement('li')

    li.textContent = 'Novo Item'
    console.log(li)     // Retornará <li>Novo Item</li> no console
  })
  ```

  Desta forma, para adicionarmos este elemento criado ao DOM, possuímos diversas maneiras, como o método append() no pai do element, ou até mesmo o método prepend()

  ```js
  const ul = document.querySelector('ul')

  button.addEventListener('click', () => {
    const li = document.createElement('li')

    li.textContent = 'Novo Item'
    ul.append(li)

  // Ou

  button.addEventListener('click', () => {
    const li = document.createElement('li')

    li.textContent = 'Novo Item'
    ul.prepend(li)
  })
  ```

  O método append() adiciona o novo elemento ao pai como último filho, já o método prepend() adiciona como o primeiro filho.
 
* ### Event bubbling e event delegation

  Quando a interação com um elemento dispara uma callback function através de seu Event Listener, como por exemplo a exclusão de uma li quando for clicada, este evento é propagado para o pai deste elemento, fazendo o processo repetir para toda a herança do elemento. Este comportamento é entendido como event bubbling.

  ```js
  const lis = document.querySelectorAll('li')
  const ul = document.querySelector('ul')

  lis.forEach(li => {
    li.addEventListener('click', event => {
      const clickedElement = event.target
      console.log('Clicou na LI')
      clickedElement.remove()
    })
  })

  ul.addEventListener('click', () => {
    console.log('Clicou na Ul')
  })
  ```

  De acordo com o código acima, foi adicionado a todas Li's do DOM um event listener de click, onde irá excluir a li e exibir no console a frase "Clicou na Li" assim que receber um click, porém a Ul também possui um event listener de click, que irá exibir no console a frase "Clicou na Ul". Ao clicar na Li, a callback function do event listener da Ul também será executada devido ao event bubbling, assim será possível ver no console a frase "Clicou na Li" seguida da frase "Clicou na Ul".

  Para evitar este tipo de interação, é possível utilizar o método event.stopPropagation(), sendo assim, se este método for adicionado ao final da função de callback do event listener da Li, será exibido no console apenas a frase "Clicou na Li", pois a callback function da Ul não será executada.

  Agora que a ocorrência do event bubbling é conhecida, é possível refatorar o código do exemplo anterior para adequar o funcionamento, já que anteriormente, o event listener estava sendo adicionado para cada Li através de um forEach, prática que não é ideal, pois assim todas as novas Li's adicionadas à Ul não irão possuir o event listener. Para a refatoração, a identificação do tipo de elemento sendo clicado será feita pelo event.target, onde será possível visualizar a tagName deste elemento.

  ```js
  ul.addEventListener('click', event => {
    const clickedElement = event.target

    if (clickedElement.tagName === 'LI') {
      clickedElement.remove()
    }
  })
  ```

* ### Mais eventos do DOM 

  * #### Copy Event
    ```js
    const paragraph = document.querySelector('.copy-me')

    paragraph.addEventListener('copy', () => {
      console.log('Texto copiado')
    })
    ```

    Ao copiar um texto, será exibido no console "Texto copiado".

  * #### Mouse Move
    ```js
    const div = document.querySelector('.box')

    div.addEventListener('mousemove', event => {
      div.textContent = `X: ${event.offsetX} | Y: ${event.offsetY}`
      console.log(event.offsetX, event.offsetY)
    })
    ```

    Ao movimentar o cursor dentro da box, os eixos X e Y serão exibidos no console.

  * #### Wheel
    ```js
    document.addEventListener('wheel', event => {
      console.log(event.pageX, event.pageY)
    })
    ```

* ### Desenvolvendo um popup

  O desenvolvimento do popup está no arquivo etapa-05.js, aula-04-04.html e style.css