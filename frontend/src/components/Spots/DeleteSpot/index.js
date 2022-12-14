/******************************** IMPORTS ********************************/
// libraries
import { useDispatch } from "react-redux";
// local files
import { thunkDeleteSingleSpot } from "../../../store/spotsReducer";
import './DeleteSpot.css'


/******************************* COMPONENT *******************************/
function DeleteSpot({id}) {

    /************ reducer/API communication ************/
    const dispatch = useDispatch();

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
