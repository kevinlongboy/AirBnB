import React, { useState } from "react";
import { NavLink , Link  } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div>
    <form className="login-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
          ))}
      </ul>

      {/* <div className="login-banner">
        <div className="fa-regular fa-x"></div>
      </div> */}

      <div className="login-query">Log in or sign up</div>
      <div className="login-welcome" style={{textAlign:"left"}}>Welcome to Cranebnb</div>

      <div>
        <label>
          <input
            className="username-field"
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        </label>
      </div>

      <div>
        <label>
          <input
            className="password-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
      </div>

      <div className="disclaimer">
        We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
        <a href="https://www.airbnb.com/help/article/2855/airbnb-privacy" style={{fontWeight:"bolder"}}>Privacy Policy</a>
      </div>

      <button
        className="login-button"
        type="submit"
        >
      Continue
      </button>

      <div className="or">or</div>


      <NavLink to={"/signup"}>
      <button
        className="signup-button"
        type="submit"
        >
        Continue to Sign Up
      </button>
      </NavLink>

      <button
        className="signup-button"
        type="submit"
        >
        Continue as Demo User
      </button>

    </form>
    </div>
  );
}

export default LoginForm;
