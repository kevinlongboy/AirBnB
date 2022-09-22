import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionRead, thunkRead } from "../../store/spots";
import './Spots.css';


export function Spots() {

    const spots = useSelector(state => state.spots)
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(thunkRead());
    }, [])

    let spotsArr = Object.values(spots)
    console.log("SPOT AT INDEX 0: ", spotsArr[0])

    return (
        <div className="spots">
            {spotsArr.map((spot) => (
                    <Link
                    className="spot-card"
                    key={`${spot.id}`}
                    id={spot.id}
                    to={`/spots/${spot.id}`}
                    style={{textDecoration:"none"}}
                    >
                        <div><img className="spot-image" src={spot.previewImage}></img></div>
                        <div className="spot-text">
                            <div className="spot-name" style={{color:"black"}}>{spot.name}</div>
                            <div className="spot-rating">{spot.avgRating}</div>
                            <div className="spot-description" style={{color:"#717171",  fontWeight:"lighter"}}>{spot.description}</div>
                            <div className="spot-price" style={{color:"black"}}>{`$${spot.price} night`}</div>
                        </div>
                    </Link>
            ))}

        </div>
    )
}
