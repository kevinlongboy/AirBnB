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
                    <h1 className="userSpotsPageTitle">{allSpotsByUser.length} Listing<span>{allSpotsByUser.length === 1 ? '' : 's'}</span></h1>

                    <NavLink to={'/hosting'} className="createListingButtonLink">
                        <div className="createListingButton">
                            <img src={plusIcon} style={{width:"15px"}}></img>
                            Create listing
                        </div>
                    </NavLink>
                </div>


                <div className="userSpotsBody">
                    <table className="userSpotsTable">

                        <thead className="userSpotsTableHead">
                            <tr className="userSpotsTableHeadRow">
                                <th className="tableHeadItem">LISTING</th>
                                <th className="tableHeadItem">TO DO</th>
                                <th className="tableHeadItem">LOCATION</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            allSpotsByUser.map(spot => (

                                <tr key={spot.id} className="userSpotsTableBodyRow">

                                    <NavLink
                                        className="spotTableListingLink"
                                        to={`/spots/${spot.id}`}
                                    >
                                    <td className="spotTableListingContainer">
                                        <div><img src={spot.previewImage} className="spotTableListingThumbnail"></img></div>
                                        <div className="spotTableListingLinkText">{spot.name}</div>
                                    </td>
                                    </NavLink>

                                    <td className="spotTableManageListingButtons">
                                        <NavLink
                                        to={`/spots/${spot.id}/edit`}
                                        style={{paddingRight:"15px"}}>
                                            <button className="table-button">
                                            Edit
                                            </button>
                                        </NavLink>

                                        <DeleteSpot id={spot.id} />
                                    </td>

                                    <td className="spotTableListingLocation">{spot.city}, {spot.state}</td>

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
