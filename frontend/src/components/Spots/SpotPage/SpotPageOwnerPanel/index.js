/******************************** IMPORTS ********************************/
// libraries
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import './SpotPageOwnerPanel.css';
import doorIcon from "../../../../assets/icons/door-icon.png"

/******************************* COMPONENT *******************************/
function SpotPageOwnerPanel({spot, spotId}) {

    /**************** render component *****************/
    return (
        <div className="SpotPageOwnerPanel-component">

            <div className="SpotPageOwnerPanel-overview-container">
                <div className="SpotPageOwnerPanel-spot-price">${spot.price} <span>night</span></div>

                <div className="SpotPageOwnerPanel-spot-rating">
                    ★ {spot.avgStarRating}<span>{' '} · {' '}</span><u>{spot.numReviews} reviews</u>
                </div>
            </div>

            <div className="SpotPageOwnerPanel-body">
                <div className="SpotPageOwnerPanel-header-container">
                    <p className="SpotPageOwnerPanel-header">You own this spot</p>
                    <img src={doorIcon} alt="Door icon" className="door-icon"></img>

                </div>

                <div className="SpotPageOwnerPanel-reserve-button-container">
                    <NavLink
                        exact to={`/spots/${spotId}/edit`}
                        className="SpotPageOwnerPanel-reserve-button"
                        >
                        <button className="SpotPageOwnerPanel-reserve-button">
                            Manage listing
                        </button>
                    </NavLink>
                </div>
            </div>

        </div>
    )
}


/******************************** EXPORTS ********************************/
export default SpotPageOwnerPanel
