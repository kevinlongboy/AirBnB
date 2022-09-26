import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { thunkReadSingleSpotDetails } from "../../store/spots";
import ReviewCreate from "../ReviewCreate/ReviewCreate";
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
        // {
        //     "id": 1,
        //     "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_2.jpg",
        //     "preview": true
        // },
        // {
        //     "id": 2,
        //     "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_5_2.jpg",
        //     "preview": false
        // },
        // {
        //     "id": 3,
        //     "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_11_2.jpg",
        //     "preview": true
        // },
        // {
        //     "id": 4,
        //     "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_14_2.jpg",
        //     "preview": true
        // },
        // {
        //     "id": 5,
        //     "url": "https://ssl.cdn-redfin.com/photo/1/bigphoto/415/1394415_17_2.jpg",
        //     "preview": true
        // },
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
      },
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
      },
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
      },
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
      },{
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
      },
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
      },
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
      },
    ]
}


/**************************** CONDITIONAL COMPONENTS ****************************/

// Render component conditionally, to manage access to review/POST
let sessionState = {
    user: {
        email: "demo@email.com",
        firstName: "Demo",
        id: 10,
        lastName: "User",
        token: "eyJhbGciOiJIUzI1NiIw",
        username: "Demo"
    }
}

let sessionUserId = sessionState.user.id
let spotOwnerId = spotsState.SingleSpotDetails.ownerId

let reviewComponent
if ((sessionUserId >= 1) && (sessionUserId != spotOwnerId)) {
    reviewComponent = (

            <ReviewCreate />
    )
} else {
    reviewComponent = (
        <>
        </>
    )
}

/**************************** HELPER FUNCTIONS ***************************/

function addPlaceholderImages(arr) {

    let placeholderArr = [
        "https://cdn1.vox-cdn.com/uploads/chorus_image/image/47552879/Pike_Place_Market_Entrance.0.0.jpg",
        "http://sparkcreativeseattle.com/wp-content/uploads/2018/12/space-needle-fog.jpg",
        "https://cdn.vox-cdn.com/thumbor/XIhmt3AT6oZpXGechlpqiWeMkxU=/0x0:5000x3333/1200x800/filters:focal(2100x1267:2900x2067)/cdn.vox-cdn.com/uploads/chorus_image/image/64758319/StarbucksPETA.0.jpg",
        "https://www.worldatlas.com/upload/b7/0d/7c/shutterstock-474626185.jpg",
        "https://wallpapercave.com/wp/wp3120731.jpg"
    ]

    for (let i = 0; arr.length < 5; i++) {
        arr.push(placeholderArr[i])
    }

    return arr
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


/**************************** EXTRACTED ELEMENTS FROM STATE ****************************/

let spotImagesRaw = spotsState.SingleSpotDetails.SpotImages

let spotImagesArr = []
spotImagesRaw.forEach((img) => spotImagesArr.push(img.url))

if (spotImagesArr.length < 5 ) {
    addPlaceholderImages(spotImagesArr)
}

/**************************** HELPER FUNCTIONS ****************************/

function SpotPage() {

  const spotsStateTrue = useSelector(state => state.spots)
  const dispatch = useDispatch();
  const spotIdObj = useParams()

  const spotId = spotIdObj.spotId

  useEffect(() => {
    dispatch(thunkReadSingleSpotDetails(spotId))
  }, [spotId])


    // const spotsState = useSelector(state => state.spots)
    // const dispatch = useDispatch();

    // let { spotId } = useParams();
    // spotId = Number.parseInt(spotId)

    // useEffect(() => {
    //     dispatch(thunkSpotsReadDetails(spotId));
    // }, [])



    let spotDetails = spotsState.SingleSpotDetails
    let listingStartDate = convertDate(spotDetails.createdAt)

    let allSpotReviewsArr = reviewsState.AllReviewsForSpot
    // let reviewDate = convertDate(spotDetails.createdAt)

    return (
        <div className="window">

            <div className="spot-page">
                <h1 id="spot-page-name">{spotDetails.name}</h1>

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
                        spotImagesArr.map((spotImage, index) => (
                            <img key={index + 1} className={`img${index + 1}`} src={spotImage}></img>
                            ))
                        }
                </div>


                <div className="spot-page-middle">

                    <div className="spot-page-middle-left">
                        <div className="spot-page-host-info">
                            <h2 className="spot-page-host-name">{`Hosted by ${spotDetails.Owner.firstName}`}</h2>
                            <p className="spot-page-host-creation-date">Since {listingStartDate}</p>
                        </div>

                        <div className="spot-page-description">
                            <p>{`${spotDetails.description}`}</p>
                        </div>
                    </div>

                    <div className="spot-page-middle-right">
                      <div>
                        {reviewComponent}
                      </div>
                    </div>
                </div>

                <div className="reviews">
                            <h2 className="review-data">{`★ ${spotDetails.avgStarRating} · ${allSpotReviewsArr.length} Reviews`}</h2>

                            {allSpotReviewsArr.map((spotReview, index) => (
                                <div>
                                    <div className="review-username">{spotReview.User.firstName}</div>
                                    <div className="review-date">{convertDate(spotReview.createdAt)}</div>
                                    <div className="review-content">{spotReview.review}</div>
                                </div>
                            ))}
                </div>

            </div>
        </div>
    )
}

export default SpotPage;
