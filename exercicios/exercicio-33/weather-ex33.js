const APIKey = 'pya5bs16TfWlaf54611xjynKRwVLFNLK'
const getCityUrl = (cityName) => 
  `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`


const getRequest = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

    const [data] = await response.json()
    return data
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}

const getCityData = async (cityName) => {
  const cityUrl = getCityUrl(cityName)
  return getRequest(cityUrl)
}

const getCityWeather = async (cityName) => {
  const { Key } = await getCityData(cityName)
  const cityWeatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`
  return getRequest(cityWeatherUrl)
}

getCityWeather('São Paulo')
  .then(response => console.log(response))
