/******************************** IMPORTS ********************************/
// libraries
import React, { useState } from 'react';
// local files
import { Modal } from '../../../context/Modal';
import ReviewForm from './ReviewForm';
import './ReviewFormModal.css';


/******************************* COMPONENT *******************************/
function ReviewFormModal({ reviewFormAction, spot, userReview }) {

  /****************** manage state *******************/
  const [showModal, setShowModal] = useState(false);

  /**************** render component *****************/
  return (
    <>
        <div style={{display:"flex"}}>
            <button className='ReviewFormModal-button' onClick={() => setShowModal(true)}>
                {reviewFormAction}
            </button>
        </div>

        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <ReviewForm
                    reviewFormAction={reviewFormAction}
                    spot={spot}
                    userReview={userReview}
                    modalFunc={setShowModal}
                />
            </Modal>
        )}
    </>
  );
}


/******************************** EXPORTS ********************************/
export default ReviewFormModal;
