const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()
  return users
  // Ou retornar diretamente o objeto
  // return await response.json()
}

// const logUsers = async () => {
//   const users = await getUsers()
//   console.log(users)

// }
console.log(1)
console.log(2)
getUsers()
  .then(console.log)
console.log(3)
console.log(4)

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => {
//     console.log('Response', response)
//     return response.json()
//   })
//   .then(users => console.log(users))
//   .catch(error => console.log(error))
