/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './BookingConfirmationPage.css';
import { thunkReadUserBookings } from "../../../store/bookingsReducer";
import { convertInformalDate } from "../../../component-resources";


/******************************* COMPONENT *******************************/
function BookingConfirmationPage() {

  /****************** access store *******************/
  const sessionState = useSelector(state => state.session);
  const bookingsState = useSelector(state => state.bookings);

  /************ key into pertinent values ************/
  const { tripId } = useParams()
  const allUserBookings = Object.values(bookingsState.userBookings)
  const booking = allUserBookings.filter(obj => obj.id == tripId)
  const trip = booking[0]
  console.log("trip", trip)

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkReadUserBookings());
  }, [dispatch]);

  /************* conditional components **************/
  // images


  /**************** render component *****************/
  return (
      <div className="pageWrapperContainer">
        <div className="BookingConfirmationPage-component">

            <div className="BookingConfirmationPage-left-container">
                <div className="BookingConfirmationPage-header">
                    <h1>Your reservation is pending</h1>
                    <p>This isn’t a confirmed reservation—yet. You’ll get a response from the host, {trip && trip.Spot.ownerName}, at {sessionState.user.email} within 24 hours.</p>
                    <p>Don’t worry—you won’t be charged until your reservation is confirmed.</p>
                </div>
            </div>

            <div className="BookingConfirmationPage-right-container">
                <div className="BookingConfirmationPage-card">
                    <div className="BookingConfirmationPage-card-thumbnail-container">
                        <img
                            src={trip && trip.Spot.previewImage}
                            alt="Spot image"
                            className="BookingConfirmationPage-card-thumbnail"
                            >
                        </img>
                    </div>

                    <div className="BookingConfirmationPage-card-overview-container">
                        <h1>{trip && trip.Spot.name}</h1>
                        <p>
                            {trip && convertInformalDate(trip.startDate)} - {trip && convertInformalDate(trip.endDate)} · {trip && trip.guests} guest{trip && trip.guests == 1 ? '' : 's'}
                        </p>
                    </div>

                    <div className="BookingConfirmationPage-card-details-container">
                        <div className="BookingConfirmationPage-card-detail">
                            <p>Total</p>
                            <p>${trip && trip.total}</p>
                        </div>
                        <div className="BookingConfirmationPage-card-detail">
                            <p>Reservation code</p>
                            <p>{tripId}</p>
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
