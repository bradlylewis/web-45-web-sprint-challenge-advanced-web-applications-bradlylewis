import React, { useState } from "react";

const Login = () => {
  const [ formValues, setFormValues ] = useState({ username: '', password: '' })
  const [error, setError] = useState('');
  
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };
  
  const submitHandler = e => {
    e.preventDefault();
    if (formValues.username !== 'Lambda' || formValues.password !== 'School') {
      setError('Username or Password incorrect')
    }
    
    axiosWithAuth()
    .post('/api/login', formValues)
    .then((res) => {
      console.log("AXIOS POST", res)
        localStorage.setItem('token', res.data.payload)
        push('/bubblepage')
      })
      .catch((err) => {
        console.log({ err })
      })
    }
    
    return (
      <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
      </div>

      <p id="error" className="error">{error}</p>

      <form onSubmit={submitHandler}>

          <label htmlFor="username">
            Username
          </label><br/>
          <input
            id="username"
            name="username"
            value={formValues.username}
            data-testid="username"
            onChange={handleChange}
            /><br/><br/>

          <label htmlFor="password">
            Password
          </label><br/>
          <input
            id="password"
            name="password"
            value={formValues.password}
            data-testid="password"
            onChange={handleChange}
          /><br/>

          <button id="submit">Login</button>

        </form>

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