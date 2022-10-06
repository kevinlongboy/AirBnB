// libraries
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkDeleteSingleSpot, thunkReadAllSpots } from "../../store/spotsReducer";
import plusIcon from '../../assets/fontawesome/plus-solid.svg'
import './Spots.css'


function Spots() {

    /******************************** state ********************************/
    const sessionState = useSelector(state => state.session);
    const spotsState = useSelector(state => state.spots.allSpots);

    /********************** reducer/API communication ***********************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadAllSpots());
    }, [spotsState])

    /********************** key into pertinent values ***********************/
    const userId = sessionState.user.id;
    const allSpotsArr = Object.values (spotsState)
    const allSpotsByUser = allSpotsArr.filter(obj => obj.ownerId === userId)

    /******************************* events ********************************/

    const handleDelete = (spotId) => {
        dispatch(thunkDeleteSingleSpot(spotId))
    }


    /*************************** render component ****************************/
    return (
        <div className="spots-page">

            <div className="spots-page-header">
                <h1>{allSpotsByUser.length} Listings</h1>
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
                        allSpotsByUser.map(spot => (

                            <tr key={spot.id} className="spot-listing-row">

                                <NavLink
                                    to={`/spots/${spot.id}`}
                                    style={{textDecoration:"none", color:"#484848",display:'flex', justifyContent:'space-around', paddingTop:'20px' }}>
                                <td>{spot.name}</td>
                                </NavLink>
                                <td>
                                    <NavLink
                                    to={`/spots/${spot.id}/edit`}
                                    style={{paddingRight:"15px"}}>
                                        <button className="table-button">
                                        Edit
                                        </button>
                                    </NavLink>

                                    <button className="table-button" type="button" onClick={(e) => handleDelete(spot.id)}>Delete</button>
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
