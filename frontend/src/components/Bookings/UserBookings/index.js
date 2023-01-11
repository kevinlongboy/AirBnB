/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './UserBookings.css';
import { thunkReadUserBookings } from "../../../store/bookingsReducer";
import waveIcon from "../../../assets/icons/wave-icon.png";



/******************************* COMPONENT *******************************/
function UserBookings() {

    /****************** access store *******************/
    const bookingsState = useSelector(state => state.bookings);
    const spotsState = useSelector(state => state.spots);

    /************ key into pertinent values ************/
    // instantiate current date
    // create two arrays:
        // upcoming - after current date
        // past - before current date
    //

    let iso = new Date().toISOString()
    let today = iso.slice(0, 10)

    let bookings = Object.values(bookingsState.userBookings)

    // let upcomingBookingsArr = bookings.filter(obj => obj.startDate > today)
    let upcomingBookingsArr = []
    let pastBookingsArr = bookings.filter(obj => obj.endDate < today)




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
    }


    let pastBookingsCard



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
                    Where you've been
                </div>

            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default UserBookings
