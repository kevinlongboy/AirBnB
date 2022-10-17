/******************************** IMPORTS ********************************/
// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// local files
import { thunkDeleteSingleSpot, thunkReadAllSpots } from "../../../store/spotsReducer";
import './DeleteSpot.css'


/******************************* COMPONENT *******************************/
function DeleteSpot({id}) {

    /****************** access store *******************/
    const spotsState = useSelector(state => state.spots.allSpots);

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkReadAllSpots());
    }, [spotsState]);

    /***************** handle events *******************/
    const handleDelete = (spotId) => {
        dispatch(thunkDeleteSingleSpot(spotId))
    }

    /**************** render component *****************/
    return (
        <button className="table-button" type="button" onClick={(e) => handleDelete(id)}>Delete</button>
    )
}


/******************************** EXPORTS ********************************/
export default DeleteSpot
