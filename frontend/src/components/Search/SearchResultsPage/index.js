/******************************** IMPORTS ********************************/
// libraries
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// local files
import './SearchResultsPage.css';
import { thunkSearchAllSpots } from '../../../store/spotsReducer';


/******************************* COMPONENT *******************************/
function SearchResultsPage() {

    /****************** access store *******************/
    const spotsState = useSelector(state => state.spots)

    /************ key into pertinent values ************/
    const allSpots = spotsState.allSpots;
    let allSpotsArr = Object.values(allSpots);

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkSearchAllSpots());
    }, [dispatch])

    /**************** render component *****************/
    return (
        <div className="SearchResultsPage-component">

            {allSpotsArr.map((spot) => (
                <Link
                    className="spot-card"
                    key={`${spot.id}`}
                    id={spot.id}
                    to={`/spots/${spot.id}`}
                    style={{textDecoration:"none"}} //?
                >

                    <div className="spot-image-container">
                        <img className="spot-image" src={spot.previewImage} alt={`${spot.name}`}></img>
                    </div>

                    <div className="spot-text">

                        <div className="spot-text-line-1">
                            <div className="spot-name" style={{color:"black", fontWeight:"900"}}>{spot.name}</div>
                            <div id="main-page-spot-rating">★ {spot.avgRatings ? spot.avgRatings : 0.00}</div>
                        </div>
                        <div className="spot-location" style={{color:"#717171",  fontWeight:"100"}}>{`${spot.city}, ${spot.state}`}</div>
                        <div className="spot-price" style={{color:"black", fontWeight:"900"}}>{`$${spot.price} night`}</div>
                    </div>

                </Link>
            ))}

        </div>
    );
}


/******************************** EXPORTS ********************************/
export default SearchResultsPage;
