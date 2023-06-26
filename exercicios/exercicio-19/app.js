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
const quizAnswers = ['B', 'B', 'A', 'B']

let score = 0

const getUserAnswers = () => {
  const userAnswers = quizAnswers.map((_, index) => {
    return form[`inputQuestion${i + 1}.value`]
  })

  return userAnswers
}

const checkUserAnswers = (userAnswer, index) => {
  if (userAnswer === quizAnswers[index]) {
    score += 25
  }
}

const finalResult = () => {
  const feedbackText = {
    success: `Parabéns! Você acertou ${score}% do teste`,
    fail: `Que pena :( Você acertou ${score}% do teste`,
    }
  
  return feedbackText
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

  getUserAnswers()

  userAnswers.forEach(checkUserAnswers)

  const feedbackText = finalResult()

  if (score > 50) {
    createAndInsertFeedback('success', feedbackText.success)
    return
  }
  
  createAndInsertFeedback('danger', feedbackText.fail)
}

form.addEventListener('submit', handleFormSubmit)
