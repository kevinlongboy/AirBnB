/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './UpcomingReservations.css';
import { convertInformalDate } from "../../../../component-resources";
import accountIcon from "../../../../assets/icons/done-icon.png";

/******************************* COMPONENT *******************************/
function UpcomingReservations({spots, spotIds, upcomingReservationsArr}) {

    /************ key into pertinent values ************/
    // upcomingReservationsArr = [] // uncomment to test for null reservations

    /************* conditional components **************/
    let upcomingReservationsCard;

    if (upcomingReservationsArr.length < 1) {
        upcomingReservationsCard = (
            <div className="rsvp-card-empty">
                <div className="rsvp-card-empty-image-container">
                    <img src={accountIcon} alt="check mark icon" className="rsvp-card-empty-image"></img>
                </div>
                <div className="rsvp-card-empty-text-container">
                    <p>You currently don’t have any upcoming guests.</p>
                </div>
            </div>
        )
    } else {
        upcomingReservationsCard = (
            <>
                {upcomingReservationsArr.map(rsvp => {

                    // obtain spot info
                    let spot = spots.find(obj => obj.id == rsvp.spotId);

                    // render component
                    return (
                        <div className="rsvp-card">
                            <div className="rsvp-card-text-container">
                                <div className="rsvp-card-owner-info-container">
                                    <span>{spot.name}</span>
                                    <span>Booked by {rsvp.User.firstName}</span>
                                </div>
                                <div className="rsvp-card-spot-info-container">
                                    <div className="rsvp-card-booking-dates-container">
                                        <p>{convertInformalDate(rsvp.startDate)}</p>
                                        <p>-</p>
                                        <p>{convertInformalDate(rsvp.endDate)}</p>
                                    </div>
                                    <div className="rsvp-card-booking-location-container">
                                        <p>{`${spot.city}, ${spot.state}`}</p>
                                        <p>{spot.country}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rsvp-card-image-container">
                                <NavLink exact to={`/spots/${spot.id}`}>
                                    <img
                                        src={spot.previewImage}
                                        alt="Preview image of trip destination"
                                        className="rsvp-card-image"
                                    ></img>
                                </NavLink>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }




    /**************** render component *****************/
    return (
        <div className="UpcomingReservations-component">
            {upcomingReservationsCard}
        </div>
    )
}


/******************************** EXPORTS ********************************/
export default UpcomingReservations
