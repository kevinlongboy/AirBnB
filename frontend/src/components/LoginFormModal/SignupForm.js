import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// import { Modal } from '../../context/Modal'; // SETUP MODAL
import '../../context/Modal.css'


function SignupFormPage() {

  // const [showModal, setShowModal] = useState(false); // SETUP MODAL


  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);

      let user = {firstName, lastName, username, password, email }

      let signUp = dispatch(sessionActions.signup(user))
        .catch(async (res) => {
          const data = await res.json();

          if (data && data.errors) setErrors(data.errors);
        });
    }

    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    // <Modal onClose={() => setShowModal(false)}> // SETUP MODAL

      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        <label>
          First name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </label>

        <label>
          Last name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </label>

        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>

        <button type="submit">Sign Up</button>
      </form>

    // </Modal>
  );
}

export default SignupFormPage;
