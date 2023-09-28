class User {
  constructor (name, email) {
    this.name = name
    this.email = email
  }
}

const user = new User('João', 'joao@gmail.com')
const user2 = new User('Giulia', 'giulia@gmail.com')

console.log(user, user2)
