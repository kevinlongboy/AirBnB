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
        <div className='pageWrapperContainer'>
            <div className="SearchResultsPage-component">

                {allSpotsArr.map((spot) => (
                    <Link
                        to={`/spots/${spot.id}`}
                        key={`${spot.id}`}
                        className="SearchResultsPage-card"
                    >

                        <div className="SearchResultsPage-card-image-container">
                            <img src={spot.previewImage} alt={`${spot.name}`} className="SearchResultsPage-card-image"></img>
                        </div>

                        <div className="SearchResultsPage-card-text-container">

                            <div className="SearchResultsPage-card-header-container">
                                <div className="spot-name">{spot.name}</div>
                                <div>★ {spot.avgRatings ? spot.avgRatings : 0.00}</div>
                            </div>

                            <div className="SearchResultsPage-card-location">{`${spot.city}, ${spot.state}`}</div>
                            <div className="SearchResultsPage-card-price">{`$${spot.price} night`}</div>
                        </div>

                    </Link>
                ))}

            </div>
        </div>
    );
}


/******************************** EXPORTS ********************************/
export default SearchResultsPage;
