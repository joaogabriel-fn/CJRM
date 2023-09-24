const getUsers = async () => {
  try{
    const response = await fetch('./json/todos.json')

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

    return await
      (await fetch('./json/todos.json'))
      .json()
  } catch(error) {
    console.log(error)
  }
}

const logUsers = async () => {
  const users = await getUsers()
  console.log(users)
}

logUsers()
