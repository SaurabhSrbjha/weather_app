const ApiKey = "ae1bf916dc890c0b56d61011352c71af"
const GetWeather = async (City) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${ApiKey}`)
    .then( (res) => res.json())
    .then((json) => {
        return json
    })
}

export default GetWeather