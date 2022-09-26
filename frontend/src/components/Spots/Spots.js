import React from "react";
import { NavLink } from "react-router-dom";
import plusIcon from '../../assets/fontawesome/plus-solid.svg'
import './Spots.css'


// will need to retrieve session.user.id in order to make fetch request for spots/current
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

// YEET THIS:
// Demo data from: Get all Spots owned by the Current User
// * Method: GET
// * URL: /api/spots/current

let spotsState = {
    "AllSpotsByUser": [
      {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "CA",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "avgRating": 4.5,
        "previewImage": "image url"
      },
      {
        "id": 2,
        "ownerId": 1,
        "address": "722 E Pike St",
        "city": "Seattle",
        "state": "WA",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "avgRating": 4.5,
        "previewImage": "image url"
      },
    ]
  }

  let spots = spotsState.AllSpotsByUser;

  // to delete:
    // grab spot.id/key
    // send as part of route param in fetch request
    // ... but how?

function Spots() {

    return (
        <div className="spots-page">
            <div className="spots-page-header">
                <h1>{spots.length} Listings</h1>
                <div className="spots-create-listing-button" style={{display:"flex", justifyContent:"space-evenly", verticalAlign:"center", alignContent:'center', alignItems:'center'}}>
                        <img src={plusIcon} style={{width:"15px"}}></img>
                    <NavLink to={'/hosting'} style={{textDecoration:"none", color:"black", fontWeight:"900",verticalAlign:'start' }}>
                        Create listing
                    </NavLink>
                </div>


            </div>

            <div className="spots-page-body">
                <table>
                    <thead>
                        <tr style={{display:'flex', justifyContent:"space-around"}}>
                            <th>LISTING</th>
                            <th>TO DO</th>
                            <th>LOCATION</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        spots.map(spot => (

                            <tr key={spot.id} className="spot-listing-row">

                                <NavLink
                                    to={`/spots/${spot.id}`}
                                    style={{textDecoration:"none", color:"#484848",display:'flex', justifyContent:'space-around', paddingTop:'20px' }}>
                                <td>{spot.name}</td>
                                <td>
                                    <NavLink
                                    to={`/spots/${spot.id}/edit`}
                                    style={{paddingRight:"15px"}}>
                                        <button className="spot-table-button">
                                        Edit
                                        </button>
                                    </NavLink>

                                    <button className="spot-table-button">Delete</button>
                                </td>
                                <td>{spot.city}, {spot.state}</td>
                            </NavLink>
                            </tr>

                        ))
                    }
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default Spots
