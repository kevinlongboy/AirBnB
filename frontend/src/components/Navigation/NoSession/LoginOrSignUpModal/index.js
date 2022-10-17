/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
// local files
import { Modal } from '../../../../context/Modal';
import LoginForm from '../LoginForm';
import menuBars from '../../../../assets/fontawesome/bars-solid.png'
import userIcon from '../../../../assets/fontawesome/circle-user-solid.png'
import './LoginOrSignUpModal.css';


/******************************* COMPONENT *******************************/
function LoginOrSignUpModal() {

  /****************** manage state *******************/
  const [showModal, setShowModal] = useState(false);

  /**************** render component *****************/
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
        </Modal>
      )}
    </>
  );
}


/******************************** EXPORTS ********************************/
export default LoginOrSignUpModal;
