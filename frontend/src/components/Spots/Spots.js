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

    // console.log("THIS IS SPOTS: " + spots);
    let spotsArr = Object.values(spots)
    // console.log("THIS IS SPOTSARR: " + spotsArr[0].name);

    return (
        <div className="spots">

            {spotsArr.map((spot) => (
                <div className="spot-card">
                    <Link
                    key={`${spot.id}`}
                    to={`/spots/${spot.id}`}
                    >
                        <div>
                            <div className="spot-name">{spot.name}</div>
                            <div>{spot.description}</div>
                            <div>{`$${spot.price} night`}</div>
                        </div>
                    </Link>
                </div>
            ))}

        </div>
    )
}
