/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './DeleteBooking.css';
import { thunkDeleteSpotBooking } from "../../../../store/bookingsReducer";

/******************************* COMPONENT *******************************/
function DeleteBooking({tripId}) {

  /***************** handle events *******************/
  const dispatch = useDispatch()

  const handleDelete = (tripId) => {
    dispatch(thunkDeleteSpotBooking(tripId))
    window.scrollTo(0,0)
  }


  /**************** render component *****************/
  return (
      <div className="pageWrapperContainer">
        <div className="DeleteBooking-component">

            <p>Are you sure you want to cancel this reservation?</p>

            <NavLink exact to="/trips">
                <button
                    type="submit"
                    className="DeleteBooking-cancel-button"
                    onClick={(e) => handleDelete(tripId)}
                    >
                    Confirm cancellation
                </button>
            </NavLink>
        </div>
      </div>
  )
}


/******************************** EXPORTS ********************************/
export default DeleteBooking
