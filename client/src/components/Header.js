import React from 'react'
import LogInForm from './LogInForm';

const Header = (props) => {

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }

  return (
    <div className="margincenter">
      {
        props.user ?
          <div>
            <h2>{props.user.email}</h2>
            <button onClick={handleLogout}>LOGOUT</button>
          </div> :
          <LogInForm setUser={props.setUser} />
      }
    </div>
  )
}

export default Header