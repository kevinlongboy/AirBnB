/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
// local files
import { thunkReadAllSpots, thunkReadSingleSpotDetails } from "../../../store/spotsReducer";
import MainFooter from '../../Footer/MainFooter';
import './CreateBookingForm.css';
import { calculateGrandTotal, calculateNumberOfDays, convertExactDate, convertSemiFormalDate, getTodayISO } from "../../../component-resources";
import { thunkCreateSingleBooking } from "../../../store/bookingsReducer";


/******************************* COMPONENT *******************************/
function CreateBookingForm({spot, bookings}) {

    /****************** access store *******************/
    const spotsState = useSelector(state => state.spots)

    /************ key into pertinent values ************/
    const today = getTodayISO()
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD') // endDate: min value
    const currBookings = bookings.filter(obj => obj.endDate > today)

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

        /******** Check for errors ********/
        let errors = [];
        setValidationErrors(errors);

        if (startDate == endDate) {
            errors.push("Minimum stay is 1 night")
        } else if (startDate > endDate) {
            errors.push("Please enter valid start and end dates")
        } else if (startDate > endDate) {
            errors.push("Start date cannot be on or after end date")
        }

        setValidationErrors(errors);
        if (errors.length) return;

        /******** Parse form data ********/
        if (typeof guests != 'number') {
            let rawVal = guests.slice(0, 1)
            guests = parseFloat(rawVal)
        }

        let createBookingData = {
            startDate: startDate,
            endDate: endDate,
            guests: guests,
            total: total,
        }

        // console.log("numDays", numDays)
        // console.log("spot.id", spot.id)
        // console.log("createBookingData", createBookingData)

        const newBooking = await dispatch(thunkCreateSingleBooking(spot.id, createBookingData)).catch(

            async (res) => {
                const data = await res.json();

                if (data && data.errors) {
                    errors.push(data.message);
                    setValidationErrors([...errors]);
                }
            }
        )

        if (newBooking) {
            // key into raw db data, since unable to add keys in backend for whatever reason
            history.push(`/confirmation/trips/${newBooking.Bookings.id}`)
        }
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

                    {isDisplayed &&
                        <>
                            <div className="errors">
                                <div className="unavailable-dates-title">Dates unavailable:</div>
                                    {currBookings.length > 0 && currBookings.map(booking => (
                                        <div id="unavailable-dates-container">
                                            <p className="error-item" key={booking.id}>{convertSemiFormalDate(booking.startDate)}</p>
                                            <p>-</p>
                                            <p>{convertSemiFormalDate(booking.endDate)}</p>
                                        </div>
                                    ))}
                            </div>
                        </>
                    }

                    <div className="errors">
                        {validationErrors.length > 0 && validationErrors.map(err => (
                            <p className="error-item" key={err}>{err}</p>
                        ))}
                    </div>

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
export default CreateBookingForm



/******************************** NOTES ********************************/
// 1.
// dynamically change endDate to correspond with changes to startDate
// with a value of 1 day
// const changeStartAndEndDates = async (e) => {
    //     setStartDate(e.target.value);
    //     let nextDay = dayjs(e.target.value).add(1, 'day').format('YYYY-MM-DD')
    //     // can also be modified to be dynamic per host requirements
    //     // IF host can require min. amount of days per stay
    //     setEndDate(nextDay)
// }
// problems: will change endDate if user modifies start date again after choosing an endDate
