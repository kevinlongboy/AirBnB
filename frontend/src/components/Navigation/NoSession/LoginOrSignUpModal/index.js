/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
// local files
import { Modal } from '../../../../context/Modal';
import MenuButton from '../../MenuButton';
import LoginForm from '../LoginForm';
import './LoginOrSignUpModal.css';


/******************************* COMPONENT *******************************/
function LoginOrSignUpModal() {

  /****************** manage state *******************/
  const [showModal, setShowModal] = useState(false);

  /**************** render component *****************/
  return (
    <>
    <div style={{display:"flex"}}>
      <button className='menu-button' onClick={() => setShowModal(true)}>
        <MenuButton />
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
