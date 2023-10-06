class User {
  #counter = 0

  constructor (name, email) {
    this.name = name
    this.email = email
  }

  incrementCounter () {
    return ++this.#counter
  }
}

const createUser = (name, email) => { 
  let counter = 0
  
  return {
    name, 
    email,
    incrementCounter: () => ++counter
  }
}

const user = new User('Joao', 'joao@gmail.com')
const user2 = createUser('Joao', 'joao@gmail.com')
const user3 = createUser('Joao2', 'joao2@gmail.com')

console.log(user, user2)
console.log(user.incrementCounter())  // 1
console.log(user.incrementCounter())  // 2
console.log(user2.incrementCounter()) // 1
console.log(user2.incrementCounter()) // 2
console.log(user3.incrementCounter()) // 1
console.log(user3.incrementCounter()) // 2
