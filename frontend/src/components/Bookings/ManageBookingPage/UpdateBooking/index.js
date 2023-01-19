/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
// local files
import './UpdateBooking.css';
import { calculateGrandTotal, calculateNumberOfDays, convertSemiFormalDate, getTodayISO } from "../../../../component-resources";
import { thunkUpdateSpotBooking } from "../../../../store/bookingsReducer";

/******************************* COMPONENT *******************************/
function UpdateBooking({tripId, trip, spotBookings}) {

    /************ key into pertinent values ************/
    const today = getTodayISO()
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD') // endDate: min value
    const bookings = Object.values(spotBookings)
    const currBookings = bookings.filter(obj => obj.endDate > today)

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    /****************** manage state *******************/
    const [startDate, setStartDate] = useState(trip && trip.startDate);
    const [endDate, setEndDate] = useState(trip && trip.startDate);
    let [guests, setGuests] = useState(trip && trip.guests + " guests");
    const [cost, setCost] = useState(trip && trip.Spot.price);
    const [total, setTotal] = useState(trip && trip.total);
    const [numDays, setNumDays]  = useState();
    const [validationErrors, setValidationErrors] = useState([]);
    const [isDisplayed, setIsDisplayed] = useState(false)

    // set initial input field values as current spot values
    useEffect(() => {
        setStartDate(trip && trip.startDate)
        setEndDate(trip && trip.endDate)
        setGuests(trip && trip.guests + " guests")

        let days = calculateNumberOfDays(trip && trip.startDate, trip && trip.endDate)
        setCost(trip && trip.Spot.price * days)

        setTotal(trip && trip.total)
    }, [trip]);



    /***************** handle events *******************/
    const changeStartDate = async (e) => {
        setStartDate(e.target.value);

        setValidationErrors([])

        if (e.target.value < endDate) {

            let days = calculateNumberOfDays(e.target.value, endDate)
            setNumDays(days)

            let subtotal = trip.Spot.price * days
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

            let subtotal = trip.Spot.price * days
            setCost(subtotal)

            let grandTotal = calculateGrandTotal(subtotal)
            setTotal(grandTotal)

            setIsDisplayed(true)
        }
    }

    // submit form
    const history = useHistory();
    const handleSubmit = (e) => {

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

        let updateBookingData = {
            startDate: startDate,
            endDate: endDate,
            guests: guests,
            total: total,
        }

        // console.log("numDays", numDays)
        // console.log("spot.id", spot.id)
        console.log("updateBookingData", updateBookingData)

        dispatch(thunkUpdateSpotBooking(tripId, updateBookingData)).catch(

            async (res) => {
                const data = await res.json();
                console.log("data", data)

                if (data && data.errors) {
                    errors.push(data.message);
                    setValidationErrors([...errors]);
                }
            }
        )

        // console.log("updateBooking", updateBooking)

        history.push(`/confirmation/trips/${tripId}`)
        window.scrollTo(0,0)
    }

    /**************** render component *****************/
    return (
            <div className="UpdateBooking-component">

                {/* <div className="UpdateBooking-form-container"> */}
                    <form className="UpdateBooking-form">

                        <div className="UpdateBooking-date-field-container">
                            <input
                                type="date"
                                value={startDate}
                                // onChange={changeStartAndEndDates}
                                onChange={changeStartDate}
                                min={today}
                                id="UpdateBooking-date-field-start"
                            >
                            </input>

                            <input
                                type="date"
                                value={endDate}
                                onChange={changeEndDate}
                                min={tomorrow}
                                id="UpdateBooking-date-field-end"
                            >
                            </input>
                        </div>

                        <select
                            id="UpdateBooking-select-field"
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

                        <div className="UpdateBooking-itemization-container">
                            <div className="UpdateBooking-itemization-subtotal-container">
                                {/* {isDisplayed && */}
                                    <div className="UpdateBooking-subtotal-item">
                                        <p><u>${trip && trip.Spot.price} X {numDays} night{numDays == 1 ? '' : 's'}</u></p>
                                        <p>${cost}</p>
                                    </div>
                                {/* } */}
                                <div className="UpdateBooking-subtotal-item">
                                    <p><u>Cleaning fee</u></p>
                                    <p>$25</p>
                                </div>
                                <div className="UpdateBooking-subtotal-item">
                                    <p><u>Service fee</u></p>
                                    <p>$50</p>
                                </div>
                            </div>


                            {/* {isDisplayed && */}
                                <div className="UpdateBooking-itemization-total-container">
                                    <p>Total before taxes</p>
                                    <p>${total}</p>
                                </div>
                            {/* } */}
                        </div>

                        <div className="errors">
                            {validationErrors.length > 0 && validationErrors.map(err => (
                                <p className="error-item" key={err}>{err}</p>
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="UpdateBooking-reserve-button"
                            disabled={!!validationErrors.length}
                            onClick={handleSubmit}
                            >
                            Update reservation
                        </button>

                    </form>
                {/* </div> */}

            </div>
    )
}


/******************************** EXPORTS ********************************/
export default UpdateBooking
