const form = document.querySelector('.signup-form')
const usernameInput = document.querySelector('#username')


form.addEventListener('submit', event => {
  event.preventDefault()

  console.log(event.target.username.value)
})

const username = 'whyskas'
const pattern = /^[a-z]{6,}$/
const isAMatch = pattern.test(username)

if (isAMatch) {
  console.log('o teste da regex passou c:')
} else {
  console.log('o teste da regex não passou :c')
}
