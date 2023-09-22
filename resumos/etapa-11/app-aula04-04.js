const getPokemon = url => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest()

  request.addEventListener('readystatechange', () => {
    const isRequestOK = request.readyState === 4 && request.status === 200
    const isRequestNotOK = request.readyState === 4
    
    if (isRequestOK) {
      const data = JSON.parse(request.responseText)
      resolve(data)
    }

    if (isRequestNotOK) {
      reject('Não foi possível obter os dados da API')
    }
  })

  request.open('GET', url)
  request.send()
})

getPokemon('https://pokeapi.co/api/v2/pokemon/1')
  .then(bulbasaur => {
    console.log(bulbasaur)
    return getPokemon('https://pokeapi.co/api/v2/pokemon/4')
  })
  .then(charmander => {
    console.log(charmander)
    return getPokemon('https://pokeapi.co/api/v2/pokemon/7')
  })
  .then(squirtle => console.log(squirtle))
  .catch(error => console.log(error))