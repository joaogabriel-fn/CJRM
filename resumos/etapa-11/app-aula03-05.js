const getTodos = (url, callback) => {
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

  request.open('GET', url)
  request.send()
}

getTodos('./json/todos.json', (error, data) => {
  console.log(data)
  getTodos('./json/todos-02.json', (error, data) => {
    console.log(data)
    getTodos('./json/todos-03.json', (error, data) => {
      console.log(data)
    })
  })
})



