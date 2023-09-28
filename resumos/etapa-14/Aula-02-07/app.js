class User {
  constructor (name, email) {
    this.name = name
    this.email = email
    this.points = 0
  }

  login () {
    console.log(`${this.name} logou na aplicação.`)
    return this
  }

  logout () {
    return `${this.name} deslogou da aplicação.`
  }

  addPoint () {
    this.points++
    return `${this.name} agora tem ${this.points > 1 ? 'pontos' : 'ponto'}`
  }
}

const user = new User('João', 'joao@gmail.com')
const user2 = new User('Giulia', 'giulia@gmail.com')

user.login().addPoint()

console.log(user, user2)
