# **CJRM** | Etapa 06 - Eventos em formulários

## Eventos em formulários

Os formulários são formas de capturarmos os dados que desejamos obter do usuário a partir de eventos, como o 'submit'.

* ### O evento submit
  
  Quando o form é utilizado, o event listener que será responsável pelo envio deverá ser atrelado ao form, não ao botão que fará o envio.

  ```js
  const form = document.querySelector('.signup-form')
  const usernameInput = document.querySelector('#username')


  form.addEventListener('submit', event => {
    event.preventDefault()

    console.log(usernameInput.value)
    console.log(form.username.value)
    console.log(event.target.username.value)
  })
  ```

  Como forma de obter a informação do input, utilizamos a propriedade .value, no exemplo acima é exibido 3 formas diferentes de chegar até ela.

## Expressões regulares

Quando formulários são criados com a expectativa de receber informações que o usuário preencha, é esperado que ele esteja padronizado de acordo com o tipo de informação que é desejado receber. Como por exemplo, um nome de usuário que não contenha mais de 10 caracteres, endereço de email inválido, etc.

Para realizar essa padronização, ou melhor, este "match" de informações, as expressões regulares são utilizadas, também conhecidas como Regex. O primeiro passo para utilização da Regex é definir o que irá delimitar o preenchimento de informações do usuário, a partir disso, iremos utilizar o site regex101 para gerar a expressão.

Como exemplo, será feita a verificação do username declarado, onde ele deve conter letras minúsculas e possuir 6 ou mais caracteres.

```js
const username = 'whyskas'
const pattern = /^[a-z]{6,}$/
const isAMatch = pattern.test(username)

if (isAMatch) {
  console.log('o teste da regex passou c:')
} else {
  console.log('o teste da regex não passou :c')
}
```

Além do método .test(), que retorna um boolean, podemos também utilizar o método .search(), onde o valor retornado será -1 caso o padrão não seja encontrado, e se o valor for encontrado será retornado o index onde ele se inicia.

```js
const username = '123whyskas'
const pattern = /^[a-z]{6,}$/
const result = username.search(pattern)

console.log(result) // Irá retornar 3, que é o índice onde o padrão se inicia.

```

## Validações de formulários

Como forma de validar o formulário desenvolvido nas aulas anteriores, será desenvolvido um código utilizando a Regex.

```js
const form = document.querySelector('.signup-form')
const feedback = document.querySelector('.feedback')


form.addEventListener('submit', event => {
  event.preventDefault()

  const username = event.target.username.value
  const usernameRegex = /^[a-zA-Z]{6,12}$/
  const isValidUsername = usernameRegex.test(username)

  if (isValidUsername) {
    feedback.textContent = 'Username Válido!'
    return    
  }

  feedback.textContent = 'O username deve conter entre 6 a 12 caracteres e deve conter apenas letras'
})
```

O resultado esperado para o exercício é que seja exibido a mensagem para o usuário se o login é válido ou não, para isso foi inserido uma tag <p> com a classe feedback dentro do <form>. O próximo passo do exercício será atualizar o código para que a mensagem de validação seja atualizada em tempo real.

## Eventos do teclado

Como base para o exercício, foi utilizado como consulta a página de client-side verification da MDN.

* ### Evento keyup

  O evento 'keyup' serve para identificarmos o momento em que uma tecla é parada de pressionar. Sendo assim, será adicionado ao campo de input um Event Listener com este evento, onde a função de callback irá adicionar ao elemento HTML a classe .success ou .error, de acordo com a validação da Regex:

  ```js
  const testUsername = username => /^[a-zA-Z]{6,12}$/.test(username)


  form.username.addEventListener('keyup', event => {
    const isAValidUsername = testUsername(event.target.value)

    if (isAValidUsername) {
      form.username.setAttribute('class', 'success')
      return
    }

    form.username.setAttribute('class', 'error')
  })
  ```
