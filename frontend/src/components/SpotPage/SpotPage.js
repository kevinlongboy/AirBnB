import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionRead, thunkRead } from "../../store/spots";
import './SpotPage.css';



function SpotPage() {
    const spots = useSelector(state => state.spots)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkRead());
    }, [])

    const { spotId } = useParams();
    let spotsArr = Object.values(spots)
    // console.log("IN SPOTPAGE.JS - ALL SPOTS: ", spotsArr)
    // console.log(typeof spotsArr[0].id)
    const spot = spotsArr.find((spot) => spot.id == spotId); // use loose equality for mismatching type comparison

    console.log("IN SPOTPAGE.JS - SPOT: ", spot)
    // console.log("IN SPOTPAGE.JS - SPOT AT INDEX 0: ", spotsArr[0])


    return (
        <div className="spot-page">
            <h1 className="spotName">{spot.name}</h1>

            <div className="spotOverview">
                {/* <p className="fa-solid fa-star"> 4.97</p> */}
                <p className="spotRating">{`✭ ${spot.avgRatings}`}</p>
                <p className="spotReviewCount"> · 2 Reviews </p>
                <p className="spotLocation"> {`· ${spot.city}, ${spot.state}, ${spot.country}`}</p>
            </div>



            <div className="spotImages">
            </div>

        <h2 className="spotOwner">{`Hosted by ${spot.ownerId}`}</h2>
            <div>
                <p>{`${spot.description}`}</p>
            </div>

            <h2>{`✭ ${spot.avgRatings} · 2 Reviews`}</h2>
            <div>
                <div>Loop through reviews</div>
                <div>First Name</div>
                <div>Date</div>
                <div>Review</div>

            </div>

        </div>
    )
}

export default SpotPage;
