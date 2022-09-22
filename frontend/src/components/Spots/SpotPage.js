import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionRead, thunkRead } from "../../store/spots";
import './Spots.css';



function SpotPage() {
    const spots = useSelector(state => state.spots)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkRead());
    }, [])

    const { spotId } = useParams();
    let spotsArr = Object.values(spots)
    const spot = spotsArr.find((spot) => spot.id === spotId);


    // console.log("SPOT AT INDEX 0: ", spotsArr[0])


    return (
        <div className="spot-page">
            <h1>Name</h1>
        </div>
    )
}

export default SpotPage;
