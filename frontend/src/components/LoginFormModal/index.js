import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import ProfileButton from '../Navigation/ProfileButton';
import LoginForm from './LoginForm';
import menuBars from '../../assets/fontawesome/bars-solid.png'
import userIcon from '../../assets/fontawesome/circle-user-solid.png'
import './LoginFormModal.css';
import SignupFormPage from './SignupForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div style={{display:"flex"}}>
      <button className='account-button' onClick={() => setShowModal(true)}>
        <img id='menu-icon' src={menuBars}></img>
        <img id='user-icon' src={userIcon}></img>
      </button>
    </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
          {/* <SignupFormPage /> */}
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
