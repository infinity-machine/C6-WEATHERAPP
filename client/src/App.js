import { useEffect, useState } from 'react';
import { isAuthenticated } from './utils/auth';
import LogInForm from './components/LogInForm';
import ForecastNow from './components/ForecastNow';
import Forecast7Day from './components/Forecast7Day';
import './index.css';


function App() {
  const [locInput, setLocInput] = useState('')
  const [citySelect, setCitySelect] = useState('')
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [user, setUser] = useState('')
  const [apiKey] = useState('d9d0ad9620511c5bd3f33272690f52d7')

  const fetchCoords = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        setCitySelect(city);
      });
  }

  useEffect(() => {
    const userdata = isAuthenticated()
    if (userdata) setUser(userdata)
  }, [])

  const handleInputChange = (e) => {
    setLocInput(e.target.value)
  }
  const handleLocSubmit = (e) => {
    e.preventDefault(e.target);
    setCitySelect(e.target[0].value)
    fetchCoords(e.target[0].value)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }

  return (
    <div className="container twocolumns">
      {
        user ?
          <div className="header tworows">
            <h2>{user.email}</h2>
            <button onClick={handleLogout}>LOGOUT</button>
          </div> :
          <LogInForm setUser={setUser} />
      }
      <div>
        <h1 id="headline">WEATHERBOT</h1>
        <form onSubmit={handleLocSubmit}>
          <input onChange={handleInputChange} value={locInput} type="text" placeholder="LOCATION"></input>
          <button>GET WEATHER DATA</button>
        </form>
      </div>
      <div>
      </div>
      {
        citySelect ?
          <ForecastNow city={citySelect} lat={lat} lon={lon} apiKey={apiKey} /> :
          <p>.....</p>}
      {
        citySelect ?
          <Forecast7Day city={citySelect} lat={lat} lon={lon} apiKey={apiKey} /> :
          <></>}
    </div>
  );
}

export default App;
