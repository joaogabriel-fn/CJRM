function Student (name, email) {
  this.name = name
  this.email = email
}

Student.prototype.login = function login () {
  return `${this.name} fez login.`
}

Student.prototype.comment = function comment () {
  return `${this.name} comentou.`
}

function TeacherAssistant (name, email, scheduledWeekPosts) {
  Student.call(this, name, email)
  this.scheduledWeekPosts = scheduledWeekPosts
}

TeacherAssistant.prototype = Object.create(Student.prototype)

TeacherAssistant.prototype.giveBadge = function giveBadge ({ name }) {
  return `${this.name} deu uma medalha para ${name}`
}

const giulia = new Student('Giulia', 'giulia@gmail.com')
const joaoAssistant = 
  new TeacherAssistant('Joao', 'joaoAssistant@gmail.com', false)

console.log(giulia, joaoAssistant)
console.log(joaoAssistant.giveBadge(giulia))
