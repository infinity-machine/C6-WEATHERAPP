import React from 'react';
import { useState, useEffect } from 'react';

const ForecastNow = (props) => {
  const [weatherData, setWeatherData] = useState([]);
  // FIX THIS!!!!
  const [iconURL, setIconURL] = useState('')

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${props.apiKey}`)
      .then(res => res.json())
      .then(data => {
        setWeatherData(data.current)
        setIconURL(`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
      });
  };

  useEffect(fetchWeather, [props.lat, props.lon]);

  return (
    <div>
      {weatherData ? (
        <div>
          <div>
            <h2>{props.city}</h2>
            <p>TEMPERATURE: {weatherData.temp}</p>
            <p>FEELS LIKE: {weatherData.feels_like}</p>
            <p>HUMIDITY: {weatherData.humidity}</p>
            <p>WINDSPEED: {weatherData.wind_speed}</p>
            <p>UV INDEX: {weatherData.uvi}</p>
          </div>
          <img src={iconURL} alt="current weather conditions"></img>
        </div>
      ) : <p>LOADING...</p>}
    </div>
  )
}

export default ForecastNow