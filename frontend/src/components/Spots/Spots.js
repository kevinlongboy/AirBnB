import React from "react";
import { NavLink } from "react-router-dom";

import './Spots.css'

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

  let spots = spotsState.AllSpotsByUser

function Spots() {

    return (
        <div>
            <div className="spots-header">
                <h1># Listings</h1>
                <NavLink to={'/hosting'}>+ Create listing</NavLink>


            </div>

            <div className="spots-body">
                <table>
                    <thead>
                        <tr>
                            <th>LISTING</th>
                            <th>TO DO</th>
                            <th>LOCATION</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        spots.map(spot => (
                            <tr key={spot.id}>
                                <td>{spot.name}</td>
                                <td>
                                    <NavLink to={`/spots/${spot.id}/edit`}>
                                    <button>edit</button>
                                    </NavLink>

                                    <button>delete</button>
                                </td>
                                <td>{spot.city}, {spot.state}</td>
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
