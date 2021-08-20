import axios from "axios";
import React, {useState} from "react";
import { useHistory } from "react-router";

const Login = () => {
  
  const [credentials, setCredentials] = useState({
      username: "",
      password: ""
  })
  const [error, setError] = useState("");
  const baseUrl = "http://localhost:5000/api";
  const {push} = useHistory();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
     })
  }


  const login = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/login`, credentials)
      .then(res =>{
        localStorage.setItem("token", res.data.payload);
        push("/bubbles");
    })
    .catch(error => {
      setError("Please validate username and password");
      console.log(error);
    })
  }
  
  return (
    <div>
        <h1>Welcome to the Bubble App!</h1>
        <div data-testid="loginForm" className="login-form">
          <h2>Log in to pick your color</h2>
        </div>
  
        <p id="error" className="error">{error}</p>

        <form onSubmit={login}>
          <input
            id = "username"
            type = "text"
            name = "username"
            value = {credentials.username}
            onChange = {handleChange}
            placeholder = {"username"}
            />
          <input
            id = "password"
            type ="password"
            name ="password"
            value ={credentials.password}
            onChange ={handleChange}
            placeholder = {"password"}
            />
          <button id = "submit">Login</button>
        </form>
      </div>
    );
  }

  
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