/*
Este exercício será um pouquinho diferente dos anteriores.

Seu desafio é desenvolver uma versão do quiz que:

- Aborda um tema diferente (não pode ser de filmes);
- Tem um tema de cores diferente do que foi apresentado na aula;
- Exibe na tela a pontuação que o usuário fez. Não há certo ou errado, apenas faça. Essa exibição de pontos é uma das implementações que faremos na próxima aula =D

Independente se você já fez o quiz dos filmes enquanto acompanhava a aula, busque fazer esse exercício sem rever partes da aula.

É importante que a sua versão do quiz seja feita apenas com o conteúdo que vimos até aqui.
*/

const form = document.querySelector('.quiz-form')
const button = document.querySelector('.btn')
const finalResult = document.querySelector('.result')

const quizAnswers = ['B', 'B', 'A', 'B']


button.addEventListener('click', event => {
  event.preventDefault()
  
  const userAnswers = [
    form.inputQuestion1.value,
    form.inputQuestion2.value,
    form.inputQuestion3.value,
    form.inputQuestion4.value
  ]

  const score = userAnswers.reduce((acc, answer, index) => {
    if (answer === quizAnswers[index]) {
      return acc += 25
    }

    return acc
  }, 0)

  const scrollTimer = setInterval(() => {
    if (scrollY > 0) {
      scrollTo(0, scrollY - 20)
      return
    }

    clearInterval(scrollTimer)
  }, 1)

  finalResult.classList.remove('d-none')


  let counter = 0
  const scoreTimer = setInterval(() => {
    if (score === counter) {
      clearInterval(scoreTimer)
    }

    finalResult.querySelector('span').textContent = `${counter}%`
    counter++
  }, 20)

})
