/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './UserBookings.css';
import { thunkReadUserBookings } from "../../../store/bookingsReducer";
import waveIcon from "../../../assets/icons/wave-icon.png";
import { convertInformalDate } from "../../../component-resources";



/******************************* COMPONENT *******************************/
function UserBookings() {

    /****************** access store *******************/
    const bookingsState = useSelector(state => state.bookings);

    /************ key into pertinent values ************/
    // instantiate current date
    // create two arrays:
        // upcoming - after current date
        // past - before current date
    //

    let iso = new Date().toISOString()
    let today = iso.slice(0, 10)

    let bookings = Object.values(bookingsState.userBookings)

    let upcomingBookingsArr = bookings.filter(obj => obj.startDate > today)
    // let upcomingBookingsArr = [] // uncomment to test for null upcoming bookings
    let pastBookingsArr = bookings.filter(obj => obj.endDate < today)
    // let pastBookingsArr = [] // uncomment to test for null past bookings


    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadUserBookings());
    }, [dispatch]);

    /************* conditional components **************/
    let upcomingBookingsCard
    if (upcomingBookingsArr.length < 1 ) {
        upcomingBookingsCard = (
            <div className="upcomingBookingsCard-null">
                <div className="upcomingBookingsCard-null-text-container">
                    <div>
                        <img src={waveIcon} alt="hand waving" className="hand-wave-icon"></img>
                    </div>
                    <span>No trips booked...yet!</span>
                    <div>Time to dust off your bags and start planning your next adventure</div>
                    <button className="start-searching-button">
                        <NavLink exact to="/">Start searching</NavLink>
                    </button>
                </div>

                <div className="upcomingBookingsCard-null-image-container">
                    <img src="https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt9f963e28a1653537/609c74590b35110a662a7183/422165361_001_0748_169crop.jpg?crop=100p,100p,x0,y0&width=1050&height=591&auto=webp"
                    alt="couple traveling"
                    className="upcomingBookingsCard-null-image"
                    ></img>
                    </div>
            </div>
        )
    } else {
        upcomingBookingsCard = (
            <>
                <div className="UserBookings-upcoming-trips-subtitle">
                    Upcoming reservations
                </div>
                <div>
                    {upcomingBookingsArr.map(booking => (
                        <div className="UserBookings-card">

                            <div className="UserBookings-card-text-container">
                                <div className="UserBookings-card-owner-info-container">
                                    <span>{booking.Spot.name}</span>
                                    <span>Hosted by {booking.Spot.ownerName}</span>
                                </div>
                                <div className="UserBookings-card-spot-info-container">
                                    <div className="UserBookings-card-booking-dates-container">
                                        <p>{convertInformalDate(booking.startDate)}</p>
                                        <p>-</p>
                                        <p>{convertInformalDate(booking.endDate)}</p>
                                    </div>
                                    <div className="UserBookings-card-booking-location-container">
                                        <p>{`${booking.Spot.city}, ${booking.Spot.state}`}</p>
                                        <p>{booking.Spot.country}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="UserBookings-card-image-container">
                                <NavLink exact to={`/spots/${booking.Spot.id}`}>
                                    <img
                                        src={booking.Spot.previewImage}
                                        alt="Preview image of trip destination"
                                        className="UserBookings-card-image"
                                    ></img>
                                </NavLink>
                            </div>

                        </div>
                    ))}
                </div>
            </>
        )
    }

    let pastBookingsCard
    if (pastBookingsArr.length < 1 ) {
        pastBookingsCard = (
            <></>
        )
    } else {
        pastBookingsCard = (
            <div className="UserBookings-past-trips-cards-container">
                {pastBookingsArr.map(booking => (
                    <NavLink exact to={`/spots/${booking.Spot.id}`}>
                        <div className="UserBookings-past-trips-card">
                            <div className="past-trip-card-thumbnail-container">
                                <img
                                    src={booking.Spot.previewImage}
                                    alt="past booking thumbnail"
                                    className="past-trip-card-thumbnail"
                                    >
                                </img>
                            </div>

                            <div className="past-trip-card-booking-details-container">
                                <p>{booking.Spot.name}</p>
                                <p>Hosted by {booking.Spot.ownerName}</p>
                                <p>{`${convertInformalDate(booking.startDate)} - ${convertInformalDate(booking.endDate)}`}</p>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        )
    }



    /**************** render component *****************/
    return (
        <div className="pageWrapperContainer">
            <div className="UserBookings-component">

                <div className="UserBookings-header">
                    Trips
                </div>

                <div className="UserBookings-upcoming-trips-container">
                    <div className="UserBookings-upcoming-trips-card-container">
                        {upcomingBookingsCard}
                    </div>
                </div>

                <div className="UserBookings-past-trips-container">
                    <div className="UserBookings-past-trips-subheader">Where you've been</div>
                    {pastBookingsCard}
                </div>

            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default UserBookings
