/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
// local files
import './SpotPageNullUserPanel.css';
import { calculateGrandTotal, calculateNumberOfDays, getTodayISO } from "../../../../component-resources";
import { Modal } from "../../../../context/Modal";
import LoginForm from "../../../Navigation/NoSession/LoginForm";


/******************************* COMPONENT *******************************/
function SpotPageNullUserPanel({spot}) {

    /************ key into pertinent values ************/
    const today = getTodayISO()
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD') // endDate: min value

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    let [guests, setGuests] = useState(1);
    const [cost, setCost] = useState(spot.price);
    const [total, setTotal] = useState();
    const [numDays, setNumDays]  = useState(1);
    const [validationErrors, setValidationErrors] = useState([]);
    const [isDisplayed, setIsDisplayed] = useState(false)
    const [showModal, setShowModal] = useState(false);

    /***************** handle events *******************/
    const changeStartDate = async (e) => {
        setStartDate(e.target.value);

        setValidationErrors([])

        if (e.target.value < endDate) {

            let days = calculateNumberOfDays(e.target.value, endDate)
            setNumDays(days)

            let subtotal = spot.price * days
            setCost(subtotal)

            let grandTotal = calculateGrandTotal(subtotal)
            setTotal(grandTotal)

            setIsDisplayed(true)
        }
    }

    const changeEndDate = async (e) => {
        setEndDate(e.target.value);

        setValidationErrors([])

        if (e.target.value > startDate) {

            let days = calculateNumberOfDays(startDate, e.target.value)
            setNumDays(days)

            let subtotal = spot.price * days
            setCost(subtotal)

            let grandTotal = calculateGrandTotal(subtotal)
            setTotal(grandTotal)

            setIsDisplayed(true)
        }
    }

    // submit form
    const history = useHistory();
    const handleSubmit = async (e) => {

        e.preventDefault();

        setShowModal(true)
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
                            value={startDate}
                            // onChange={changeStartAndEndDates}
                            onChange={changeStartDate}
                            min={today}
                            id="CreateBookingForm-date-field-start"
                        >
                        </input>

                        <input
                            type="date"
                            value={endDate}
                            onChange={changeEndDate}
                            min={tomorrow}
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
                        <option>3 guests</option>
                        <option>4 guests</option>
                        <option>5 guests</option>
                    </select>

                    <div className="errors">
                        {validationErrors.length > 0 && validationErrors.map(err => (
                            <p className="error-item" key={err}>{err}</p>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="CreateBookingForm-reserve-button"
                        onClick={handleSubmit}
                        >
                        Login to reserve
                    </button>

                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <LoginForm />
                        </Modal>
                    )}

                    {/* <p>You won't be charged yet</p> */}
                </form>
            </div>

            <div className="CreateBookingForm-itemization-container">
                <div className="CreateBookingForm-itemization-subtotal-container">
                    {isDisplayed &&
                        <div className="CreateBookingForm-subtotal-item">
                            <p><u>${spot.price} X {numDays} night{numDays == 1 ? '' : 's'}</u></p>
                            <p>${cost}</p>
                        </div>
                    }
                    <div className="CreateBookingForm-subtotal-item">
                        <p><u>Cleaning fee</u></p>
                        <p>$25</p>
                    </div>
                    <div className="CreateBookingForm-subtotal-item">
                        <p><u>Service fee</u></p>
                        <p>$50</p>
                    </div>
                </div>


                {isDisplayed &&
                    <div className="CreateBookingForm-itemization-total-container">
                        <p>Total before taxes</p>
                        <p>${total}</p>
                    </div>
                }
            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default SpotPageNullUserPanel
