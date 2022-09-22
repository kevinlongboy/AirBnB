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

    return (
        <div className="spots">

            {spotsArr.map((spot) => (
                    <Link
                    className="spot-card"
                    key={`${spot.id}`}
                    to={`/spots/${spot.id}`}
                    >
                        <div><img></img></div>
                        <div className="spot-name">{spot.name}</div>
                        <div>{spot.description}</div>
                        <div>{`$${spot.price} night`}</div>
                    </Link>
            ))}

        </div>
    )
}
