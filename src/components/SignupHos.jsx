import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/cred.css";

let finaldata = 1;

export default function SignupHos() {
  // const history = useHistory();
  const navigate = useNavigate()
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const apiUrl = "http://127.0.0.1:4000/api/mspauth/signup"; // Replace with your actual API endpoint

    try {
      const response = await axios.post(apiUrl, {
        username,
        email,
        password,
        phone,
        address,
        x,
        y,
        z
      });
      
      console.log("Signup successful:", response.data);
      if(response.data.status === "Successfull")
      {
        finaldata = response.data;
        console.log({finaldata : finaldata})
        alert("Signup Successful")
        navigate('/msp');
      }
     
    } catch (error) {
      alert("Signup Unsuccessful")
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="cont">
      <div className="background">
        <img id="sign_img" src="signup.jpeg" alt="Health Care Signup" />
      </div>
      <div className="formHospital">
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
            onChange={(e) => setusername(e.target.value)}
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

          <label className="label_cred mod_lbl" htmlFor="phone">
            Phone
          </label>
          <input
            className="input_cred mod_inp"
            type="number"
            placeholder="Phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className="label_cred mod_lbl" htmlFor="address">
            Address
          </label>
          <input
            className="input_cred mod_inp"
            type="text"
            placeholder="Address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="coordinates">
            <label className="label_cred mod_lbl" htmlFor="X">
              X
            </label>
            <input
              className="input_cred mod_inp"
              type="number"
              placeholder="X"
              id="x"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
            <label className="label_cred mod_lbl" htmlFor="X">
              Y
            </label>
            <input
              className="input_cred mod_inp"
              type="number"
              placeholder="Y"
              id="y"
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
            <label className="label_cred mod_lbl" htmlFor="X">
              Z
            </label>
            <input
              className="input_cred mod_inp"
              type="number"
              placeholder="Z"
              id="z"
              value={z}
              onChange={(e) => setZ(e.target.value)}
            />
          </div>


          <button type="submit" className="button_cred">
            Sign Up
          </button>
          <Link to="/loginHos">
            <button type="button" className="button_cred">
              Have An Account? Log In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export function getData(){
  return finaldata;
}
