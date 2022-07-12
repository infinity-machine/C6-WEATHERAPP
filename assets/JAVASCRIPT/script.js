// STARTING VARIABLES
var m = moment()
var APIKey = 'd9d0ad9620511c5bd3f33272690f52d7';
// SETS DATE
currentDate = moment().format('dddd, MMMM Do YYYY');
currentDatePEl = document.getElementById('currentDate');
currentDatePEl.innerText = currentDate;
// FETCH WEATHER ON CLICK
var currentWeatherBtnEl = document.getElementById('currentWeatherBtn');
currentWeatherBtnEl.addEventListener('click', currentWeather);
// CURRENT WEATHER IN YOUR CITY
function currentWeather(event) {
    event.preventDefault();
    var currentWeatherInputEl = document.getElementById('currentWeatherInput');
    var city = currentWeatherInputEl.value;
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    // FETCH CITY LAT & LON FOR SUBSEQUENT FETCHES
    fetch(queryURL).then(function (resObject) {
        return resObject.json();
    }).then(function (data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var cityName = city;
        // FETCH WEATHER DATA
        var query2URL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
        fetch(query2URL).then(function (resObject) {
            return resObject.json();
        }).then(function (data) {
            console.log(data)
            // WRITE WEATHER DATA TO PAGE
            // CITY
            var cityNameH2El = document.getElementById('cityName');
            cityNameH2El.innerText = cityName;
            // TEMP
            var cityTemp = data.current.temp;
            document.getElementById('cityTemp').innerText = `TEMPERATURE: ${cityTemp}`;
            // HUMIDITY
            var cityHumidity = data.current.humidity;
            document.getElementById('cityHumidity').innerText = `HUMIDITY: ${cityHumidity}`;
            // WINDSPEED
            var cityWindSpeed = data.current.wind_speed;
            document.getElementById('cityWindSpeed').innerText = `WINDSPEED: ${cityWindSpeed}`;
            // UVI
            var cityUVI = data.current.uvi;
            document.getElementById('cityUVI').innerText = `UV INDEX: ${cityUVI}`;
            // ICON
            var icon = data.current.weather[0].icon;
            var alt = data.current.weather[0].description;
            var iconImg = document.getElementById('iconImg');
            iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
            iconImg.setAttribute('alt', `${alt}`)
            // GET FIVE DAY FORECAST
            fiveDayForecast(lat, lon, city);
        });
    });
}
function fiveDayForecast(lat, lon, city) {
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    fetch(queryURL).then(function (resObject) {
        return resObject.json();
    }).then(function (data) {
        console.log(data);
        // WRITE FIVE DAY FORECAST TO PAGE
        var FDFHeadLine = document.getElementById('FDFHeadLine');
        FDFHeadLine.innerText = `${city} FIVE DAY FORECAST`;
        for (i = 1; i < 6; i++) {
            // DAYS
            document.querySelector(`.FDFDay-${i}`).innerText = moment().add(i, 'days').format('dddd');
            // TEMPS
            var FDFTemp = data.list[i].main.temp;
            document.querySelector(`.FDFTemp-${i}`).innerText = `TEMPERATURE: ${FDFTemp}`;
            // HUMIDITY
            var FDFHumidity = data.list[i].main.humidity;
            document.querySelector(`.FDFHumidity-${i}`).innerText = `HUMIDITY: ${FDFHumidity}`;
            // WINDSPEED
            var FDFWindSpeed = data.list[i].wind.speed;
            document.querySelector(`.FDFWindSpeed-${i}`).innerText = `WINDSPEED: ${FDFWindSpeed}`;
            // ICONS
            var icon = data.list[i].weather[0].icon;
            var alt = data.list[i].weather[0].description;
            var FDFIcon = document.querySelector(`.FDFIcon-${i}`);
            FDFIcon.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
            FDFIcon.setAttribute('alt', `${alt}`);
        }
    })
}