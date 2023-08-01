const past = new Date(' May 1 2020 7:47:00')
const present = new Date()

const difference = present.getTime() - past.getTime()

const seconds = Math.round(difference / 1000)
console.log(seconds)

const minutes = Math.round(seconds / 60)
console.log(minutes)

const hours = Math.round(minutes / 60)
console.log(hours)

const days = Math.round(hours / 24)
console.log({ days })

const years = Math.round(days / 360)
console.log({ years })

console.log(new Date(difference).getFullYear())
