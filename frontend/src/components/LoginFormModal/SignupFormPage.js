import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/sessionReducer";
import '../../context/Modal.css'


function SignupFormPage() {

  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {

    e.preventDefault();

    let errors = []

    if (password !== confirmPassword) {
      errors.push("Those passwords didn't match. Please try again.")
      setErrors(errors);
      return
    }

    else if (password === confirmPassword) {

      setErrors([]);

      let userData = {firstName, lastName, username, password, email }

      let signUp = dispatch(sessionActions.signup(userData)).catch(
        async (res) => {

          const data = await res.json();

          if (data && data.errors) {
            data.errors.forEach(message => errors.push(message));
            setErrors(errors);
          }

          return
        });
    }
  };

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

        <div className="disclaimer">
        {/* By selecting <p style={{fontWeight:"900"}}>Agree and continue</p>, I agree to Cranebnb's <a id="signup-disclaimer" href="https://www.airbnb.com/terms?source=tos">Terms of Service</a>, <a id="signup-disclaimer" href="https://www.airbnb.com/terms/payments_terms?source=tos">Payments Terms of Service</a>, and <a id="signup-disclaimer" href="https://www.airbnb.com/terms/nondiscrimination_policy?source=tos">Nondiscrimination Policy</a> and acknowledge the <a id="signup-disclaimer" href="https://www.airbnb.com/terms/privacy_policy?source=tos"> Privacy Policy</a>. */}
        By selecting Agree and continue, I agree to Cranebnb's Terms of Service, Payments Terms of Service, and Nondiscrimination Policy and acknowledge the Privacy Policy.
        </div>

        <div className="errors">
          {errors.map((error, idx) => (
            <p className="error-item" key={idx}>{error}</p>
            ))}
        </div>

        <button
          type="submit"
          className="submit-button"
          onClick={handleSubmit}
        >
          Agree and continue
        </button>

      </form>
    </div>
  );
}

export default SignupFormPage;
