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
import linkedinLogo from '../../../../assets/social-media-branding/linkedinLogo.png'
import githubLogo from '../../../../assets/social-media-branding/githubLogo.png'


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

          setErrors(errors)
        }
      }
    );
  };

  const handleSubmitDemoUser = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'demo@email.com', password: 'demoPassword' }))
    // history.push('/');
  };

  /**************** render component *****************/
  return (
    <div>

      <form className="login-form">
        {/* <div className="modalSubtitleContainer"> */}
          {/* <span>X</span> */}
          <div className="modal-subtitle">Log in or sign up</div>
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
          className="modalContinueButton"
          onClick={() => setShowModal(true)}
          >
          Continue to Sign Up
        </button>

        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
        )}

        <button
          className="modalContinueButton"
          type="submit"
          onClick={handleSubmitDemoUser}
          >
          Continue as Demo User
        </button>

        <button
          className="modalContinueButton"
          type="button"
          // onClick={handleSubmitRedirect}
          >
          {/* <i class="fa-brands fa-linkedin"></i> */}
          {/* <div id="buttonIcon" style={{align:"left"}}>
            <img src={linkedinLogo} style={{width:"20px"}}></img>
          </div> */}

          <div>
            <a style={{textDecoration:"none", color:"black"}} href="https://www.linkedin.com/in/kevinlongboy/">
            Continue with LinkedIn
            </a>
          </div>
        </button>

        <button
          className="modalContinueButton"
          type="button"
          // onClick={handleSubmitRedirect}
          >
          {/* <i class="fa-brands fa-github"></i> */}
          {/* <div className="buttonIcon" style={{align:"left"}}>
            <img src={githubLogo} style={{width:"20px"}}></img>
          </div> */}
          <div>
            <a style={{textDecoration:"none", color:"black"}} href="https://github.com/kevinlongboy">
            Continue with GitHub
            </a>
          </div>
        </button>


      </form>
    </div>
  );
}


/******************************** EXPORTS ********************************/
export default LoginForm;
