import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });

  // const HOST = 'http://localhost:5000'

  const onChangeHandler = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
  }

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: loginCredentials.email,
        password: loginCredentials.password
      })
    })

    const json = await response.json()
    console.log(json.success)

    if (json.success === true) {
      console.log(json.jwt_token)
      localStorage.setItem('token',json.jwt_token)
      navigate('/')
    }
    else {
      console.log(json.success)
      alert('wrong credentials')
    }
  }

  return <div>
    <div className='=my-5 h3'>Login to create Notes on Cloud...</div>
    <form onSubmit={loginSubmitHandler}>
      <div className="mb-3 mt-5">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email"
          className="form-control"
          id="email"
          name='email'
          value={loginCredentials.email}
          onChange={onChangeHandler}
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password"
          className="form-control"
          id="password"
          name='password'
          value={loginCredentials.password}
          onChange={onChangeHandler}
        />
      </div>

      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  </div>;
};

export default Login;
