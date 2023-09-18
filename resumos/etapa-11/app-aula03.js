const getTodos = callback => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      const data = JSON.parse(request.responseText)
      callback(null, data)
      return
    }

    if (isRequestNotOK) {
      callback('Não foi possível obter os dados da API', null)
    }
  })

  request.open('GET', './json/todos.json')
  request.send()
}

getTodos((error, data) => {
  if (error) {
    console.log(error)
    return
  }

  console.log(data)
})
