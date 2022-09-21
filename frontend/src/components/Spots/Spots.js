import React from "react";
import './Spots.css';


export function Spots() {

    return (
        <div>
            <img></img>
            <div className="spotName">Queen Anne Condo</div>
            <div className="spotRating">3.5</div>
            <div className="spotDescription">Eclectic</div>
            <div className="spotPrice">{`$250 night`}</div>
        </div>
    )
}
