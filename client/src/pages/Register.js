import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations';

function Register() {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });

  const [addUser] = useMutation(ADD_USER, {
    variables: formInput
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutation = addUser
    const { data } = await mutation();
    let token = data.addUser.token
    localStorage.setItem('token', token);
    navigate('/')
  }

  const handleInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    });
  }


  return (
    <div>
      <h1>CREATE AN ACOUNT</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} name="email" type="email" placeholder="email"></input>
        <input onChange={handleInputChange} name="password" type="password" placeholder="password"></input>
        <button>CREATE ACCOUNT</button>
      </form>
    </div>
  )
}

export default Register;