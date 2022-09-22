import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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
    <form className="login-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      <div className="login-query">Log in or sign up</div>
      <div className="login-welcome">Welcome to Cranebnb</div>

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
      Log In
      </button>

      <div className="or">or</div>
      <div></div>
    </form>
  );
}

export default LoginForm;
