/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './BookingConfirmationPage.css';


/******************************* COMPONENT *******************************/
function BookingConfirmationPage() {

  /****************** access store *******************/
  const sessionState = useSelector(state => state.session);
  const bookingsState = useSelector(state => state.bookings);

  /************ key into pertinent values ************/


  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadSingleSpotDetails(spotId));
  }, [dispatch, spotId]);

  /************* conditional components **************/
  // images


  /**************** render component *****************/
  return (
      <div className="pageWrapperContainer">
        <div className="BookingConfirmationPage-component">
            <div className="BookingConfirmationPage-left-container">
                <div className="BookingConfirmationPage-header-container">
                    <div className="BookingConfirmationPage-header">
                        Your reservation is pending
                    </div>
                    <div className="BookingConfirmationPage-header-text">
                        <p>This isn’t a confirmed reservation—yet. You’ll get a response from the host, Whistler Platinum, at kevinlongboy@gmail.com within 24 hours.</p>
                        <p>Don’t worry—you won’t be charged until your reservation is confirmed.</p>
                    </div>
                </div>

            </div>

            <div className="BookingConfirmationPage-right-container">
                <div className="BookingConfirmationPage-card">
                    <div>
                        <img></img>
                    </div>

                    <div>
                        <p>Name</p>
                        <p>Dates * guest</p>
                    </div>

                    <div>
                        <div>
                            <p>Total</p>
                            <p>$total</p>
                        </div>
                        <div>
                            <p>Reservation code</p>
                            <p>booking.id</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
  )
}


/******************************** EXPORTS ********************************/
export default BookingConfirmationPage
