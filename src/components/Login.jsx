import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import {useHistory} from 'react-router-dom';

export default function Login() {
  // const history = useHistory();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/user/login",
        {
          email,
          password,
        }
      );
      console.log("User Logged In");
      if(response.data.status === "Successfull")
      {
        navigate('/home'); 
      }// Uncomment this line if you have set up navigation
      else{
        alert("Incorrect Username or Password")
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
    
      <div className="background">
        <img id="login_img" src="login.jpeg" alt="Login" />
      </div>
      <form onSubmit={handleSubmit} className="form_cred">
        <h3>Login Here</h3>

        <label className="label_cred" htmlFor="email">
          Email
        </label>
        <input
          className="input_cred"
          type="text"
          placeholder="Email or Phone"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <label className="label_cred" htmlFor="password">
          Password
        </label>
        <input
          className="input_cred"
          type="password"
          placeholder="****"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="button_cred">
          Log In User
        </button>
        <Link to="/signup">
          <button type="button" className="button_cred">
            Don't Have an Account? Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
}
