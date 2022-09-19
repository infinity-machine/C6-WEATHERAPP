import React from 'react'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { useStore } from '../store';
import { LOGIN_USER } from '../utils/mutations';
import { NavLink } from 'react-router-dom';
// call login user AWAIT const res = loginuser
// e

// const RES = await loginuser

const LogInForm = (props) => {
  // const { state: { user }, setState } = useStore();
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
    <div>
      {/* {user ? <h1>{user.username}</h1> : <></>} */}
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" value={formInput.email} placeholder="email" onChange={handleInputChange}></input>
            <input name="password" type="password" value={formInput.password} placeholder="password" onChange={handleInputChange}></input>
            <button>LOG IN</button>
        </form>
        <NavLink to="/register">CREATE ACCOUNT</NavLink>
    </div>
  )
}

export default LogInForm