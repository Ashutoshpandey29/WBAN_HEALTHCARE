import React, { useState } from "react";
import axios from "axios";
import "../css/cred.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // State variables for the form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "http://127.0.0.1:4000/api/user/signup";

    try {
      console.log({Signup: username, email, password});
      console.log("inside frontend")
      const response = await axios.post(apiUrl, {
        username,
        email,
        password,
      });
      console.log(response.data)
      console.log("User Signed In !!");
      navigate("/home");
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div className="background">
        <img id="sign_img" src="signup.jpeg" alt="Sign Up" />
      </div>
      <form onSubmit={handleSubmit} className="form_cred form_cred_s">
        {/* <h3 id="signuphere">SignUp Here</h3> */}
        <label className="label_cred mod_lbl" htmlFor="username">
          Username
        </label>
        <input
          className="input_cred mod_inp"
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label_cred mod_lbl" htmlFor="email">
          Email
        </label>
        <input
          className="input_cred mod_inp"
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label_cred mod_lbl" htmlFor="password">
          Password
        </label>
        <input
          className="input_cred mod_inp"
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="button_cred">
          Sign Up
        </button>
        <Link to="/login">
          <button type="button" className="button_cred">
            Have An Account? Log In
          </button>
        </Link>
      </form>
    </div>
  );
}
