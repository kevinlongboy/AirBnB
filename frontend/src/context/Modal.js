/******************************** IMPORTS ********************************/
// libraries
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// local files
import './Modal.css';


/************ key into pertinent values ************/
const ModalContext = React.createContext();


/******************************* COMPONENT *******************************/
export function ModalProvider({ children }) {

  /****************** manage state *******************/
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  /**************** render component *****************/
  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


/******************************* COMPONENT *******************************/
export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  /**************** render component *****************/
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
