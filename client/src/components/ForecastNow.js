import React from 'react';
import { useState, useEffect } from 'react';

const apiKey = 'd9d0ad9620511c5bd3f33272690f52d7';

const ForecastNow = (props) => {

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        // setCityName(props.city);
        console.log(data)
        setCityTemp(data.current.temp);
        setFeelsLike(data.current.feels_like);
        setCityHumid(data.current.humidity);
        setCityWind(data.current.wind_speed);
        setCityUvi(data.current.uvi);
        setCityIcon(`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);
      });
  };

  // const [cityName, setCityName] = useState('');
  const [cityTemp, setCityTemp] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [cityHumid, setCityHumid] = useState('');
  const [cityWind, setCityWind] = useState('');
  const [cityUVI, setCityUvi] = useState('');
  const [cityIcon, setCityIcon] = useState('')

  useEffect(fetchWeather, [props.lat, props.lon]);

  return (
    <div>
      <div>
        <h2>{props.city}</h2>
        <p>TEMPERATURE: {cityTemp}</p>
        <p>FEELS LIKE: {feelsLike}</p>
        <p>HUMIDITY: {cityHumid}</p>
        <p>WINDSPEED: {cityWind}</p>
        <p>UV INDEX: {cityUVI}</p>
      </div>
      <img src={cityIcon} alt=""></img>
    </div>
  )
}

export default ForecastNow