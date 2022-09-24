import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { actionSpotsRead, thunkSpotsRead, thunkSpotsReadDetails } from "../../store/spots";
import './SpotPage.css';


// TEST DATA
// FROM ROUTE


function SpotPage() {
    const spots = useSelector(state => state.spots)
    const dispatch = useDispatch();

    let { spotId } = useParams();
    spotId = Number.parseInt(spotId)

    useEffect(() => {
        dispatch(thunkSpotsReadDetails(spotId));
    }, [])


    let spotDetails = spots.singleSpotDetails
    console.log("SPOT DETAILS: ", spotDetails)


    let spotsArr = Object.values(spots)
    const spot = spotsArr.find((spot) => spot.id == spotId);

    return (
        <div className="spot-page">
            <h1 className="spot-page-name">{spot.name}</h1>

            <div className="spot-page-overview">
                {/* <p className="fa-solid fa-star"> 4.97</p> */}
                <p className="spot-page-rating">{`★ ${spot.avgRatings}`}</p>
                <p> · </p>
                <p className="spot-page-review-count">2 Reviews</p>
                <p> · </p>
                <p className="spot-page-location"> {`${spot.city}, ${spot.state}, ${spot.country}`}</p>
            </div>



            <div className="spot-page-images-cover">
                <img className="img1" src="https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_2.jpg"></img>
                <img className="img2" src="https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_5_2.jpg"></img>
                <img className="img3" src="https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_11_2.jpg"></img>
                <img className="img4" src="https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_14_2.jpg"></img>
                <img className="img5" src="https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_17_2.jpg"></img>

            </div>

            <div className="spot-page-host-info">
                <h2 className="spot-page-host-name">{`Hosted by ${spot.ownerId}`}</h2>
                <p className="spot-page-host-creation-date">Since {spot.createdAt}</p>
            </div>

            <div className="spot-page-description">
                <p>{`${spot.description}`}</p>
            </div>

            <div className="reviews">
                <h2 className="review-data">{`★ ${spot.avgRatings} · 2 Reviews`}</h2>
                <div className="review-username">First Name</div>
                <div className="review-date">Date</div>
                <div className="review-content">Review</div>

            </div>

        </div>
    )
}

export default SpotPage;
