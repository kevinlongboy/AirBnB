import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Spots.css';


export function Spots() {

    const spots = useSelector(state => state.spots)
    const { spotId } = useParams();
    const dispatch = useDispatch();

    return (
        <div className="spot-card">
            {spots}

            {/* {spots.map((spots) => (
                <Link
                key={`${spots.id}`}
                to={`/spots/${spots.id}`}>
                {spots.name}
                </Link>
            ))} */}

            {/* <img></img>
            <div className="spotName">{spots}</div>
            <div className="spotRating">3.5</div>
            <div className="spotDescription">Eclectic</div>
            <div className="spotPrice">{`$250 night`}</div> */}
        </div>
    )
}
