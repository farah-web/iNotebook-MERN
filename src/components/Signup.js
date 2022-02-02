import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'



const Signup = () => {
  const navigate = useNavigate();
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value })
  }
  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: signupCredentials.name,
        email: signupCredentials.email,
        password: signupCredentials.password,
      })
    })

    const json = await response.json();
    console.log(json.success, " TOKEN:  ", json.jwt_token)
    if (json.success == true) {
      localStorage.setItem('token', json.jwt_token)
      navigate('/')
    }
    else {
      alert('user already exist')
    }
  }

  return <div>
    <div className='=my-5 h3'>Signup to use iNoteBook...</div>
    <form onSubmit={signupSubmitHandler}>
      <div className="mb-3 mt-5">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input type="name"
          className="form-control"
          id="name"
          name='name'
          value={signupCredentials.name}
          onChange={onChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email"
          className="form-control"
          id="email"
          name='email'
          value={signupCredentials.email}
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
          value={signupCredentials.password}
          onChange={onChangeHandler}
        />
      </div>

      <button type="submit" className="btn btn-primary">Signup</button>
    </form>
  </div>;
};

export default Signup;
