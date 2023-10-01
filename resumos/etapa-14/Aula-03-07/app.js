class Student {
  constructor (name, email) {
    this.name = name
    this.email = email
  }

  comment () {
    return `${this.name} comentou.`
  }
}

// function Student (name, email) {
//   this.name = name
//   this.email = email
// }

// Student.prototype.login = function () {
//   return `${this.name} fez login.`
// }

const joaoGabriel = new Student('Joao Gabriel', 'joaogabriel@gmail.com')
const giuliaBianchini = new Student('Giulia Bianchini', 'giulia@gmail.com')

console.log(joaoGabriel.comment(), giuliaBianchini.comment())
console.log(joaoGabriel.comment === giuliaBianchini.comment)
console.log(joaoGabriel, giuliaBianchini)
