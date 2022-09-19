import React from 'react';
import { useState, useEffect } from 'react';

const Forecast7Day = (props) => {
    const [weatherData, setWeatherData] = useState([])

    const renderData = (data) => {
        // for (let i = 1; i < 8; i++) {
        //     return `
        //     <div>{${data[i].temp}}<div>`
        // }
    }
    const fetchWeather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lon}&units=imperial&appid=${props.apiKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.daily)
                setWeatherData(data.daily);
            });
    }

    useEffect(fetchWeather, [props.lat, props.lon]);
    return (
        <div id="div">
            {weatherData ? renderData(weatherData) : <></>}
        </div>
    )
}

export default Forecast7Day