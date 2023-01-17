/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './ManageBookingPage.css';
import { thunkReadUserBookings } from "../../../store/bookingsReducer";
import { convertExactDate, convertInformalDate } from "../../../component-resources";
import UpdateBooking from "./UpdateBooking";
import DeleteBooking from "./DeleteBooking";
import SpotPageFooter from "../../Footer/SpotPageFooter";

/******************************* COMPONENT *******************************/
function ManageBookingPage() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const bookingsState = useSelector(state => state.bookings);

    /************ key into pertinent values ************/
    const { tripId } = useParams()
    const allUserBookings = Object.values(bookingsState.userBookings)
    const booking = allUserBookings.filter(obj => obj.id == tripId)
    const trip = booking[0]
    console.log("trip", booking)

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadUserBookings());
    }, [dispatch]);

    /****************** manage state *******************/
    const [display, setDisplay] = useState('edit');

    /************* conditional components **************/
    // images


    /**************** render component *****************/
    return (
        <>
            <div className="ManageBookingPage-page-wrapper-component">
                <div className="ManageBookingPage-component">

                    <div
                        className="ManageBookingPage-card"
                        id="ManageBookingPage-overview-card"
                    >
                        <div
                            className="ManageBookingPage-overview-card-thumbnail-container"
                            // style={{
                            //     backgroundImage:`url(${trip && trip.Spot.previewImage})`,
                            //     backgroundRepeat:"no-repeat",
                            //     backgroundPosition: "center",
                            //     backgroundSize: "cover",
                            //     filter:"brightness(60%)"
                            // }}
                        >
                            <img
                                src={trip && trip.Spot.previewImage}
                                alt="Image of destination"
                                className="ManageBookingPage-overview-card-thumbnail"
                            >
                            </img>
                        </div>
                        <div className="ManageBookingPage-overview-card-text-container">
                            <div>
                                <h1
                                    id="ManageBookingPage-overview-card-thumbnail-container-text"
                                    style={{filter:"brightness(100%)"}}
                                >
                                    {trip && trip.Spot.name}
                                </h1>
                            </div>
                            <div className="ManageBookingPage-overview-card-dates-container">
                                <div className="ManageBookingPage-overview-card-date">
                                    <p>Check-in</p>
                                    <p>{trip && convertExactDate(trip.startDate)}</p>
                                </div>
                                <div className="ManageBookingPage-overview-card-date">
                                    <p>Checkout</p>
                                    <p>{trip && convertExactDate(trip.endDate)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="ManageBookingPage-card"
                        id="ManageBookingPage-details-card"
                    >
                        <h1>Reservation details</h1>
                        <div className="ManageBookingPage-details-card-row">
                            <h2>Who's coming</h2>
                            <p>{trip && trip.guests} guest{trip && trip.guests == 1 ? '' : 's'}</p>
                        </div>
                        <div className="ManageBookingPage-details-card-row">
                            <h2>Confirmation code</h2>
                            <p>{trip && trip.id}</p>
                        </div>
                    </div>

                    <div
                        className="ManageBookingPage-card"
                        id="ManageBookingPage-payment-card"
                    >
                        <h1>Payment info</h1>
                        <div className="ManageBookingPage-payment-card-row">
                            <h2>Total cost</h2>
                            <p>${trip && (trip.total).toFixed(2)} USD</p>
                        </div>
                    </div>

                    <div
                        className="ManageBookingPage-card"
                        id="ManageBookingPage-manage-card"
                    >
                        <h1>Manage</h1>
                        <div className="ManageBookingPage-manage-card-row">
                            <div className="ManageBookingPage-manage-card-buttons-container">
                                <button
                                    onClick={() => setDisplay('edit')}
                                    className="ManageBookingPage-navbar-button"
                                    id={display === "edit" ? "ManageBookingPage-navbar-button-active" : "ManageBookingPage-navbar-button"}
                                    >
                                    Modify
                                </button>

                                <button
                                    onClick={() => setDisplay('delete')}
                                    className="ManageBookingPage-navbar-button"
                                    id={display === "delete" ? "ManageBookingPage-navbar-button-active" : "ManageBookingPage-navbar-button"}
                                    >
                                    Delete
                                </button>
                            </div>
                            <div className="ManageBookingPage-nested-booking-component-container">
                                {display === 'edit' ?
                                    <UpdateBooking
                                    tripId={tripId}
                                    trip={trip}
                                    /> :

                                    <DeleteBooking
                                    tripId={trip && trip.id}
                                    />
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <SpotPageFooter />
        </>
    )
}


/******************************** EXPORTS ********************************/
export default ManageBookingPage
