import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { actionSpotsRead, thunkSpotsRead, thunkSpotsReadDetails } from "../../store/spots";
import './SpotPage.css';


// YEET THIS:
// Demo data from: Get details of a Spot from an id
// * Method: GET
// * URL: /api/spots/:spotId


let spotsState = {
    'SingleSpotDetails': {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36" ,
        "numReviews": 5,
        "avgStarRating": 4.5,
        "SpotImages": [
        {
            "id": 1,
            "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_2.jpg",
            "preview": true
        },
        {
            "id": 2,
            "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_5_2.jpg",
            "preview": false
        },
        {
            "id": 3,
            "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_11_2.jpg",
            "preview": true
        },
        {
            "id": 4,
            "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_14_2.jpg",
            "preview": true
        },
        {
            "id": 5,
            "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_17_2.jpg",
            "preview": true
        },
        ],
        "Owner": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
        }
    }
}


// Demo data from: Get all Reviews by a Spot's id
// * Method: GET
// * URL: /api/spots/:spotId/reviews

let reviewsState = {
    "AllReviewsForSpot": [ // originally has key with name "Reviews" - just make sure to spread contents and rename to "AllReviewsForSpot"
      {
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36" ,
        "User": {
          "id": 1,
          "firstName": "John",
          "lastName": "Smith"
        },
        "ReviewImages": [
          {
            "id": 1,
            "url": "image url"
          }
        ],
      }
    ]
  }

function convertDate(iso) {

    let year = iso.slice(0, 4);
    let month = iso.slice(5, 7);

    if (month == 1) {
        month = 'January'
    } else if (month == 2) {
        month = 'February'
    } else if (month == 3) {
        month = 'March'
    } else if (month == 4) {
        month = 'April'
    } else if (month == 5) {
        month = 'May'
    } else if (month == 6) {
        month = 'June'
    } else if (month == 7) {
        month = 'July'
    } else if (month == 8) {
        month = 'August'
    } else if (month == 9) {
        month = 'September'
    } else if (month == 10) {
        month = 'October'
    } else if (month == 11) {
        month = 'November'
    } else if (month == 12) {
        month = 'December'
    }

    return month.concat(' ', year)
}


function SpotPage() {
    // const spotsState = useSelector(state => state.spots)
    // const dispatch = useDispatch();

    // let { spotId } = useParams();
    // spotId = Number.parseInt(spotId)

    // useEffect(() => {
    //     dispatch(thunkSpotsReadDetails(spotId));
    // }, [])


    let spotDetails = spotsState.SingleSpotDetails
    let spotImages = spotDetails.SpotImages
    let listingStartDate = convertDate(spotDetails.createdAt)

    let allSpotReviewsArr = reviewsState.AllReviewsForSpot
    // let reviewDate = convertDate(spotDetails.createdAt)

    return (
        <div className="spot-page">
            <h1 className="spot-page-name">{spotDetails.name}</h1>

            <div className="spot-page-overview">
                {/* <p className="fa-solid fa-star"> 4.97</p> */}
                <p className="spot-page-rating">{`★ ${spotDetails.avgStarRating}`}</p>
                <p> · </p>
                <p className="spot-page-review-count">2 Reviews</p>
                <p> · </p>
                <p className="spot-page-location"> {`${spotDetails.city}, ${spotDetails.state}, ${spotDetails.country}`}</p>
            </div>



            <div className="spot-page-images-cover">
                {
                    spotImages.map((spotImage, index) => (
                        <img key={spotImage.id} className={`img${index + 1}`} src={spotImage.url}></img>
                    ))
                }
            </div>

            <div className="spot-page-host-info">
                <h2 className="spot-page-host-name">{`Hosted by ${spotDetails.Owner.firstName}`}</h2>
                <p className="spot-page-host-creation-date">Since {listingStartDate}</p>
            </div>

            <div className="spot-page-description">
                <p>{`${spotDetails.description}`}</p>
            </div>

            <div className="reviews">
                <h2 className="review-data">{`★ ${spotDetails.avgStarRating} · ${allSpotReviewsArr.length} Reviews`}</h2>

                {
                    allSpotReviewsArr.map((spotReview, index) => (
                        <div>
                            <div className="review-username">{spotReview.User.firstName}</div>
                            <div className="review-date">{convertDate(spotReview.createdAt)}</div>
                            <div className="review-content">{spotReview.review}</div>
                        </div>

                    ))
                }




            </div>

        </div>
    )
}

export default SpotPage;
