import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';

const Forecast7Day = (props) => {
    const [weatherData, setWeatherData] = useState([])
    const fetchWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${props.apiKey}`)
            .then(res => res.json())
            .then(data => {
                setWeatherData(data.daily);
            });
    }

    useEffect(fetchWeather, [props.lat, props.lon]);
    return (
        <div id="weatherbox" className="margincenter scroll">
            {weatherData ? weatherData.slice(1).map((data, index) => {
                return <div key={index} className="centertext">
                    <div>
                        <p>{moment().add(index + 1, 'days').format('dddd, MMMM Do')}</p>
                        <p>min: {data.temp.min}&#176;F max: {data.temp.max}&#176;F</p>
                        <p>humidity: {data.humidity}</p>
                        <p>windspeed: {data.wind_speed}</p>
                        <p>uv index: {data.uvi}</p>
                    </div>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="daily weather conditions"></img>
                </div>
            }) : <></>}
        </div>
    )
}

export default Forecast7Day