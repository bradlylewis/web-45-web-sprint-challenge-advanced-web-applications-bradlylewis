import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { push } = useHistory();
  const urlBase = 'http://localhost:5000/api'


  // Handlers
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${urlBase}/login`, credentials)
      .then(res => {
        console.log(res.data.payload);
        localStorage.setItem('token', res.data.payload)
        push('/protected')
    })
      .catch(error => {
        console.log(error)
    })

    if (credentials.username === "" || credentials.password === '') {
      setError('Username and password are required.') 
    } else if (credentials.username !== 'Lambda' || credentials.password !== 'School'){
      setError('Incorrect username or password.')
    }
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>L O G I N</h2>
        <form onSubmit={handleSubmit}>
          <input id='username' name='username' placeholder= 'username' type='text' onChange={handleChange} value={credentials.username} />
          <br />
          <br />
          <input id='password' name='password' placeholder= 'password' type='password' onChange={handleChange} value={credentials.password} />
          <br />
           <button>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route
//replace with error state
//1. Build a form containing a username and password field. DONE
//2. Add whatever state necessary for form functioning. DONE
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid. DONE
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route. DONE
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password" DONE
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit" DONE
//8. MAKE SURE YOUR ERROR p tag contains the id="error" DONE