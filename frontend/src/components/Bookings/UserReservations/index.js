/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './UserReservations.css';
import { thunkReadUserReservations } from "../../../store/bookingsReducer";
import UpcomingReservations from "./UpcomingReservations";
import PastReservations from "./PastReservations";


/******************************* COMPONENT *******************************/
function UserReservations() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session)
    const bookingsState = useSelector(state => state.bookings);

    /************ key into pertinent values ************/
    let iso = new Date().toISOString();
    let today = iso.slice(0, 10);

    let spots;
    bookingsState.userReservations ? spots = Object.values(bookingsState.userReservations) : spots = null;

    // get all user's spots
    // iterate through all spots,
        // collect spotId' by pushing number into an array (use this later to render spot info for spot card)
        // for each spot, separate its reservations into past and upcoming

    let spotIds = []
    let upcomingReservationsArr = [];
    let pastReservationsArr = []

    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]
        spotIds.push(spot.id)

        for (let j = 0; j < spot.Reservations.length; j++) {
            let reservation = spot.Reservations[j]
            if (reservation.startDate >= today) upcomingReservationsArr.push(reservation)
            if (reservation.endDate < today) pastReservationsArr.push(reservation)
        }
    }

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadUserReservations());
    }, [dispatch]);

    /****************** manage state *******************/
    const [display, setDisplay] = useState('upcoming');

    /**************** render component *****************/
    return (
        <div className="pageWrapperContainer">
            <div className="UserReservations-component">

                <div className="UserReservations-header">
                    Hi, {sessionState.user.firstName}!
                </div>

                <div className="UserReservations-subheader">
                    <p>Your reservations</p>
                    <p><u>All Reservations ({upcomingReservationsArr.length + pastReservationsArr.length})</u></p>
                </div>

                <div className="UserReservations-navbar-container">
                    <button
                        onClick={() => setDisplay('upcoming')}
                        className="UserReservations-navbar-button"
                        id={display === "upcoming" ? "UserReservations-navbar-button-active" : "UserReservations-navbar-button"}
                    >
                        Upcoming ({upcomingReservationsArr.length})
                    </button>

                    <button
                        onClick={() => setDisplay('past')}
                        className="UserReservations-navbar-button"
                        id={display === "past" ? "UserReservations-navbar-button-active" : "UserReservations-navbar-button"}
                    >
                        Past ({pastReservationsArr.length})
                    </button>
                </div>

                <div className="conditional-reservations-card-container">
                    {display === 'upcoming' ?
                        <UpcomingReservations
                            spots={spots}
                            spotIds={spotIds}
                            upcomingReservationsArr={upcomingReservationsArr}/> :

                        <PastReservations
                            spots={spots}
                            spotIds={spotIds}
                            pastReservationsArr={pastReservationsArr}/>
                    }
                </div>


            </div>
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default UserReservations
