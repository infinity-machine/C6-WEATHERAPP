import { useEffect, useState } from 'react';
import { isAuthenticated } from './utils/auth';
import Header from './components/Header'
import ForecastNow from './components/ForecastNow';
import Forecast7Day from './components/Forecast7Day';
import './index.css';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';


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
        setLocInput('')
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

  return (
    <div className="container">
      <Header user={user} setUser={setUser} />
      {
        citySelect ? (
          <div className="container">
            <div className="margincenter centertext">
              <form onSubmit={handleLocSubmit}>
                <input onChange={handleInputChange} value={locInput} type="text" placeholder="LOCATION"></input>
                <Button>GET WEATHER DATA</Button>
              </form>
            </div>
            {
              citySelect ?
                <ForecastNow city={citySelect} lat={lat} lon={lon} apiKey={apiKey} /> :
                <p>.....</p>
            }
            {
              citySelect ?
                <Forecast7Day city={citySelect} lat={lat} lon={lon} apiKey={apiKey} /> :
                <></>
            }
          </div>
        ) : (
          <div className="centertext">
            <h1 id="headline">WEATHERBOT</h1>
            <div id="icon">
            </div>
            <div className="margincenter centertext">
              <form onSubmit={handleLocSubmit}>
                <input onChange={handleInputChange} value={locInput} type="text" placeholder="LOCATION"></input>
                <Button>GET WEATHER DATA</Button>
              </form>
            </div>
          </div>
        )
      }
      <div class="footer centertext">
        {user ? <></> : <NavLink to="/register">CREATE ACCOUNT</NavLink>}
      </div>
    </div>
  );
}

export default App;
