/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../../../store/sessionReducer";
import { useDispatch } from "react-redux";
// local files
import { Modal } from '../../../../context/Modal';
import '../../../../context/Modal.css'
import SignUpForm from "../SignUpForm/index.js";
import './LoginForm.css';


/******************************* COMPONENT *******************************/
function LoginForm() {

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    let validationErrors = [];
    setValidationErrors(validationErrors)

    if (credential.length > 0 && credential.length < 5) {
      validationErrors.push("Please enter your username or email")
    }

    if (password.length > 0 && password.length < 5) {
      validationErrors.push("Please enter your password")
    }

    setValidationErrors(validationErrors)
  }, [credential, password])

  /***************** handle events *******************/
  const handleSubmitLogin = (e) => {

    e.preventDefault();

    let errors = []
    setErrors([]);

    if (!credential) {
      errors.push("Please enter your username or email.")
    }
    if (!password) {
      errors.push("Please enter your password.")
    }
    setErrors(errors)
    if (errors.length) return


    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {

        const data = await res.json();

        if (data && data.message) {


          errors.push(data.message)

          setErrors([...errors])
        }
      }
    );
  };

  const handleSubmitDemoUser = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'demo@email.com', password: 'demoPassword' }))
    // history.push('/');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  /**************** render component *****************/
  return (
    <div className="LoginForm-component">

      <form className="login-form">
        {/* <div className="modalSubtitleContainer"> */}
          {/* <span>X</span> */}
          <div className="modal-subtitle" id="modal-subtitle-signup">Log in or sign up</div>
        {/* </div> */}

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

        <div className="loginDisclaimer">
          We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
          <a href="https://www.airbnb.com/help/article/2855/airbnb-privacy" style={{fontWeight:"bolder"}}>Privacy Policy</a>
        </div>

        <div className="errors">
          {errors.map((error, idx) => (
            <p className="error-item" key={idx}>{error}</p>
            ))}
          {validationErrors.map((validationError, idx) => (
            <p className="error-item" key={idx}>{validationError}</p>
            ))}
        </div>

        <button
          className="submit-button"
          id="login-button"
          type="submit"
          disabled={!!validationErrors.length}
          onClick={handleSubmitLogin}
          >
        Continue
        </button>

        <div className="or">or</div>

        <button
          className="loginFormContinueButton"
          // onClick={() => setShowModal(true)}
          onClick={handleSignUp}
        >
          <div className="loginFormContinueButtonLogo"><i class="fa-regular fa-envelope"></i></div>
          <div className="loginFormContinueButtonText">Continue to Sign Up</div>
        </button>

        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
        )}

        <button
          className="loginFormContinueButton"
          type="submit"
          onClick={handleSubmitDemoUser}
          >
          <div className="loginFormContinueButtonLogo"><i class="fa-solid fa-user"></i></div>
          <div className="loginFormContinueButtonText">Continue as Demo User</div>
        </button>

        <a style={{textDecoration:"none", color:"black"}} href="https://www.linkedin.com/in/kevinlongboy/">
          <button
            className="loginFormContinueButton"
            type="button"
            // onClick={handleSubmitRedirect}
            >
            {/* <div id="buttonIcon" style={{align:"left"}}>
              <img src={linkedinLogo} style={{width:"20px"}}></img>
            </div> */}
            <div className="loginFormContinueButtonLogo"><i class="fa-brands fa-linkedin" style={{color:'#0d65c2'}}></i></div>
            <div className="loginFormContinueButtonText">
              Continue with LinkedIn
            </div>
          </button>
        </a>

        <a style={{textDecoration:"none", color:"black"}} href="https://github.com/kevinlongboy">
          <button
            className="loginFormContinueButton"
            type="button"
            // onClick={handleSubmitRedirect}
            >
            {/* <div className="buttonIcon" style={{align:"left"}}>
              <img src={githubLogo} style={{width:"20px"}}></img>
            </div> */}
            <div className="loginFormContinueButtonLogo"><i class="fa-brands fa-github"></i></div>
            <div className="loginFormContinueButtonText">
              Continue with GitHub
            </div>
          </button>
        </a>


      </form>
    </div>
  );
}


/******************************** EXPORTS ********************************/
export default LoginForm;
