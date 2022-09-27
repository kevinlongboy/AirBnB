import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadAllSpots } from "../../store/spots";
import './Main.css';


function Main() {

    const spotsState = useSelector(state => state.spots)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkReadAllSpots());
    }, [])

    const allSpots = spotsState.allSpots
    let allSpotsArr = Object.values(allSpots) // removes keys from original object

    return (
        <div className="spots">

            {allSpotsArr.map((spot) => (
                    <Link
                    className="spot-card"
                    key={`${spot.id}`}
                    id={spot.id}
                    to={`/spots/${spot.id}`}
                    style={{textDecoration:"none"}} //?
                    >

                        <div className="spot-image-container">
                            <img className="spot-image" src={spot.previewImage}></img>
                        </div>

                        <div className="spot-text">

                            <div className="spot-text-line-1">
                                <div className="spot-name" style={{color:"black", fontWeight:"900"}}>{spot.name}</div>
                                <div id="main-page-spot-rating">★ {spot.avgRatings}</div>
                            </div>
                            <div className="spot-location" style={{color:"#717171",  fontWeight:"100"}}>{`${spot.city}, ${spot.state}`}</div>
                            <div className="spot-price" style={{color:"black", fontWeight:"900"}}>{`$${spot.price} night`}</div>
                        </div>

                    </Link>
            ))}

        </div>
    )
}

export default Main
