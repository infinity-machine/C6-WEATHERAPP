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
        <div>
            {weatherData ? weatherData.map((data, index) => {
                return <div key={index} className="centertext">
                    <div>
                        <p>{moment().add(index, 'days').format('dddd, MMMM Do')}</p>
                        <p>TEMPERATURE - MIN: {data.temp.min} MAX: {data.temp.max}</p>
                        <p>HUMIDITY: {data.humidity}</p>
                        <p>WINDSPEED: {data.wind_speed}</p>
                        <p>UV INDEX: {data.uvi}</p>
                    </div>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="daily weather conditions"></img>
                </div>
            }) : <></>}
        </div>
    )
}

export default Forecast7Day