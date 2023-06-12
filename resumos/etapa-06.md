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
