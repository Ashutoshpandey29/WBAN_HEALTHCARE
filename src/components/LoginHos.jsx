import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

let finaldata = 1;

export default function LoginHos() {
  const navigate = useNavigate()
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Replace 'http://your-api-url.com/login' with your actual API endpoint
    const apiUrl = "http://127.0.0.1:4000/api/mspauth/login";

    try {

      const response = await axios.post(apiUrl, {
        username,
        password,
      });

      // Handle the response here, e.g., storing tokens, navigating to another page, etc.
      console.log("Login successful:", response.data);

      if (response.data.status === "Successfull") {
        finaldata = response.data;
        console.log({finaldata : finaldata})
        navigate('/msp');
      }// Uncomment this line if you have set up navigation
      else {
        alert("Incorrect Username or Password")
      }
    } catch (error) {
      // Handle errors here, such as showing an error message to the user
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div className="background">
        <img id="login_img" src="login.jpeg" alt="Health Care Login" />
      </div>
      <form className="form_cred" onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label className="label_cred" htmlFor="username">
          Username
        </label>
        <input
          className="input_cred"
          type="text"
          placeholder="Enter your ID"
          id="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
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
          Log In to Hospital
        </button>
        <Link to="/signupHos">
          <button type="button" className="button_cred">
            Don't Have an Account? Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
}


export function getData(){
  return finaldata;
}