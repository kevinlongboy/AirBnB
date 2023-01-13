/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadAllSpots, thunkReadSingleSpotDetails } from "../../../store/spotsReducer";
import MainFooter from '../../Footer/MainFooter';
import './CreateBookingForm.css';
import { getTodayISO } from "../../../component-resources";


/******************************* COMPONENT *******************************/
function CreateBookingForm({spot}) {

    /****************** access store *******************/
    const spotsState = useSelector(state => state.spots)

    /************ key into pertinent values ************/
    const today = getTodayISO()

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [guests, setGuests] = useState("");
    const [cost, setCost] = useState(spot.price);
    const [validationErrors, setValidationErrors] = useState([]);

    /***************** handle events *******************/
    // submit form
    const history = useHistory();
    const handleSubmit = async (e) => {

        e.preventDefault();

        let errors = [];
        setValidationErrors(errors);

        let createBookingData = {
            startDate: startDate,
            endDate: endDate,
            // guests: guests,
            // cost, cost,
        }

        console.log("spot.id", spot.id)
        console.log("createBookingData", createBookingData)

        // const newBooking = await dispatch(thunkCreateSingleBooking(spot.id, createBookingData)).catch(

        //     async (res) => {
        //         const data = await res.json();

        //         if (data && data.errors) {
        //             data.errors.forEach(message => errors.push(message));
        //             setValidationErrors(errors);
        //         }
        //     }
        // )

        // if (newBooking) {
        //     history.push(`confirmation/${newBooking.id}`)
        // }
    }



    /**************** render component *****************/
    return (
        <div className="CreateBookingForm-component">
            <div className="CreateBookingForm-overview-container">

                <div className="CreateBookingForm-spot-price">${spot.price} <span>night</span></div>

                <div className="CreateBookingForm-spot-rating">
                    ★ {spot.avgStarRating}<span>{' '} · {' '}</span><u>{spot.numReviews} reviews</u>
                </div>
            </div>

            <div className="CreateBookingForm-form-container">
                <form className="CreateBookingForm-form">

                    <div className="CreateBookingForm-date-field-container">
                        <input
                            type="date"
                            min={today}
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                            id="CreateBookingForm-date-field-start"
                        >
                        </input>

                        <input
                            type="date"
                            min={today}
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                            id="CreateBookingForm-date-field-end"
                        >
                        </input>
                    </div>

                    <select
                        id="CreateBookingForm-select-field"
                        onChange={(e) => setGuests(e.target.value)}
                        value={guests}
                    >
                        <option>1 guest</option>
                        <option>2 guests</option>
                    </select>

                    <button
                        type="submit"
                        className="CreateBookingForm-reserve-button"
                        disabled={!!validationErrors.length}
                        onClick={handleSubmit}
                        >
                        Reserve
                    </button>

                    <p>You won't be charged yet</p>
                </form>
            </div>

            <div className="CreateBookingForm-itemization-container">
                <div className="CreateBookingForm-itemization-subtotal-container">
                    <div className="CreateBookingForm-subtotal-item">
                        <p><u>${spot.price} X nights</u></p>
                        <p>$ function res</p>
                    </div>
                    <div className="CreateBookingForm-subtotal-item">
                        <p><u>Cleaning fee</u></p>
                        <p>$0</p>
                    </div>
                    <div className="CreateBookingForm-subtotal-item">
                        <p><u>Service fee</u></p>
                        <p>$0</p>
                    </div>
                </div>

                <div className="CreateBookingForm-itemization-total-container">
                    <p>Total before taxes</p>
                    <p>$0</p>
                </div>
            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default CreateBookingForm
