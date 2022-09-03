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
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    // FETCH CITY LAT & LON FOR SUBSEQUENT FETCHY BOIS
    fetch(queryURL).then(function (resObject) {
        return resObject.json();
    }).then(function (data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        // FETCH WEATHER DATA
        var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
        fetch(queryURL).then(function (resObject) {
            return resObject.json();
        }).then(function (data) {
            console.log(data)
            // WRITE WEATHER DATA TO PAGE
            // CITY & SAVE BTN
            document.getElementById('cityName').innerText = city;
            document.getElementById('saveLocation').innerText = 'SAVE LOCATION';
            // TEMP
            var cityTemp = data.current.temp;
            document.getElementById('cityTemp').innerText = `TEMPERATURE: ${cityTemp}`;
            // FEELS LIKE
            var feelsLike = data.current.feels_like;
            document.getElementById('feelsLike').innerText = `FEELS LIKE: ${feelsLike}`
            // HUMIDITY
            var cityHumidity = data.current.humidity;
            document.getElementById('cityHumidity').innerText = `HUMIDITY: ${cityHumidity}`;
            // WINDSPEED
            var cityWindSpeed = data.current.wind_speed;
            document.getElementById('cityWindSpeed').innerText = `WINDSPEED: ${cityWindSpeed}`;
            // UVI
            var cityUVI = data.current.uvi;
            var cityUVIEl = document.getElementById('cityUVI')
            cityUVIEl.innerText = `UV INDEX: ${cityUVI}`;
            if (cityUVI < 3) cityUVIEl.style.color = 'green';
            if (cityUVI >= 3 && cityUVI < 5.5) cityUVIEl.style.color = 'yellow';
            if (cityUVI >= 5.5 && cityUVI < 7) cityUVIEl.style.color = 'orange';
            if (cityUVI >= 8) cityUVIEl.style.color = 'red';
            // ICON
            var icon = data.current.weather[0].icon;
            var alt = data.current.weather[0].description;
            var iconImg = document.getElementById('iconImg');
            iconImg.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
            iconImg.setAttribute('alt', `${alt}`)
            // SAVE LOCATION
            // var saveLocationBtn = document.getElementById('saveLocation');
            // saveLocationBtn.addEventListener('click', saveLocation);
            //     function saveLocation() {
            //         }
            //     }
            // GET FIVE DAY FORECAST
            fiveDayForecast(lat, lon, city);
        });
    });
}

// FIVE DAY FORECAST
function fiveDayForecast(lat, lon, city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    fetch(queryURL).then(function (resObject) {
        return resObject.json();
    }).then(function (data) {
        // WRITE FIVE DAY FORECAST TO PAGE
        var FDFHeadLine = document.getElementById('FDFHeadLine');
        FDFHeadLine.innerText = `${city} FIVE DAY FORECAST`;
        for (i = 1; i < 6; i++) {
            // DAYS
            document.querySelector(`.FDFDay-${i}`).innerText = moment().add(i, 'days').format('dddd');
            document.querySelector(`.FDFDay-1`).innerText = 'Tommorrow'
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
            FDFIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
            FDFIcon.setAttribute('alt', `${alt}`);
        }
    })
}

