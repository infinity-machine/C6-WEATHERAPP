import moment from 'moment'
import React from 'react'
import { useState, useEffect } from 'react'

const ForecastHourly = (props) => {
  const [weatherData, setWeatherData] = useState([])
  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${props.apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.hourly)
            setWeatherData(data.hourly);
        });
}


useEffect(fetchWeather, [props.lat, props.lon]);
  return (
    <div id="weatherbox" className="margincenter scroll">
    {weatherData ? weatherData.slice(1, 24).map((data, index) => {
        return <div key={index} className="centertext">
            <div>
                {moment().add(index + 1, 'h').format('LT')}
                <p>{data.temp}&#176;F</p>
                <p>humidity: {data.humidity}%</p>
                <p>windspeed: {data.wind_speed} mph</p>
                <p>uv index: {data.uvi}</p>
            </div>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="daily weather conditions"></img>
        </div>
    }) : <></>}
</div>
  )
}

export default ForecastHourly