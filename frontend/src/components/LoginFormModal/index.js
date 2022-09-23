import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import HostingButton from './HostingButton';
import LoginForm from './LoginForm';
import menuBars from '../../assets/fontawesome/bars-solid.png'
import userIcon from '../../assets/fontawesome/circle-user-solid.png'
import './LoginForm.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div>
      <HostingButton />
      <button className='login-icon' onClick={() => setShowModal(true)}>
        <img id='menu-bar' src={menuBars}></img>
        <img id='user-icon' src={userIcon}></img>
      </button>
    </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
