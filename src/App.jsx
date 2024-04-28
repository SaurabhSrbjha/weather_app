import "./assets/css/App.css";
import { MapPin, Search, Wind } from "react-feather";
import GetWeather from "./Api/Api";
import { useState } from "react";
// import dateFormat from 'dateformat';

function App() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState({});

  const GetWeatherByCity = async () => {
    const weatherRes = await GetWeather(city);
    setWeather(weatherRes);
    setCity("");
  };
 
  const kelvinToCelsius = (tempInKelvin) => {
    return (tempInKelvin - 273.15).toFixed(2); // Rounded to 2 decimal places
  };
 
  return (
    <>
      <div className="app">
        <h1>Weather</h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
          />
          <button onClick={() => GetWeatherByCity()}>
            <Search></Search>
          </button>
        </div>

        {weather && weather.weather && (
          <div className="content">
            <div className="location d-flex">
              <MapPin></MapPin>
              <h2>
                {weather.name} <span>({weather.sys.country})</span>
              </h2>
            </div>
            {/* <p className="datetext">{renderDate()}</p> */}

            <div className="weatherdesc d-flex flex-c">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
              <h3>{weather.weather[0].description}</h3>
            </div>

            <div className="tempstats d-flex flex-c">
              <h1>
              {kelvinToCelsius(weather.main.temp)} <span>&deg;C</span>
              </h1>
              <h3>
                Feels Like {kelvinToCelsius(weather.main.feels_like)} <span>&deg;C</span>
              </h3>
            </div>

            <div className="windstats d-flex">
              <Wind></Wind>
              <h3>
                Wind is {weather.wind.speed} m/s, Knots in {weather.wind.deg}&deg;
              </h3>
            </div>
          </div>
        )}

        {!weather.weather && (
          <div className="content">
            <h4>No Data Found !!</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
