function Student (name, email) {
  this.name = name
  this.email = email

  this.login = function () {
    return `${this.name} fez login.`
  }
}

const joaoGabriel = new Student('Joao Gabriel', 'joaogabriel@gmail.com')
const giuliaBianchini = new Student('Giulia Bianchini', 'giu')

// console.log(joaoGabriel.login(), giuliaBianchini.login())
console.log([''])