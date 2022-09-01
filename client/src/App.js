import { useState } from 'react'
import LogInForm from './components/LogInForm'
import ForecastNow from './components/ForecastNow'
import Forecast7Day from './components/Forecast7Day'
const apiKey = 'd9d0ad9620511c5bd3f33272690f52d7'

function App() {
 
  const fetchCoords = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          setLat(data.coord.lat);
          setLon(data.coord.lon);
          setCitySelect(city);
        })
  }
  
  const [locInput, setLocInput] = useState('')
  const [citySelect, setCitySelect] = useState('')
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

 
  const handleInputChange = (e) => {
    setLocInput(e.target.value)
  }
  const handleLocSubmit = (e) => {
    e.preventDefault(e.target);
    setCitySelect(e.target[0].value)
    fetchCoords(e.target[0].value)
  }

  return (
    <div className="App">
      <LogInForm />
      <h1>WEATHERBOI</h1>
      <form onSubmit={handleLocSubmit}>
        <input onChange={handleInputChange} value={locInput} type="text" placeholder="LOCATION"></input>
        <button>GET WEATHER DATA</button>
      </form>
      {citySelect ? <ForecastNow city = {citySelect} lat={lat} lon={lon}/> : <p>please make a selection</p>}
      {citySelect ? <Forecast7Day city = {citySelect} lat={lat} lon={lon}/> : <></>}
    </div>
  );
}

export default App;
