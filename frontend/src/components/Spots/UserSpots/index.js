/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkReadAllSpots } from "../../../store/spotsReducer";
import DeleteSpot from "../DeleteSpot";
import plusIcon from '../../../assets/fontawesome/plus-solid.svg'
import './UserSpots.css'


/******************************* COMPONENT *******************************/
function UserSpots() {

    /****************** access store *******************/
    const sessionState = useSelector(state => state.session);
    const spotsState = useSelector(state => state.spots.allSpots);

    /************ key into pertinent values ************/
    // user
    const userId = sessionState.user.id;
    // spots
    const allSpotsArr = Object.values (spotsState)
    const allSpotsByUser = allSpotsArr.filter(obj => obj.ownerId === userId)

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadAllSpots());
    }, [spotsState]);


    /**************** render component *****************/
    if (!sessionState.user.id) return <Redirect to="/" />;

    else return (
            <div className="spots-page">

                <div className="spots-page-header">
                    <h1>{allSpotsByUser.length} Listing<span>{allSpotsByUser.length === 1 ? '' : 's'}</span></h1>
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

                                        <DeleteSpot id={spot.id}/>
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


/******************************** EXPORTS ********************************/
export default UserSpots
