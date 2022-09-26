import React, { useState, useEffect } from "react";
import { NavLink , Link, useHistory  } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import SignupFormPage from "./SignupFormPage";
import '../../context/Modal.css'
import './LoginFormModal.css';


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {

    const errors = [];

    if (!credential) {
      errors.push("Please enter your username or email")
    } else if (credential.length < 5) {
      errors.push("Please enter your username or email")
    }
    if (!password) {
      errors.push("Please enter your password")
    } else if (password.length < 5) {
      errors.push("Please enter your username or email")
    }

    setValidationErrors(errors)
  }, [credential, password])



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    // create custom error handlers

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const history = useHistory();

  const handleSubmitDemoUser = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'demo@email.com', password: 'demo' }))
    // history.push('/');
  };



  return (
    <div>

      <form className="login-form">

        <div className="modal-subtitle">Log in or sign up</div>
        <div className="login-welcome" style={{textAlign:"left"}}>Welcome to Cranebnb</div>

        <div>
          <label>
            <input
              className="half-field-top"
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
              className="half-field-bottom"
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
          className="submit-button"
          id="login-button"
          type="submit"
          disabled={!!validationErrors.length}
          onSubmit={handleSubmit}
          >
        Continue
        </button>

        <div className="or">or</div>

        <button
          className="continue-button"
          onClick={() => setShowModal(true)}
          >
          Continue to Sign Up
        </button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <SignupFormPage />
            </Modal>
            )}

        <button
          className="continue-button"
          type="button"
          // onClick={handleSubmitRedirect}
          >
          <a style={{textDecoration:"none", color:"black"}} href="https://www.linkedin.com/in/kevinlongboy/">
          Continue with LinkedIn
          </a>
        </button>

        <button
          className="continue-button"
          type="button"
          // onClick={handleSubmitRedirect}
          >
          <a style={{textDecoration:"none", color:"black"}} href="https://github.com/kevinlongboy">
          Continue with GitHub
          </a>
        </button>

        <button
          className="continue-button"
          type="submit"
          onClick={handleSubmitDemoUser}
          >
          Continue as Demo User
        </button>

        <div className="errors">
          {errors.map((error, idx) => (
            <p className="error-item" key={idx}>{error}</p>
            ))}
          {validationErrors.map((validationError, idx) => (
            <p className="error-item" key={idx}>{validationError}</p>
            ))}
        </div>

      </form>
    </div>
  );
}

export default LoginForm;
