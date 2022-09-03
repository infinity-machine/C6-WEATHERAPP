import React from 'react'
import { useState, useMutation } from 'react';
import { useStore } from '../store';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
// call login user AWAIT const res = loginuser
// e

// const RES = await loginuser

const LogInForm = () => {
  const { state: { user }, setUser } = useStore();
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
    let mutation = loginUser;
    const { data } = await loginUser();
    user = data.user;
    token = data.token;
    localStorage.setItem('token', token);
    setUser(user)

  }



  

  return (
    <div>
      <h1>{user.username}</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" value={formInput.email} placeholder="email"></input>
            <input type="password" value={formInput.password} placeholder="password"></input>
            <button>LOG IN</button>
        </form>
    </div>
  )
}

export default LogInForm