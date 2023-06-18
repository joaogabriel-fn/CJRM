/*
Este exercício será um pouquinho diferente dos anteriores.

Seu desafio é desenvolver uma versão do quiz que:

- Aborda um tema diferente (não pode ser de filmes);
- Tem um tema de cores diferente do que foi apresentado na aula;
- Exibe na tela a pontuação que o usuário fez. Não há certo ou errado, apenas faça. Essa exibição de pontos é uma das implementações que faremos na próxima aula =D

Independente se você já fez o quiz dos filmes enquanto acompanhava a aula, busque fazer esse exercício sem rever partes da aula.

É importante que a sua versão do quiz seja feita apenas com o conteúdo que vimos até aqui.
*/

const body = document.body
const form = document.querySelector('.quiz-form')
const button = document.querySelector('.btn')

let score = 0
let feedbackText = ''

const quizAnswers = ['B', 'B', 'A', 'B']

const checkUserAnswers = (userAnswer, index) => {
  if (userAnswer === quizAnswers[index]) {
    score += 25
  }
}

const createAndInsertFeedback = (status, feedbackText) => {
  const formFeedback = document.createElement('h1')

  body.innerHTML = ''
  body.classList.add(`bg-${status}`, 'text-center')
  formFeedback.classList.add('p-4')
  formFeedback.textContent = feedbackText
  body.appendChild(formFeedback)
}

const handleFormSubmit = event => {
  event.preventDefault()

  const userAnswers = [
    form.inputQuestion1.value,
    form.inputQuestion2.value,
    form.inputQuestion3.value,
    form.inputQuestion4.value,
  ]

  userAnswers.forEach(checkUserAnswers)

  if (score > 50) {
    feedbackText = `Parabéns! Você acertou ${score}% do teste`
    createAndInsertFeedback('success', feedbackText)
    return
  }
  
  feedbackText = `Que pena :( Você acertou ${score}% do teste`  
  createAndInsertFeedback('danger', feedbackText)
}

form.addEventListener('submit', handleFormSubmit)
