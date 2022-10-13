import React from 'react';
import { useState, useEffect } from 'react';

const ForecastNow = (props) => {
  const [weatherData, setWeatherData] = useState({});
  const [iconURL, setIconURL] = useState('')

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${props.apiKey}`)
      .then(res => res.json())
      .then(data => {
        setWeatherData({
          feels_like: data.current.feels_like,
          humidity: data.current.humidity,
          wind_speed: data.current.wind_speed,
          uvi: data.current.uvi,
        })
        setIconURL(`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
      });
  };

  const saveLocation = (e) => {
    e.preventDefault();
    console.log('hi')
  }

  useEffect(fetchWeather, [props.lat, props.lon]);

  return (
    <div id="weatherbox" className="centertext margincenter">
      {weatherData ? (
        <div>
          <div>
            <h2>{props.city}</h2>
            <form onSubmit={saveLocation}>
              <button>SAVE LOCATION</button>
            </form>
            <p>{weatherData.temp}&#176;F - feels like {weatherData.feels_like}&#176;F</p>
            <p>humidity: {weatherData.humidity}%</p>
            <p>windspeed: {weatherData.wind_speed}</p>
            <p>uv index: {weatherData.uvi}</p>
          </div>
          <img src={iconURL} alt="current weather conditions"></img>
        </div>
      ) : <p>LOADING...</p>}
    </div>
  )
}

export default ForecastNow