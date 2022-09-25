import React from 'react'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations';
import { NavLink } from 'react-router-dom';

const LogInForm = (props) => {
  const [formInput, setFormInput] = useState({
    email: '',
    password: ''
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: formInput
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    let user, token;
    const mutation = loginUser
    const { data } = await mutation();
    user = data.loginUser.user;
    token = data.loginUser.token;
    localStorage.setItem('token', token);
    props.setUser(user)
  }

  const handleInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container twocolumns">
        <form className="container onecolumn" onSubmit={handleSubmit}>
            <input name="email" type="email" value={formInput.email} placeholder="email" onChange={handleInputChange}></input>
            <input name="password" type="password" value={formInput.password} placeholder="password" onChange={handleInputChange}></input>
            <button className="textleft">LOG IN</button>
        </form>
        <div>
          <NavLink to="/register">CREATE ACCOUNT</NavLink>
        </div>
        
    </div>
  )
}

export default LogInForm