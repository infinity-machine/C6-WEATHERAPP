import { useEffect, useState } from 'react';
import { isAuthenticated } from './utils/auth';
import Header from './components/Header'
import ForecastNow from './components/ForecastNow';
import Forecast7Day from './components/Forecast7Day';
import ForecastHourly from './components/ForecastHourly';
import './index.css';
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
          <div className="containercentertext">
            <div className="margincenter">
              <form onSubmit={handleLocSubmit}>
                <input onChange={handleInputChange} value={locInput} type="text" placeholder="LOCATION"></input>
                <button>GET WEATHER DATA</button>
              </form>
            </div>
            {
              citySelect ?
                <ForecastNow city={citySelect} lat={lat} lon={lon} apiKey={apiKey} /> :
                <p>.....</p>
            }
            {
              citySelect ?
                <div className="centertext">
                  <h1>HOURLY</h1>
                  <ForecastHourly city={citySelect} lat={lat} lon={lon} apiKey={apiKey} />
                </div> 
                :
                <></>
            }
            {
              citySelect ?
                <div className="centertext">
                  <h1>Daily</h1>
                  <Forecast7Day city={citySelect} lat={lat} lon={lon} apiKey={apiKey} />
                </div> :
                <></>
            }
          </div>
        ) : (
          <div className="centertext">
            <h1 id="headline">WEATHERBOT</h1>
            <img id="icon" src="assets/clouds.png" alt="pretty cloud"></img>
            <div className="margincenter centertext">
              <form onSubmit={handleLocSubmit}>
                <input onChange={handleInputChange} value={locInput} type="text" placeholder="LOCATION"></input>
                <button>GET WEATHER DATA</button>
              </form>
            </div>
          </div>
        )
      }
      <div className="footer centertext">
        {user ? <></> : <NavLink to="/register">CREATE ACCOUNT</NavLink>}
      </div>
    </div>
  );
}

export default App;
