/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
// local files
import * as sessionActions from "../../../../store/sessionReducer";
import '../../../../context/Modal.css'
import './SignUpForm.css'


/******************************* COMPONENT *******************************/
function SignUpForm() {

  /****************** access store *******************/
  const sessionUser = useSelector((state) => state.session.user);

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /***************** handle events *******************/
  const handleSubmit = (e) => {

    e.preventDefault();

    let errors = []

    if (password !== confirmPassword) {
      errors.push("Those passwords didn't match. Please try again.")
      setErrors(errors);
      return

    } else if (password === confirmPassword) {

      setErrors([]);

      let userData = {firstName, lastName, username, password, email }

      return  dispatch(sessionActions.signup(userData)).catch(
        async (res) => {

          const data = await res.json();

          if (data && data.errors) {
            data.errors.forEach(message => errors.push(message));
            setErrors(errors);
          }
        });
      }
    };

  /**************** render component *****************/
  // if (sessionUser) return <Redirect to="/" />; // omit: will not render upon refresh otherwise

  return (

    <div>

      <form className="signup-form">

        <div className="modal-subtitle">Finish signing up</div>

        <label>
          <input
            className="half-field-top"
            style={{marginTop:"20px"}}
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </label>

        <label>
          <input
            className="half-field-bottom"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </label>
        <div
          style={{marginTop:"5px"}}
          className="input-guide-text">Make sure it matches the name on your government ID.</div>

        <label>
          <input
            className="whole-field"
            style={{marginTop:"20px"}}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <div
          style={{marginTop:"5px"}}
          className="input-guide-text">We'll email you trip confirmations and receipts.</div>


        <label>
          <input
            className="whole-field"
            style={{marginTop:"20px"}}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>

        <label>
          <input
            className="whole-field"
            style={{marginTop:"20px"}}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>

        <label>
          <input
            className="whole-field"
            style={{marginTop:"20px"}}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>

        <div className="singUpDisclaimer">
        By selecting <span id="agreeAndContinue">Agree and continue</span>, I agree to Cranebnb's <span><a id="singUpDisclaimer" href="https://www.airbnb.com/terms?source=tos">Terms of Service</a></span>, <span><a id="singUpDisclaimer" href="https://www.airbnb.com/terms/payments_terms?source=tos">Payments Terms of Service</a></span>, and <span><a id="singUpDisclaimer" href="https://www.airbnb.com/terms/nondiscrimination_policy?source=tos">Nondiscrimination Policy</a></span>, and acknowledge the <span><a id="singUpDisclaimer" href="https://www.airbnb.com/terms/privacy_policy?source=tos"> Privacy Policy</a></span>.
        </div>

        <div className="errors" id="signUpErrors">
          {errors.map((error, idx) => (
            <p className="error-item" key={idx}>{error}</p>
            ))}
        </div>

        <button
          type="submit"
          className="submit-button"
          id="signUpSubmitButton"
          onClick={handleSubmit}
        >
          Agree and continue
        </button>

      </form>
    </div>
  );
}


/******************************** EXPORTS ********************************/
export default SignUpForm;
