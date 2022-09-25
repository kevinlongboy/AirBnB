import React from "react";
import './Reviews.css'
import chevronRight from '../../assets/fontawesome/chevron-right.svg'


// will need to retrieve session.user.id in order to make fetch request for reviews/current
let sessionState = {
    session: {

        user: {
            email: "demo@email.com",
            firstName: "Demo",
            id: 10,
            lastName: "User",
            token: "eyJhbGciOiJIUzI1NiIw",
            username: "Demo"
        }
    },
}

// YEET THIS: Get all Reviews of the Current User
// Demo data from:
// * Method: GET
// * URL: /api/reviews/current

let reviewsState = {
    'AllReviewsByUserId': [ // array of objects
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

          "Spot": {
            "id": 1,
            "ownerId": 1,
            "address": "123 Disney Lane",
            "city": "San Francisco",
            "state": "California",
            "country": "United States of America",
            "lat": 37.7645358,
            "lng": -122.4730327,
            "name": "App Academy",
            "price": 123,
            "previewImage": "image url"
          },

          "ReviewImages": [
            {
              "id": 1,
              "url": "image url"
            }
          ]

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

            "Spot": {
              "id": 1,
              "ownerId": 1,
              "address": "123 Disney Lane",
              "city": "San Francisco",
              "state": "California",
              "country": "United States of America",
              "lat": 37.7645358,
              "lng": -122.4730327,
              "name": "App Academy",
              "price": 123,
              "previewImage": "image url"
            },

            "ReviewImages": [
              {
                "id": 1,
                "url": "image url"
              }
            ]

          }
    ]
}

let reviews = reviewsState.AllReviewsByUserId;

 // to delete:
    // grab spot.id/key
    // send as part of route param in fetch request
    // ... but how?

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

function Reviews() {

    return(
        <div className="review-page">

            <div className="review-page-header">
                <div>
                    <p className="review-page-navigation">Profile <img id="review-chevron-right" src={chevronRight} style={{maxHeight:'10px', paddingLeft:'8px', paddingRight:'8px'}}></img> Reviews</p>
                </div>

                <div>
                    <h1 id="reviews-title">Reviews by you</h1>
                </div>

                <div id="reviews-subtitle">
                    <p>Reviews by you</p>
                </div>
            </div>

            <div className="review-page-body">

            <table id="review-table">
                    <thead id='review-table-head'>
                        <tr>
                            <th>Reviews to write</th>
                        </tr>
                    </thead>

                    <tbody id='review-table-body'>
                        <tr>
                            <td id="review-table-head-data">Nobody to review right now. Looks like it’s time for another trip!</td>
                        </tr>
                    </tbody>

            </table>

            <table id="review-table">
                    <thead id='review-table-head'>
                        <tr>
                            <th>Past reviews you've written</th>
                        </tr>
                    </thead>

                    <tbody id='review-table-body'>
                    {
                        reviews.map(review => (

                            <tr key={review.id}>
                                <td>
                                    <p id="review-table-body-title">Review for {review.Spot.name}</p>
                                    <p id="review-table-body-data">{review.review}</p>
                                    <p id="review-table-body-date-created">{convertDate(review.createdAt)}</p>
                                    <button id="review-table-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default Reviews;
