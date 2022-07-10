// STARTING VARIABLES
var m = moment()
var APIKey = 'd9d0ad9620511c5bd3f33272690f52d7';
// SETS DATE
currentDate = moment().format('dddd, MMMM Do YYYY')
currentDatePEl = document.getElementById('currentDate')
currentDatePEl.innerText = currentDate
// FETCH WEATHER ON CLICK
var currentWeatherBtnEl = document.getElementById('currentWeatherBtn')
currentWeatherBtnEl.addEventListener('click', currentWeather)
// CURRENT WEATHER IN YOUR CITY
function currentWeather(event) {
    event.preventDefault()
    var currentWeatherInputEl = document.getElementById('currentWeatherInput')
    var city = currentWeatherInputEl.value
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`
    // GATHER WEATHER DATA
    fetch(queryURL).then(function(resObject) {
        return resObject.json()
    }).then(function (data) {
        // GATHER LAT & LON FOR SUBSEQUENT FUNCTION
        var lat = data.coord.lat
        var lon = data.coord.lon
        // WRITE WEATHER DATA TO PAGE
        console.log(data)
        var cityName = city
        var cityNameH2El = document.getElementById('cityName')
        cityNameH2El.innerText = cityName

        var cityTemp = data.main.temp
        var cityTempPEl = document.getElementById('cityTemp')
        cityTempPEl.innerText = `TEMPERATURE: ${cityTemp}`

        var cityHumidity = data.main.humidity
        var cityHumidityPEl = document.getElementById('cityHumidity')
        cityHumidityPEl.innerText = `HUMIDITY: ${cityHumidity}`

        var cityWindSpeed = data.wind.speed
        var cityWindSpeedPEl = document.getElementById('cityWindSpeed')
        cityWindSpeedPEl.innerText = `WINDSPEED: ${cityWindSpeed}`
        // GET FIVE DAY FORECAST
        fiveDayForecast()
        function fiveDayForecast() {
            var queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
            fetch(queryURL).then(function(resObject) {
                return resObject.json()
            }).then(function (data) {
                console.log(data.list[0])
                // WRITE FIVE DAY FORECAST TO PAGE
                    fiveDayForecastEl = document.getElementById('fiveDayForecast')
                    FDFHeadLine = document.createElement('h2')
                    FDFHeadLine.innerText = 'YOUR FIVE DAY FORECAST'
                    fiveDayForecastEl.appendChild(FDFHeadLine)

                for (i=1; i<6; i++) {
                    // DAYS
                    DayH3El = document.createElement('h3')
                    DayH3El.innerText = moment().add(i, 'days').format('dddd')
                    // TEMPS
                    var FDFTemp = data.list[i].main.temp
                    FDFTempPEl = document.createElement('p')
                    FDFTempPEl.innerText = FDFTemp
                    // HUMIDITY
                    var FDFHumidity = data.list[i].main.humidity
                    FDFHumidityPEl = document.createElement('p')
                    FDFHumidityPEl.innerText = FDFHumidity
                    // WIND SPEED
                    var FDFWindSpeed = data.list[i].wind.speed
                    FDFWindSpeedPEl = document.createElement('p')
                    FDFWindSpeedPEl.innerText = FDFWindSpeed
                    // PARENT DIVS
                    fiveDayForecastDivEl = document.getElementById('fiveDayForecast')
                    FDFDayDivEl = document.createElement('div')
                    FDFDayDivEl.setAttribute('class', 'weatherbox')
                    // APPENDS, FORECAST WRITTEN
                    fiveDayForecastDivEl.appendChild(FDFDayDivEl)
                    FDFDayDivEl.appendChild(DayH3El)
                    FDFDayDivEl.appendChild(FDFTempPEl)
                    FDFDayDivEl.appendChild(FDFHumidityPEl)
                    FDFDayDivEl.appendChild(FDFWindSpeedPEl)
                    fiveDayForecastDivEl.appendChild(FDFDayDivEl)
                }
            })
        }
    })
}

console.log(moment().add(2, 'days').format('dddd'))